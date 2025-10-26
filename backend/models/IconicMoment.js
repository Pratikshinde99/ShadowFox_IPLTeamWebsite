const mongoose = require('mongoose');

const iconicMomentSchema = new mongoose.Schema({
  momentId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  shortTitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['batting', 'partnership', 'team', 'championship', 'fans', 'bowling', 'fielding'],
    required: true
  },
  opponent: {
    type: String,
    default: ''
  },
  venue: {
    type: String,
    default: ''
  },
  stats: mongoose.Schema.Types.Mixed,
  highlights: [String],
  images: [{
    path: String,
    caption: String,
    isHero: { type: Boolean, default: false }
  }],
  sourceUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  impactScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 8
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isChampionship: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('IconicMoment', iconicMomentSchema);
