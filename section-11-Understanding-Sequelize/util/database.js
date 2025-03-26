const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    'asdffdsa',
    {
        dialect: 'postgres',
        host: 'postgres'
    }
);

module.exports = sequelize;
