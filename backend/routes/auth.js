import express from 'express';
import { signup, login, getProfile } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyToken, getProfile);

export default router;
