import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('🎉 서버 정상 작동 중!'));

// ✅ 여기부터 추가
sequelize.authenticate()
    .then(() => {
        console.log('🟢 DB 연결 성공!');
        return sequelize.sync(); // 모델 동기화
    })
    .then(() => {
        console.log('🟢 DB Sync 완료');
        app.listen(PORT, () => {
            console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ DB 연결 실패:', err);
    });
