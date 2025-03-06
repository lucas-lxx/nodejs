const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'finance',
    'financier',
    'asdffdsa',
    {
        dialect: 'postgres',
        host: 'postgres'
    }
);

module.exports = sequelize;
