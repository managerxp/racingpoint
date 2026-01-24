import bcrypt from 'bcryptjs';
import { pool } from '../config/database.js';

// Admin Login (special login for admin from .env)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if it's the admin from .env
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    // Verify password matches .env password
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    // Get or create admin user
    let result = await pool.query(
      'SELECT id, email, first_name, last_name, is_admin FROM users WHERE email = $1 AND is_admin = true',
      [email]
    );

    let adminUser = result.rows[0];

    // If admin doesn't exist in DB, create it
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password, is_admin) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, email, first_name, last_name, is_admin`,
        ['Admin', 'System', email, hashedPassword, true]
      );
      adminUser = result.rows[0];
    }

    // For JWT token generation, we'd need to import jwt
    const token = req.headers.authorization?.split(' ')[1] || 'admin-token-placeholder';

    res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: adminUser,
        token
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Admin login failed' 
    });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, phone, dob, is_admin, created_at 
       FROM users 
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      data: {
        users: result.rows.map(user => ({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          isAdmin: user.is_admin,
          createdAt: user.created_at
        }))
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch users' 
    });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(userId) === req.user.id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete your own account' 
      });
    }

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, email',
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: {
        deletedUser: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete user' 
    });
  }
};

// Get admin dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsersResult = await pool.query(
      'SELECT COUNT(*) as count FROM users'
    );
    
    // Get today's registrations
    const todayRegistrationsResult = await pool.query(
      `SELECT COUNT(*) as count FROM users 
       WHERE DATE(created_at) = CURRENT_DATE`
    );
    
    // Get admin count
    const adminCountResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE is_admin = true'
    );

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers: parseInt(totalUsersResult.rows[0].count),
          todayRegistrations: parseInt(todayRegistrationsResult.rows[0].count),
          adminCount: parseInt(adminCountResult.rows[0].count)
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard stats' 
    });
  }
};