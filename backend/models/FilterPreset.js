// models/FilterPreset.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const FilterPreset = sequelize.define('FilterPreset', {
    category: {
        type: DataTypes.ENUM('positive', 'negative', 'lucky'),
        allowNull: false,
    },
    filter_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'filter_presets',
    timestamps: false,
});

export default FilterPreset;
