/**
 * Availability Routes
 *
 * Read-only endpoints
 */

import express from 'express';
import { getAvailability } from '../controllers/availability.Controller.js';

const availabilityRouter = express.Router();

availabilityRouter.get('/', getAvailability);

export default availabilityRouter;
