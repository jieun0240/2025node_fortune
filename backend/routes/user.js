import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['id', 'email', 'nickname'] });
        if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 에러' });
    }
});

export default router;
