const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']
  },
  nationality: {
    type: String,
    required: true
  },
  battingStyle: {
    type: String,
    default: 'N/A'
  },
  bowlingStyle: {
    type: String,
    default: 'N/A'
  },
  jerseyNumber: {
    type: Number
  },
  photo: {
    type: String,
    default: '/images/default-player.png'
  },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    fifties: { type: Number, default: 0 },
    hundreds: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    catches: { type: Number, default: 0 },
    stumpings: { type: Number, default: 0 },
    bestBowling: { type: String, default: 'N/A' },
    fiveWicketHauls: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  season: {
    type: String,
    default: '2025'
  },
  bio: {
    type: String,
    default: ''
  },
  careerHighlights: [{
    title: String,
    description: String,
    year: Number,
    image: String
  }],
  ipl2025Contribution: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
    impactRating: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);
