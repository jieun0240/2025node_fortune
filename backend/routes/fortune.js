import express from 'express';
import { getTodayFortune } from '../controllers/fortuneController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/today', verifyToken, getTodayFortune);

export default router;
