const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Get all players
router.get('/', async (req, res) => {
  try {
    const { role, season } = req.query;
    let query = { isActive: true };
    
    if (role) query.role = role;
    if (season) query.season = season;
    
    const players = await Player.find(query).sort({ jerseyNumber: 1 });
    res.json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single player
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, error: 'Player not found' });
    }
    res.json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new player (admin)
router.post('/', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json({ success: true, data: player });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update player
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!player) {
      return res.status(404).json({ success: false, error: 'Player not found' });
    }
    res.json({ success: true, data: player });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ success: false, error: 'Player not found' });
    }
    res.json({ success: true, message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
