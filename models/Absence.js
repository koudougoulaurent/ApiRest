const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Absence = sequelize.define('Absence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
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

module.exports = Absence; 