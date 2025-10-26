const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    
    // Send confirmation email (optional)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: feedback.email,
        subject: 'Thank you for your feedback - RCB Universe',
        html: `
          <h2>Thank you for your feedback!</h2>
          <p>Dear ${feedback.name},</p>
          <p>We have received your feedback and appreciate you taking the time to share your thoughts with us.</p>
          <p><strong>Your Message:</strong></p>
          <p>${feedback.message}</p>
          <p><strong>Rating:</strong> ${feedback.rating}/5 ⭐</p>
          <br>
          <p>Ee Sala Cup Namde! 🏆</p>
          <p>Team RCB Universe</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }
    
    res.status(201).json({ 
      success: true, 
      data: feedback,
      message: 'Thank you for your feedback!' 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Mark feedback as read
router.patch('/:id/read', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
