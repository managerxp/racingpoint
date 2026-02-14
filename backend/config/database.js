// ... keep all your existing imports
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log(' Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    return false;
  }
};

// Initialize database with tables
const initializeDatabase = async () => {
  try {
    if (!await testConnection()) {
      throw new Error('Database connection failed');
    }

    // ---------------- USERS ----------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        dob DATE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ---------------- CAR CATEGORIES ----------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS car_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ---------------- CARS (PODS) ----------------
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES car_categories(id) ON DELETE SET NULL,
        name VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        image_url TEXT,

        /* NEW DOMAIN COLUMNS */
        status VARCHAR(30) DEFAULT 'ACTIVE',
        operating_hours JSONB DEFAULT '{}'::jsonb,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ---------------- SAFE MIGRATIONS ----------------
    await pool.query(`
      ALTER TABLE cars
      ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'ACTIVE';
    `);

    await pool.query(`
      ALTER TABLE cars
      ADD COLUMN IF NOT EXISTS operating_hours JSONB DEFAULT '{}'::jsonb;
    `);

    // ---------------- INDEXES ----------------
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
    `);

    // ---------------- ADMIN SEED ----------------
    const adminEmail = process.env.ADMIN_EMAIL;

    const adminResult = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_admin = true',
      [adminEmail]
    );

    if (adminResult.rows.length === 0 && adminEmail) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await pool.query(
        `INSERT INTO users (first_name, last_name, email, password, is_admin) 
         VALUES ($1, $2, $3, $4, $5)`,
        ['Admin', 'System', adminEmail, hashedPassword, true]
      );

      console.log(' Admin user created successfully');
    }

    console.log(' Database initialized successfully');
    return true;

  } catch (error) {
    console.error(' Error initializing database:', error);
    throw error;
  }
};

export { pool, initializeDatabase, testConnection };
