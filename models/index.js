const User = require('./User');
const Etudiant = require('./Etudiant');
const Retard = require('./Retard');
const Absence = require('./Absence');

// Relations
User.hasMany(Retard, { foreignKey: 'professorId' });
User.hasMany(Absence, { foreignKey: 'professorId' });

Etudiant.hasMany(Retard, { foreignKey: 'etudiantId' });
Etudiant.hasMany(Absence, { foreignKey: 'etudiantId' });

Retard.belongsTo(User, { foreignKey: 'professorId' });
Retard.belongsTo(Etudiant, { foreignKey: 'etudiantId' });

Absence.belongsTo(User, { foreignKey: 'professorId' });
Absence.belongsTo(Etudiant, { foreignKey: 'etudiantId' });

module.exports = {
  User,
  Etudiant,
  Retard,
  Absence
}; 