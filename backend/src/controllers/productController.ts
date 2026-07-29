import { Response } from 'express';
import { pool } from '../config/db';
import cloudinary from '../config/cloudinary';
import { AuthRequest } from '../middleware/auth';

export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const { category, search, low_stock } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR sku ILIKE $${params.length} OR location ILIKE $${params.length})`;
    }

    if (low_stock === 'true') {
      query += ' AND current_stock <= min_stock_alert';
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return res.json(result.rows);
  } catch (error) {
    console.error('getProducts error:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, sku, category, unit_price, current_stock, min_stock_alert, location } = req.body;

    if (!name || !sku || !category || unit_price === undefined || !location) {
      return res.status(400).json({ message: 'Missing required product fields' });
    }

    let imageUrl = req.body.image_url || null;

    // Handle Cloudinary binary upload if file provided
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: 'nexuserp_products',
        });
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        // Fallback gracefully if Cloudinary credentials not configured locally
        imageUrl = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500';
      }
    }

    const result = await pool.query(
      `INSERT INTO products (name, sku, category, unit_price, current_stock, min_stock_alert, location, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        name,
        sku,
        category,
        parseFloat(unit_price),
        parseInt(current_stock || '0', 10),
        parseInt(min_stock_alert || '5', 10),
        location,
        imageUrl,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('createProduct error:', error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'A product with this SKU already exists' });
    }
    return res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sku, category, unit_price, current_stock, min_stock_alert, location, image_url } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name = COALESCE($1, name),
           sku = COALESCE($2, sku),
           category = COALESCE($3, category),
           unit_price = COALESCE($4, unit_price),
           current_stock = COALESCE($5, current_stock),
           min_stock_alert = COALESCE($6, min_stock_alert),
           location = COALESCE($7, location),
           image_url = COALESCE($8, image_url)
       WHERE id = $9
       RETURNING *`,
      [
        name,
        sku,
        category,
        unit_price ? parseFloat(unit_price) : null,
        current_stock !== undefined ? parseInt(current_stock, 10) : null,
        min_stock_alert !== undefined ? parseInt(min_stock_alert, 10) : null,
        location,
        image_url,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('updateProduct error:', error);
    return res.status(500).json({ message: 'Error updating product' });
  }
};
