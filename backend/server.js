import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.Routes.js';
import adminRoutes from './routes/admin.Routes.js';
import carCategoryRouter from './routes/carCateory.Routes.js';
import carRouter from './routes/cars.Routes.js';
import trackRouter from './routes/tracks.Routes.js';

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug: Log current directory structure
console.log('\n=== Server Startup Info ===');
console.log('Current working directory:', process.cwd());
console.log('Server file directory:', __dirname);
console.log('Project root:', path.resolve(__dirname, '..'));

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsDir);

// Create uploads directory if it doesn't exist
(async () => {
  try {
    await fs.access(uploadsDir);
    console.log(' Uploads directory exists');
    
    // List files in uploads directory
    const files = await fs.readdir(uploadsDir);
    console.log(` Files in uploads directory:`, files);
    
    // Check if cars subdirectory exists
    const carsDir = path.join(uploadsDir, 'cars');
    try {
      await fs.access(carsDir);
      const carFiles = await fs.readdir(carsDir);
      console.log(`Car images found:`, carFiles);
    } catch {
      console.log('Cars subdirectory does not exist');
    }
  } catch (error) {
    console.log('Uploads directory does not exist, creating...');
    await fs.mkdir(uploadsDir, { recursive: true });
    console.log(' Uploads directory created');
  }
})();

// Static files - serve uploads folder with multiple path options
const staticOptions = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
};

// Try multiple path configurations
const possiblePaths = [
  path.join(__dirname, 'uploads'),          // Relative to server file
  path.join(process.cwd(), 'uploads'),      // Relative to working directory
  path.join(__dirname, '..', 'uploads'),    // One level up
];

for (const staticPath of possiblePaths) {
  console.log(`\nTrying to serve static files from: ${staticPath}`);
  app.use('/uploads', express.static(staticPath, staticOptions));
}

// Test route to check file access
app.get('/api/debug/check-file/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    console.log(`\n🔍 Checking file: ${filename}`);
    
    let fileFound = false;
    let foundPath = '';
    
    // Check in all possible locations
    for (const basePath of possiblePaths) {
      const filePath = path.join(basePath, 'cars', filename);
      const relativePath = path.join('cars', filename);
      const fullPath = path.join(basePath, relativePath);
      
      console.log(`Checking: ${fullPath}`);
      
      try {
        await fs.access(fullPath);
        fileFound = true;
        foundPath = fullPath;
        
        // Get file stats
        const stats = await fs.stat(fullPath);
        
        res.json({
          success: true,
          message: 'File exists',
          filename,
          path: foundPath,
          relativePath,
          url: `/uploads/cars/${filename}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          accessible: true
        });
        return;
      } catch (error) {
        console.log(` Not found at: ${fullPath}`);
      }
    }
    
    // If not found anywhere
    res.status(404).json({
      success: false,
      message: 'File not found in any configured location',
      filename,
      checkedPaths: possiblePaths.map(p => path.join(p, 'cars', filename))
    });
    
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// List all car images
app.get('/api/debug/list-car-images', async (req, res) => {
  try {
    const results = [];
    
    for (const basePath of possiblePaths) {
      const carsDir = path.join(basePath, 'cars');
      
      try {
        const files = await fs.readdir(carsDir);
        results.push({
          path: basePath,
          exists: true,
          files: files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
        });
      } catch (error) {
        results.push({
          path: basePath,
          exists: false,
          error: error.message
        });
      }
    }
    
    res.json({
      success: true,
      message: 'Car images check',
      results,
      totalImages: results.reduce((sum, r) => sum + (r.files ? r.files.length : 0), 0)
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error listing images',
      error: error.message
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/car-categories', carCategoryRouter);
app.use('/api/cars', carRouter);
app.use('/api/tracks', trackRouter);

// Health check route with more info
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uploadsPath: __dirname
  });
});

// Test static file route
app.get('/test-image/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(`\n Serving test image: ${filename}`);
  console.log(`Requested URL: ${req.originalUrl}`);
  console.log(`Should serve from: /uploads/cars/${filename}`);
  
  // Redirect to the actual static file
  res.redirect(`/uploads/cars/${filename}`);
});

// 404 handler
app.use((req, res) => {
  console.log(`\n 404 Not Found: ${req.method} ${req.originalUrl}`);
  console.log('Request headers:', req.headers);
  console.log('Request params:', req.params);
  console.log('Request query:', req.query);
  
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('\n Error Stack:', err.stack);
  console.error('Error Message:', err.message);
  console.error('Request URL:', req.originalUrl);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      path: req.path,
      method: req.method
    })
  });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`\n Server is running on port ${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(` Server URL: http://localhost:${PORT}`);
      console.log(` Uploads being served at: http://localhost:${PORT}/uploads/`);
      console.log(` Debug endpoints:`);
      console.log(`   http://localhost:${PORT}/api/debug/list-car-images`);
      console.log(`   http://localhost:${PORT}/api/debug/check-file/car-1769340365051-764985331.jpg`);
      console.log(`   http://localhost:${PORT}/test-image/car-1769340365051-764985331.jpg`);
      console.log(`   http://localhost:${PORT}/health`);
      
      // Test if the specific file is accessible
      
    });
  } catch (error) {
    console.error('\n Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;