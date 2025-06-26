import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// multer 설정 (uploads 폴더에 저장)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // 원본 이름 유지 + 시간 추가
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// POST /images/upload
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: '이미지가 업로드되지 않았습니다.' });
    }

    // 업로드 성공 시 경로 반환 (필요시 DB 저장 로직 추가)
    res.status(200).json({
        message: '이미지 업로드 성공',
        imagePath: `/uploads/${req.file.filename}`
    });
});

export default router;