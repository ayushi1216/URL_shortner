const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Url = sequelize.define('Url', {
    shortId: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false
    },
    originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true
});

module.exports = Url;

