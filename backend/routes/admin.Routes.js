import express from 'express';
import { 
  adminLogin, 
  getAllUsers, 
  deleteUser, 
  getDashboardStats 
} from '../controllers/admin.Controller.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin login (special route for admin credentials from .env)
router.post('/login', adminLogin);

// Protected admin routes (require authentication + admin role)
router.get('/users', authenticateAdmin, getAllUsers);
router.delete('/users/:userId', authenticateAdmin, deleteUser);
router.get('/dashboard/stats', authenticateAdmin, getDashboardStats);

export default router;