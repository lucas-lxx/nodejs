const { Sequelize } = require('sequelize');
const sqlFormatter = require('sql-formatter');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  'asdffdsa',
  {
    dialect: 'postgres',
    host: 'postgres',
    logging: (msg) => {
      const formattedSql = sqlFormatter.format(msg, { language: 'postgresql'}); // Format the SQL query
      console.log('\x1b[36m%s\x1b[0m', formattedSql); // Log the formatted query in cyan
    },
    logQueryParameters: true
  }
);

module.exports = sequelize;
