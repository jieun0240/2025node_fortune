import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const UserFortune = sequelize.define('UserFortune', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('positive', 'negative', 'lucky'),
        allowNull: false,
    },
    issued_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'fortunes',
    timestamps: false,
});

export default UserFortune;
