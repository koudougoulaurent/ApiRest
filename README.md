# Gestion des Retards - Backend

API Node.js pour la gestion des retards et absences des étudiants.

## Fonctionnalités

- Gestion des étudiants
- Gestion des retards et absences
- API RESTful
- Base de données MySQL

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v8.0 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le dépôt
```bash
git clone [URL_DU_REPO]
cd backend
```

2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

3. Configurer la base de données
- Créer une base de données MySQL nommée `gestion_retard`
- Configurer les variables d'environnement dans `.env`

4. Démarrer le serveur
```bash
npm start
# ou
yarn start
```

## Structure du projet

```
backend/
├── config/           # Configuration
├── controllers/      # Contrôleurs
├── models/          # Modèles Sequelize
├── routes/          # Routes API
├── middlewares/     # Middlewares
└── server.js        # Point d'entrée
```

## Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=gestion_retard
PORT=5000
```

## API Endpoints

### Étudiants
- `GET /api/etudiants` - Liste des étudiants
- `POST /api/etudiants` - Créer un étudiant
- `GET /api/etudiants/:id` - Détails d'un étudiant
- `PUT /api/etudiants/:id` - Mettre à jour un étudiant
- `DELETE /api/etudiants/:id` - Supprimer un étudiant

### Retards
- `GET /api/retards` - Liste des retards
- `POST /api/retards` - Créer un retard
- `GET /api/retards/:id` - Détails d'un retard
- `PUT /api/retards/:id` - Mettre à jour un retard
- `DELETE /api/retards/:id` - Supprimer un retard

### Absences
- `GET /api/absences` - Liste des absences
- `POST /api/absences` - Créer une absence
- `GET /api/absences/:id` - Détails d'une absence
- `PUT /api/absences/:id` - Mettre à jour une absence
- `DELETE /api/absences/:id` - Supprimer une absence

## Développement

Pour lancer le serveur en mode développement :

```bash
npm run dev
# ou
yarn dev
```

## Tests

```bash
npm test
# ou
yarn test
``` 