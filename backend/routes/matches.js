const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get all matches
router.get('/', async (req, res) => {
  try {
    const { status, season } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (season) query.season = season;
    
    const matches = await Match.find(query).sort({ date: -1 });
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get upcoming matches
router.get('/upcoming', async (req, res) => {
  try {
    const matches = await Match.find({ 
      status: 'upcoming',
      date: { $gte: new Date() }
    }).sort({ date: 1 }).limit(5);
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get live matches
router.get('/live', async (req, res) => {
  try {
    const matches = await Match.find({ status: 'live' });
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get completed matches
router.get('/completed', async (req, res) => {
  try {
    const matches = await Match.find({ status: 'completed' })
      .sort({ date: -1 })
      .limit(10);
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found' });
    }
    res.json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new match
router.post('/', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update match
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found' });
    }
    res.json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
