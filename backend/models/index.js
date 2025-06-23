import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Sequelize 연결 구성 중... ===');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mysql',
        logging: false,
    }
);

export { sequelize, Sequelize };
