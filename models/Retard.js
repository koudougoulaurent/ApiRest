const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Retard = sequelize.define('Retard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  duree: {
    type: DataTypes.INTEGER, // en minutes
    allowNull: false
  },
  justifie: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  etudiantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Etudiants',
      key: 'id'
    }
  },
  professorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Retard; 