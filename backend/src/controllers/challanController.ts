import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getChallans = async (req: AuthRequest, res: Response) => {
  try {
    const { status, customer_id } = req.query;
    let query = `
      SELECT c.*, u.name as created_by_name,
             (
               SELECT json_agg(ci.*) 
               FROM challan_items ci 
               WHERE ci.challan_id = c.id
             ) as items
      FROM sales_challans c
      LEFT JOIN users u ON c.created_by = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      params.push(status);
      query += ` AND c.status = $${params.length}`;
    }

    if (customer_id) {
      params.push(customer_id);
      query += ` AND c.customer_id = $${params.length}`;
    }

    query += ' ORDER BY c.created_at DESC';

    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('getChallans error:', error);
    return res.status(500).json({ message: 'Error fetching sales challans' });
  }
};

export const createChallan = async (req: AuthRequest, res: Response) => {
  const client = await pool.connect();
  try {
    const { customer_id, items } = req.body;

    if (!customer_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Customer ID and at least one item are required' });
    }

    await client.query('BEGIN');

    // Fetch customer details for snapshot
    const custRes = await client.query('SELECT * FROM customers WHERE id = $1', [customer_id]);
    if (custRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Customer not found' });
    }
    const customer = custRes.rows[0];
    const customerSnapshot = {
      id: customer.id,
      name: customer.name,
      business_name: customer.business_name,
      mobile: customer.mobile,
      email: customer.email,
      gst_number: customer.gst_number,
      address: customer.address,
    };

    // Calculate total quantity & validate items
    let totalQuantity = 0;
    const itemsToInsert: Array<{ product_id: string; product_name: string; unit_price: number; quantity: number }> = [];

    for (const item of items) {
      const prodRes = await client.query('SELECT id, name, unit_price FROM products WHERE id = $1', [item.product_id]);
      if (prodRes.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
      }
      const product = prodRes.rows[0];
      const qty = parseInt(item.quantity, 10);
      totalQuantity += qty;
      itemsToInsert.push({
        product_id: product.id,
        product_name: product.name,
        unit_price: parseFloat(product.unit_price),
        quantity: qty,
      });
    }

    // Generate unique challan number
    const countRes = await client.query('SELECT COUNT(*) FROM sales_challans');
    const nextSeq = parseInt(countRes.rows[0].count, 10) + 1;
    const challanNumber = `SCH-${new Date().getFullYear()}-${String(nextSeq).padStart(4, '0')}`;

    // Insert sales challan draft
    const challanRes = await client.query(
      `INSERT INTO sales_challans (challan_number, customer_id, customer_snapshot, total_quantity, status, created_by)
       VALUES ($1, $2, $3, $4, 'DRAFT', $5)
       RETURNING *`,
      [challanNumber, customer_id, JSON.stringify(customerSnapshot), totalQuantity, req.user?.id]
    );

    const challan = challanRes.rows[0];

    // Insert items
    for (const item of itemsToInsert) {
      await client.query(
        `INSERT INTO challan_items (challan_id, product_id, product_name, unit_price, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [challan.id, item.product_id, item.product_name, item.unit_price, item.quantity]
      );
    }

    await client.query('COMMIT');

    return res.status(201).json({
      ...challan,
      items: itemsToInsert,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('createChallan error:', error);
    return res.status(500).json({ message: 'Error creating sales challan draft' });
  } finally {
    client.release();
  }
};

export const confirmChallan = async (req: AuthRequest, res: Response) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    await client.query('BEGIN');

    // Lock sales_challan row
    const challanRes = await client.query(
      'SELECT * FROM sales_challans WHERE id = $1 FOR UPDATE',
      [id]
    );

    if (challanRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Sales challan not found' });
    }

    const challan = challanRes.rows[0];

    if (challan.status !== 'DRAFT') {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: `Cannot confirm challan with status ${challan.status}` });
    }

    // Fetch items
    const itemsRes = await client.query('SELECT * FROM challan_items WHERE challan_id = $1', [id]);
    const items = itemsRes.rows;

    // Check stock with FOR UPDATE lock on each product
    for (const item of items) {
      const prodRes = await client.query(
        'SELECT id, name, current_stock FROM products WHERE id = $1 FOR UPDATE',
        [item.product_id]
      );

      if (prodRes.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: `Product [${item.product_name}] no longer exists` });
      }

      const product = prodRes.rows[0];

      if (product.current_stock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          message: `Insufficient stock for product [${product.name}]`,
        });
      }
    }

    // Deduct stock and log movement
    for (const item of items) {
      await client.query(
        'UPDATE products SET current_stock = current_stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );

      await client.query(
        `INSERT INTO stock_movement_logs (product_id, quantity_changed, movement_type, reason, created_by)
         VALUES ($1, $2, 'OUT', $3, $4)`,
        [item.product_id, item.quantity, `Challan Confirmation #${challan.challan_number}`, req.user?.id]
      );
    }

    // Update challan status to CONFIRMED
    const updatedChallan = await client.query(
      "UPDATE sales_challans SET status = 'CONFIRMED' WHERE id = $1 RETURNING *",
      [id]
    );

    await client.query('COMMIT');
    return res.json(updatedChallan.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('confirmChallan error:', error);
    return res.status(500).json({ message: 'Error confirming sales challan' });
  } finally {
    client.release();
  }
};

export const cancelChallan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE sales_challans SET status = 'CANCELLED' WHERE id = $1 AND status = 'DRAFT' RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Challan not found or cannot be cancelled' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('cancelChallan error:', error);
    return res.status(500).json({ message: 'Error cancelling sales challan' });
  }
};
