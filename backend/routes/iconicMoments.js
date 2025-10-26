const express = require('express');
const router = express.Router();
const IconicMoment = require('../models/IconicMoment');

// Get all iconic moments
router.get('/', async (req, res) => {
  try {
    const { category, season, featured } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (season) query.season = season;
    if (featured === 'true') query.isFeatured = true;
    
    const moments = await IconicMoment.find(query)
      .sort({ date: -1, impactScore: -1 });
    res.json({ success: true, data: moments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single iconic moment
router.get('/:id', async (req, res) => {
  try {
    const moment = await IconicMoment.findById(req.params.id);
    if (!moment) {
      return res.status(404).json({ success: false, error: 'Iconic moment not found' });
    }
    res.json({ success: true, data: moment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new iconic moment (admin)
router.post('/', async (req, res) => {
  try {
    const moment = new IconicMoment(req.body);
    await moment.save();
    res.status(201).json({ success: true, data: moment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update iconic moment
router.put('/:id', async (req, res) => {
  try {
    const moment = await IconicMoment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!moment) {
      return res.status(404).json({ success: false, error: 'Iconic moment not found' });
    }
    res.json({ success: true, data: moment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete iconic moment
router.delete('/:id', async (req, res) => {
  try {
    const moment = await IconicMoment.findByIdAndDelete(req.params.id);
    if (!moment) {
      return res.status(404).json({ success: false, error: 'Iconic moment not found' });
    }
    res.json({ success: true, message: 'Iconic moment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
