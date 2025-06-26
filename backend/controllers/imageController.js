import multer from 'multer';
import path from 'path';
import SavedImage from '../models/SavedImage.js';

// multer 설정
const storage = multer.diskStorage({
    destination: 'uploads/', // 저장할 폴더
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
    }
});

export const upload = multer({ storage });

export const saveImage = async (req, res) => {
    try {
        const imagePath = `/uploads/${req.file.filename}`;

        const saved = await SavedImage.create({
            user_id: req.user.id,
            image_url: imagePath,
        });

        res.status(201).json({ message: '이미지 저장 완료', url: imagePath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};