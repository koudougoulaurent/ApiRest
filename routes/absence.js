const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { Absence, Etudiant } = require('../models');

// Créer une absence
router.post('/', protect, async (req, res) => {
  try {
    const absence = await Absence.create({
      ...req.body,
      professorId: req.user.id
    });

    // Mettre à jour le total des absences de l'étudiant
    const etudiant = await Etudiant.findByPk(req.body.etudiantId);
    await etudiant.update({
      totalAbsences: etudiant.totalAbsences + 1
    });

    res.status(201).json({
      success: true,
      data: absence
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Obtenir toutes les absences
router.get('/', protect, async (req, res) => {
  try {
    const absences = await Absence.findAll({
      include: [
        {
          model: Etudiant,
          attributes: ['id', 'nom', 'prenom', 'classe']
        }
      ]
    });
    res.json({
      success: true,
      data: absences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Obtenir une absence par ID
router.get('/:id', protect, async (req, res) => {
  try {
    const absence = await Absence.findByPk(req.params.id, {
      include: [
        {
          model: Etudiant,
          attributes: ['id', 'nom', 'prenom', 'classe']
        }
      ]
    });

    if (!absence) {
      return res.status(404).json({
        success: false,
        message: 'Absence non trouvée'
      });
    }

    res.json({
      success: true,
      data: absence
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Mettre à jour une absence
router.put('/:id', protect, async (req, res) => {
  try {
    const absence = await Absence.findByPk(req.params.id);

    if (!absence) {
      return res.status(404).json({
        success: false,
        message: 'Absence non trouvée'
      });
    }

    await absence.update(req.body);

    res.json({
      success: true,
      data: absence
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Supprimer une absence
router.delete('/:id', protect, async (req, res) => {
  try {
    const absence = await Absence.findByPk(req.params.id);

    if (!absence) {
      return res.status(404).json({
        success: false,
        message: 'Absence non trouvée'
      });
    }

    // Mettre à jour le total des absences de l'étudiant
    const etudiant = await Etudiant.findByPk(absence.etudiantId);
    await etudiant.update({
      totalAbsences: etudiant.totalAbsences - 1
    });

    await absence.destroy();

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