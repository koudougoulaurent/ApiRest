const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const authRoutes = require('./routes/auth');
const etudiantRoutes = require('./routes/etudiant');
const retardRoutes = require('./routes/retard');
const absenceRoutes = require('./routes/absence');

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/retards', retardRoutes);
app.use('/api/absences', absenceRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 