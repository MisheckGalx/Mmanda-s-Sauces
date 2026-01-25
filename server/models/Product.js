const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: '🌶️'
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Classic'
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ingredients: {
    type: DataTypes.TEXT
  },
  heatLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  size: {
    type: DataTypes.STRING,
    defaultValue: '250ml'
  }
});

module.exports = Product;
