import { pool } from '../config/database.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/cars');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'car-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Create a new car with image upload
export const createCar = async (req, res) => {
  try {
    const { category_id, name, model } = req.body;

    if (!name || !model) {
      return res.status(400).json({ error: 'Car name and model are required' });
    }

    // Get image URL if file was uploaded
    const image_url = req.file ? `/uploads/cars/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO cars (category_id, name, model, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [category_id || null, name, model, image_url]
    );

    res.status(201).json({
      message: 'Car created successfully',
      car: result.rows[0]
    });
  } catch (error) {
    // Delete uploaded file if database insertion fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

// Display all cars
export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, cc.name as category_name 
      FROM cars c
      LEFT JOIN car_categories cc ON c.category_id = cc.id
      ORDER BY c.created_at DESC
    `);

    res.status(200).json({
      message: 'Cars retrieved successfully',
      cars: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

// Get a single car by ID
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT c.*, cc.name as category_name 
      FROM cars c
      LEFT JOIN car_categories cc ON c.category_id = cc.id
      WHERE c.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({
      message: 'Car retrieved successfully',
      car: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

// Edit/Update a car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, model } = req.body;

    if (!name || !model) {
      return res.status(400).json({ error: 'Car name and model are required' });
    }

    // Check if car exists and get old image
    const oldCar = await pool.query('SELECT image_url FROM cars WHERE id = $1', [id]);
    
    if (oldCar.rows.length === 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Car not found' });
    }

    // Get new image URL if file was uploaded, otherwise keep old one
    let image_url = oldCar.rows[0].image_url;
    
    if (req.file) {
      image_url = `/uploads/cars/${req.file.filename}`;
      
      // Delete old image file if it exists
      if (oldCar.rows[0].image_url) {
        const oldImagePath = path.join(__dirname, '../../', oldCar.rows[0].image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const result = await pool.query(
      'UPDATE cars SET category_id = $1, name = $2, model = $3, image_url = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [category_id || null, name, model, image_url, id]
    );

    res.status(200).json({
      message: 'Car updated successfully',
      car: result.rows[0]
    });
  } catch (error) {
    // Delete uploaded file if database update fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM cars WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Delete image file if it exists
    if (result.rows[0].image_url) {
      const imagePath = path.join(__dirname, '../../', result.rows[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: 'Car deleted successfully',
      car: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
