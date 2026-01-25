import express from 'express';
import {
    createCategory as createCarCategory,
    getAllCategories as getAllCarCategories,
    updateCategory as updateCarCategory,
    deleteCategory as deleteCarCategory
} from '../controllers/carCateory.Controller.js';

const carCategoryRouter = express.Router();

carCategoryRouter.post('/', createCarCategory);
carCategoryRouter.get('/', getAllCarCategories);
carCategoryRouter.put('/:id', updateCarCategory);
carCategoryRouter.delete('/:id', deleteCarCategory);

export default carCategoryRouter;