const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        dialectModule: require('mysql2'),
        dialectOptions: {
            connectTimeout: 20000
        },
        ssl: {
            rejectUnauthorized: true
        }
    }
);

(() => {
    try {
        // Test the DB connection
        sequelize.authenticate().then(() => {
            console.log('✅ Database connection has been established successfully.');
        }).catch((error) => {
            console.error('❌ Unable to connect to the database:', error);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
