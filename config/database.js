const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('gestion_retard', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true
  }
});

module.exports = sequelize; 