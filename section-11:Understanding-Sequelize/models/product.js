const {DataTypes} = require('sequelize');


const sequelize = require('../util/database');

const Products = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV1,
    unique: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://preview.redd.it/toea7o9mmk481.jpg?width=1080&crop=smart&auto=webp&s=ff47ea91395dacbc8eb8a214a63d7f1d3e1b307a"
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  }
})

module.exports = Products;