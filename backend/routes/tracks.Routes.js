import express from 'express';
import { 
  createTrack, 
  getAllTracks, 
  getTrackById, 
  updateTrack, 
  deleteTrack, 
  upload 
} from '../controllers/tracks.Controller.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const trackRouter = express.Router();


trackRouter.get('/', getAllTracks);
trackRouter.get('/:id', getTrackById);
trackRouter.post('/', authenticateToken, authorizeAdmin, upload.single('image'), createTrack);
trackRouter.put('/:id', authenticateToken, authorizeAdmin, upload.single('image'), updateTrack);
trackRouter.delete('/:id', authenticateToken, authorizeAdmin, deleteTrack);

export default trackRouter;
