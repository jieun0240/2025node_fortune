import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
    const { email, password, nickname } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashed, nickname });

        res.status(201).json({ message: '회원가입 완료!', userId: newUser.id });
    } catch (err) {
        console.error(err);
        // res.status(500).json({ message: '서버 에러' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: '사용자 없음' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: '비밀번호 틀림' });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, nickname: user.nickname });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};