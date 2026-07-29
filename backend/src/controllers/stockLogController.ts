import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getStockLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { movement_type, product_id } = req.query;
    let query = `
      SELECT l.*, p.name as product_name, p.sku as product_sku, u.name as created_by_name
      FROM stock_movement_logs l
      LEFT JOIN products p ON l.product_id = p.id
      LEFT JOIN users u ON l.created_by = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (movement_type) {
      params.push(movement_type);
      query += ` AND l.movement_type = $${params.length}`;
    }

    if (product_id) {
      params.push(product_id);
      query += ` AND l.product_id = $${params.length}`;
    }

    query += ' ORDER BY l.created_at DESC';

    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('getStockLogs error:', error);
    return res.status(500).json({ message: 'Error fetching stock logs' });
  }
};

export const createStockLog = async (req: AuthRequest, res: Response) => {
  const client = await pool.connect();
  try {
    const { product_id, quantity_changed, movement_type, reason } = req.body;

    if (!product_id || !quantity_changed || !movement_type || !reason) {
      return res.status(400).json({ message: 'Missing required stock log fields' });
    }

    const qty = Math.abs(parseInt(quantity_changed, 10));

    await client.query('BEGIN');

    // Lock product row
    const productRes = await client.query(
      'SELECT id, name, current_stock FROM products WHERE id = $1 FOR UPDATE',
      [product_id]
    );

    if (productRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = productRes.rows[0];

    if (movement_type === 'OUT' && product.current_stock < qty) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        message: `Insufficient stock for product [${product.name}]. Available: ${product.current_stock}, Requested: ${qty}`,
      });
    }

    // Update stock quantity
    const newStock = movement_type === 'IN'
      ? product.current_stock + qty
      : product.current_stock - qty;

    await client.query(
      'UPDATE products SET current_stock = $1 WHERE id = $2',
      [newStock, product_id]
    );

    // Insert log
    const logRes = await client.query(
      `INSERT INTO stock_movement_logs (product_id, quantity_changed, movement_type, reason, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [product_id, qty, movement_type, reason, req.user?.id]
    );

    await client.query('COMMIT');
    return res.status(201).json(logRes.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('createStockLog error:', error);
    return res.status(500).json({ message: 'Error processing stock adjustment' });
  } finally {
    client.release();
  }
};
