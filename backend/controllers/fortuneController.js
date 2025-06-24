import Fortune from '../models/UserFortune.js';
import { sequelize } from '../models/index.js';

// 컨트롤러 수정
export const getTodayFortune = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date().toISOString().slice(0, 10);

        // 오늘 이미 발급된 포춘 있는지 확인
        const existing = await Fortune.findOne({
            where: {
                user_id: userId,
                issued_date: today,
            }
        });

        if (existing) {
            return res.json({
                content: existing.content,
                category: existing.category
            });
        }

        const [results] = await sequelize.query(`
            SELECT content, category FROM fortune_templates ORDER BY RAND() LIMIT 1 `);

        if (results.length === 0) {
            return res.status(404).json({ message: '포춘 문구가 없습니다.' });
        }

        const { content, category } = results[0];

        await Fortune.create({
            user_id: userId,
            content,
            category,
            issued_date: today,
        });

        res.json({ content, category });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};

