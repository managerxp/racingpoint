/**
 * Cars Controller (Domain: F1 Simulation Pods)
 *
 * IMPORTANT DOMAIN NOTE:
 * In the booking system, "cars" represent PHYSICAL PODS.
 * We are not renaming the table yet to avoid breaking changes,
 * but all future booking logic will treat cars as pods.
 */

import { pool } from '../config/database.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------------------------------------------------------------- */
/*                               NEW DOMAIN ENUM                              */
/* -------------------------------------------------------------------------- */

const VALID_STATUSES = ['ACTIVE', 'MAINTENANCE', 'DISABLED'];

/* -------------------------------------------------------------------------- */
/*                               File Utilities                               */
/* -------------------------------------------------------------------------- */

/**
 * Safely delete a file without crashing the process
 */
const safeDeleteFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error('File cleanup failed:', err.message);
  }
};

/* -------------------------------------------------------------------------- */
/*                             Multer Configuration                           */
/* -------------------------------------------------------------------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/cars');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `car-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);

  if (!isValid) {
    return cb(new Error('Only image files are allowed'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

/* -------------------------------------------------------------------------- */
/*                                 Controllers                                */
/* -------------------------------------------------------------------------- */

/**
 * Create a new pod (car)
 */
export const createCar = async (req, res) => {
  const client = await pool.connect();

  try {
    const { category_id, name, model, status, operating_hours } = req.body;

    if (!name || !model) {
      return res.status(400).json({
        success: false,
        error: 'Car name and model are required'
      });
    }

    const podStatus =
      status && VALID_STATUSES.includes(status)
        ? status
        : 'ACTIVE';

    let hours = {};
    if (operating_hours) {
      try {
        hours =
          typeof operating_hours === 'string'
            ? JSON.parse(operating_hours)
            : operating_hours;
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid operating_hours JSON'
        });
      }
    }

    const image_url = req.file
      ? `/uploads/cars/${req.file.filename}`
      : null;

    const result = await client.query(
      `INSERT INTO cars (category_id, name, model, image_url, status, operating_hours)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [category_id || null, name, model, image_url, podStatus, hours]
    );

    return res.status(201).json({
      success: true,
      message: 'Car created successfully',
      car: result.rows[0]
    });

  } catch (error) {
    safeDeleteFile(req.file?.path);
    console.error('Create car error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to create car'
    });
  } finally {
    client.release();
  }
};

/**
 * Get all pods
 */
export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, cc.name AS category_name
      FROM cars c
      LEFT JOIN car_categories cc ON c.category_id = cc.id
      ORDER BY c.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      cars: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Fetch cars error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch cars'
    });
  }
};

/**
 * Get a single pod by ID
 */
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT c.*, cc.name AS category_name
      FROM cars c
      LEFT JOIN car_categories cc ON c.category_id = cc.id
      WHERE c.id = $1
    `, [id]);

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    return res.status(200).json({
      success: true,
      car: result.rows[0]
    });

  } catch (error) {
    console.error('Fetch car error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch car'
    });
  }
};

/**
 * Update pod details
 */
export const updateCar = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { category_id, name, model, status, operating_hours } = req.body;

    if (!name || !model) {
      return res.status(400).json({
        success: false,
        error: 'Car name and model are required'
      });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pod status'
      });
    }

    const existing = await client.query(
      'SELECT * FROM cars WHERE id = $1',
      [id]
    );

    if (!existing.rows.length) {
      safeDeleteFile(req.file?.path);

      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    let image_url = existing.rows[0].image_url;

    if (req.file) {
      image_url = `/uploads/cars/${req.file.filename}`;

      if (existing.rows[0].image_url) {
        const oldPath = path.join(__dirname, '../../', existing.rows[0].image_url);
        safeDeleteFile(oldPath);
      }
    }

    let hours = existing.rows[0].operating_hours;

    if (operating_hours) {
      try {
        hours =
          typeof operating_hours === 'string'
            ? JSON.parse(operating_hours)
            : operating_hours;
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid operating_hours JSON'
        });
      }
    }

    const result = await client.query(
      `UPDATE cars
       SET category_id=$1,
           name=$2,
           model=$3,
           image_url=$4,
           status=$5,
           operating_hours=$6,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=$7
       RETURNING *`,
      [
        category_id || null,
        name,
        model,
        image_url,
        status || existing.rows[0].status,
        hours,
        id
      ]
    );

    return res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      car: result.rows[0]
    });

  } catch (error) {
    safeDeleteFile(req.file?.path);
    console.error('Update car error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to update car'
    });
  } finally {
    client.release();
  }
};

/**
 * Delete pod
 */
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM cars WHERE id = $1 RETURNING *',
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    if (result.rows[0].image_url) {
      const filePath = path.join(__dirname, '../../', result.rows[0].image_url);
      safeDeleteFile(filePath);
    }

    return res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      car: result.rows[0]
    });

  } catch (error) {
    console.error('Delete car error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to delete car'
    });
  }
};
