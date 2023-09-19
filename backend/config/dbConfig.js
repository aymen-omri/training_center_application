let mysql = require('mysql2');

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('formation', 'root', '1234567', {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
});

module.exports = sequelize; 