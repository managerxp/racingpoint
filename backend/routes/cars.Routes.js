import express from 'express';
import { 
  createCar, 
  getAllCars, 
  getCarById, 
  updateCar, 
  deleteCar, 
  upload 
} from '../controllers/cars.Controller.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const carRouter = express.Router();


carRouter.get('/', getAllCars);
carRouter.get('/:id', getCarById);
carRouter.post('/', authenticateToken, authorizeAdmin, upload.single('image'), createCar);
carRouter.put('/:id', authenticateToken, authorizeAdmin, upload.single('image'), updateCar);
carRouter.delete('/:id', authenticateToken, authorizeAdmin, deleteCar);

export default carRouter;