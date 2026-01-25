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
    const uploadDir = path.join(__dirname, '../../uploads/tracks');
    console.log('Multer destination:', uploadDir);
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      console.log('Creating directory:', uploadDir);
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    console.log('Directory exists:', fs.existsSync(uploadDir));
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'track-' + uniqueSuffix + path.extname(file.originalname);
    console.log('Multer filename:', filename);
    cb(null, filename);
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

// Create a new track with image upload
export const createTrack = async (req, res) => {
  try {
    const { name, length_km, country, difficulty_level } = req.body;

    console.log('Creating track with data:', { name, length_km, country, difficulty_level });
    console.log('Uploaded file:', req.file);

    if (!name || !length_km) {
      return res.status(400).json({ error: 'Track name and length are required' });
    }

    // Get image URL if file was uploaded
    const image_url = req.file ? `/uploads/tracks/${req.file.filename}` : null;
    console.log('Image URL:', image_url);

    const result = await pool.query(
      'INSERT INTO tracks (name, length_km, country, image_url, difficulty_level) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, parseFloat(length_km), country || null, image_url, difficulty_level || null]
    );

    res.status(201).json({
      message: 'Track created successfully',
      track: result.rows[0]
    });
  } catch (error) {
    // Delete uploaded file if database insertion fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating track:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Track name already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create track' });
  }
};

// Display all tracks
export const getAllTracks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM tracks
      ORDER BY created_at DESC
    `);

    console.log('Fetched tracks:', result.rows);

    res.status(200).json({
      message: 'Tracks retrieved successfully',
      tracks: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
};

// Get a single track by ID
export const getTrackById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM tracks WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.status(200).json({
      message: 'Track retrieved successfully',
      track: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching track:', error);
    res.status(500).json({ error: 'Failed to fetch track' });
  }
};

// Edit/Update a track
export const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, length_km, country, difficulty_level } = req.body;

    if (!name || !length_km) {
      return res.status(400).json({ error: 'Track name and length are required' });
    }

    // Check if track exists and get old image
    const oldTrack = await pool.query('SELECT image_url FROM tracks WHERE id = $1', [id]);
    
    if (oldTrack.rows.length === 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Track not found' });
    }

    // Get new image URL if file was uploaded, otherwise keep old one
    let image_url = oldTrack.rows[0].image_url;
    
    if (req.file) {
      image_url = `/uploads/tracks/${req.file.filename}`;
      
      // Delete old image file if it exists
      if (oldTrack.rows[0].image_url) {
        const oldImagePath = path.join(__dirname, '../../', oldTrack.rows[0].image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const result = await pool.query(
      'UPDATE tracks SET name = $1, length_km = $2, country = $3, image_url = $4, difficulty_level = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [name, parseFloat(length_km), country || null, image_url, difficulty_level || null, id]
    );

    res.status(200).json({
      message: 'Track updated successfully',
      track: result.rows[0]
    });
  } catch (error) {
    // Delete uploaded file if database update fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating track:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Track name already exists' });
    }
    
    res.status(500).json({ error: 'Failed to update track' });
  }
};

// Delete a track
export const deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tracks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Track not found' });
    }

    // Delete image file if it exists
    if (result.rows[0].image_url) {
      const imagePath = path.join(__dirname, '../../', result.rows[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: 'Track deleted successfully',
      track: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting track:', error);
    res.status(500).json({ error: 'Failed to delete track' });
  }
};
