const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    unique: true,
    required: true
  },
  matchNumber: {
    type: Number,
    required: true
  },
  opponent: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    default: '19:30 IST'
  },
  homeAway: {
    type: String,
    enum: ['home', 'away', 'neutral'],
    default: 'home'
  },
  matchType: {
    type: String,
    enum: ['league', 'qualifier', 'eliminator', 'final'],
    default: 'league'
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'abandoned'],
    default: 'upcoming'
  },
  result: {
    type: String,
    default: ''
  },
  ourScore: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: String, default: '0.0' }
  },
  theirScore: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: String, default: '0.0' }
  },
  // Legacy scores field for backward compatibility
  scores: {
    rcb: {
      runs: Number,
      wickets: Number,
      overs: Number
    },
    opponent: {
      runs: Number,
      wickets: Number,
      overs: Number
    }
  },
  highlights: {
    type: String,
    default: ''
  },
  topPerformers: [{
    name: String,
    performance: String
  }],
  sourceUrl: {
    type: String,
    default: ''
  },
  season: {
    type: String,
    default: '2025'
  },
  isPlayoff: {
    type: Boolean,
    default: false
  },
  isFinal: {
    type: Boolean,
    default: false
  },
  isChampionship: {
    type: Boolean,
    default: false
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  specialNote: {
    type: String,
    default: ''
  },
  // Detailed scorecard data
  tossWinner: String,
  tossDecision: String,
  rcbBatting: [{
    name: String,
    runs: Number,
    balls: Number,
    fours: Number,
    sixes: Number,
    strikeRate: Number,
    out: String,
    notOut: Boolean
  }],
  opponentBatting: [{
    name: String,
    runs: Number,
    balls: Number,
    fours: Number,
    sixes: Number,
    strikeRate: Number,
    out: String,
    notOut: Boolean
  }],
  rcbBowling: [{
    name: String,
    overs: Number,
    maidens: Number,
    runs: Number,
    wickets: Number,
    economy: Number
  }],
  opponentBowling: [{
    name: String,
    overs: Number,
    maidens: Number,
    runs: Number,
    wickets: Number,
    economy: Number
  }],
  rcbExtras: {
    wides: Number,
    noBalls: Number,
    legByes: Number,
    byes: Number,
    total: Number
  },
  opponentExtras: {
    wides: Number,
    noBalls: Number,
    legByes: Number,
    byes: Number,
    total: Number
  },
  playerOfMatch: String,
  umpires: [String],
  thirdUmpire: String,
  matchReferee: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);
