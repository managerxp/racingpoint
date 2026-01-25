import express from 'express';
import {
    createCarCategory,
    getAllCarCategories,
    getCarCategoryById,
    updateCarCategory,
    deleteCarCategory
} from '../controllers/carCategory.Controller.js';

const carCategoryRouter = express.Router();

carCategoryRouter.post('/', createCarCategory);
carCategoryRouter.get('/', getAllCarCategories);
carCategoryRouter.get('/:id', getCarCategoryById);
carCategoryRouter.put('/:id', updateCarCategory);
carCategoryRouter.delete('/:id', deleteCarCategory);

export default carCategoryRouter;