const sequelize = require('../config/database');
require('../models');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Attention: force: true supprimera toutes les données existantes
    console.log('Base de données synchronisée avec succès.');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
    process.exit(1);
  }
}

syncDatabase(); 