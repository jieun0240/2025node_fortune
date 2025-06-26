import Fortune from '../models/UserFortune.js';
import { sequelize } from '../models/index.js';
import FilterPreset from '../models/FilterPreset.js';

export const getTodayFortune = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date().toISOString().slice(0, 10);

        // 1. 오늘의 운세가 이미 있는지 확인
        let fortune = await Fortune.findOne({
            where: {
                user_id: userId,
                issued_date: today,
            },
        });

        // 2. 없으면 새로 생성
        if (!fortune) {
            const [results] = await sequelize.query(`
        SELECT content, category 
        FROM fortune_templates 
        ORDER BY RAND() 
        LIMIT 1
      `);

            if (results.length === 0) {
                return res.status(404).json({ message: '포춘 문구가 없습니다.' });
            }

            const { content, category } = results[0];

            fortune = await Fortune.create({
                user_id: userId,
                content,
                category,
                issued_date: today,
            });
        }

        // 3. category에 맞는 필터 조회
        const filter = await FilterPreset.findOne({
            where: { category: fortune.category },
        });

        // 4. 응답 리턴
        return res.json({
            content: fortune.content,
            category: fortune.category,
            filter: filter
                ? {
                    name: filter.filter_name,
                    image: filter.image_path,
                }
                : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};