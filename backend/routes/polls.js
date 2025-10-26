const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Get all active polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find({ 
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: new Date() } }
      ]
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: polls });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single poll
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ success: false, error: 'Poll not found' });
    }
    res.json({ success: true, data: poll });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new poll
router.post('/', async (req, res) => {
  try {
    const poll = new Poll(req.body);
    await poll.save();
    res.status(201).json({ success: true, data: poll });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Vote on a poll
router.post('/:id/vote', async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({ success: false, error: 'Poll not found' });
    }
    
    if (!poll.isActive) {
      return res.status(400).json({ success: false, error: 'Poll is not active' });
    }
    
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ success: false, error: 'Invalid option' });
    }
    
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    await poll.save();
    
    res.json({ success: true, data: poll });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update poll
router.put('/:id', async (req, res) => {
  try {
    const poll = await Poll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!poll) {
      return res.status(404).json({ success: false, error: 'Poll not found' });
    }
    res.json({ success: true, data: poll });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
