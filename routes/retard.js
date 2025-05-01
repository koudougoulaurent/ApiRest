const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { Retard, Etudiant } = require('../models');

// Créer un retard
router.post('/', protect, async (req, res) => {
  try {
    const retard = await Retard.create({
      ...req.body,
      professorId: req.user.id
    });

    // Mettre à jour le total des retards de l'étudiant
    const etudiant = await Etudiant.findByPk(req.body.etudiantId);
    await etudiant.update({
      totalRetards: etudiant.totalRetards + 1
    });

    res.status(201).json({
      success: true,
      data: retard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Obtenir tous les retards
router.get('/', protect, async (req, res) => {
  try {
    const retards = await Retard.findAll({
      include: [
        {
          model: Etudiant,
          attributes: ['id', 'nom', 'prenom', 'classe']
        }
      ]
    });
    res.json({
      success: true,
      data: retards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Obtenir un retard par ID
router.get('/:id', protect, async (req, res) => {
  try {
    const retard = await Retard.findByPk(req.params.id, {
      include: [
        {
          model: Etudiant,
          attributes: ['id', 'nom', 'prenom', 'classe']
        }
      ]
    });

    if (!retard) {
      return res.status(404).json({
        success: false,
        message: 'Retard non trouvé'
      });
    }

    res.json({
      success: true,
      data: retard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Mettre à jour un retard
router.put('/:id', protect, async (req, res) => {
  try {
    const retard = await Retard.findByPk(req.params.id);

    if (!retard) {
      return res.status(404).json({
        success: false,
        message: 'Retard non trouvé'
      });
    }

    await retard.update(req.body);

    res.json({
      success: true,
      data: retard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Supprimer un retard
router.delete('/:id', protect, async (req, res) => {
  try {
    const retard = await Retard.findByPk(req.params.id);

    if (!retard) {
      return res.status(404).json({
        success: false,
        message: 'Retard non trouvé'
      });
    }

    // Mettre à jour le total des retards de l'étudiant
    const etudiant = await Etudiant.findByPk(retard.etudiantId);
    await etudiant.update({
      totalRetards: etudiant.totalRetards - 1
    });

    await retard.destroy();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 