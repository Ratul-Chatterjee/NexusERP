import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const { status, type, search } = req.query;
    let query = 'SELECT * FROM customers WHERE 1=1';
    const params: any[] = [];

    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }

    if (type) {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR business_name ILIKE $${params.length} OR email ILIKE $${params.length} OR mobile ILIKE $${params.length})`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('getCustomers error:', error);
    return res.status(500).json({ message: 'Error fetching customers' });
  }
};

export const createCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const { name, mobile, email, business_name, gst_number, type, address, status, follow_up_date, notes } = req.body;

    if (!name || !mobile || !email || !business_name || !address) {
      return res.status(400).json({ message: 'Missing required customer fields' });
    }

    const result = await pool.query(
      `INSERT INTO customers (name, mobile, email, business_name, gst_number, type, address, status, follow_up_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        name,
        mobile,
        email,
        business_name,
        gst_number || null,
        type || 'RETAIL',
        address,
        status || 'LEAD',
        follow_up_date || null,
        notes || null,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('createCustomer error:', error);
    return res.status(500).json({ message: 'Error creating customer' });
  }
};

export const updateCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, mobile, email, business_name, gst_number, type, address, status, follow_up_date, notes } = req.body;

    const result = await pool.query(
      `UPDATE customers
       SET name = COALESCE($1, name),
           mobile = COALESCE($2, mobile),
           email = COALESCE($3, email),
           business_name = COALESCE($4, business_name),
           gst_number = COALESCE($5, gst_number),
           type = COALESCE($6, type),
           address = COALESCE($7, address),
           status = COALESCE($8, status),
           follow_up_date = COALESCE($9, follow_up_date),
           notes = COALESCE($10, notes)
       WHERE id = $11
       RETURNING *`,
      [name, mobile, email, business_name, gst_number, type, address, status, follow_up_date, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('updateCustomer error:', error);
    return res.status(500).json({ message: 'Error updating customer' });
  }
};

export const addCustomerNotes = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { notes, follow_up_date } = req.body;

    const result = await pool.query(
      `UPDATE customers
       SET notes = $1,
           follow_up_date = COALESCE($2, follow_up_date)
       WHERE id = $3
       RETURNING *`,
      [notes, follow_up_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('addCustomerNotes error:', error);
    return res.status(500).json({ message: 'Error updating customer notes' });
  }
};
