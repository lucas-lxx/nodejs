const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node_complete',
    'lucas',
    'Ognms1011##',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;