const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { Etudiant, Retard, Absence } = require('../models');

// Obtenir tous les étudiants
router.get('/', protect, async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll({
      include: [
        {
          model: Retard,
          attributes: ['id', 'date', 'duree', 'justifie']
        },
        {
          model: Absence,
          attributes: ['id', 'date', 'justifie']
        }
      ]
    });
    res.json({ success: true, data: etudiants });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Ajouter un étudiant
router.post('/', protect, async (req, res) => {
  try {
    const etudiant = await Etudiant.create(req.body);
    res.status(201).json({
      success: true,
      data: etudiant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Obtenir un étudiant par ID
router.get('/:id', protect, async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id, {
      include: [
        {
          model: Retard,
          attributes: ['id', 'date', 'duree', 'justifie']
        },
        {
          model: Absence,
          attributes: ['id', 'date', 'justifie']
        }
      ]
    });
    
    if (!etudiant) {
      return res.status(404).json({
        success: false,
        message: 'Étudiant non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: etudiant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Mettre à jour un étudiant
router.put('/:id', protect, async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id);
    
    if (!etudiant) {
      return res.status(404).json({
        success: false,
        message: 'Étudiant non trouvé'
      });
    }
    
    await etudiant.update(req.body);
    
    res.json({
      success: true,
      data: etudiant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Supprimer un étudiant
router.delete('/:id', protect, async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id);
    
    if (!etudiant) {
      return res.status(404).json({
        success: false,
        message: 'Étudiant non trouvé'
      });
    }
    
    await etudiant.destroy();
    
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