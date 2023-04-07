const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        // define: {
        //     charset: 'utf8mb4',
        //     collate: 'utf8mb4_unicode_ci'
        // }
        // define: {
        //     charset: 'utf8mb4',
        //     collate: 'utf8mb4_unicode_ci'
        // }
    }
);

module.exports = sequelize;