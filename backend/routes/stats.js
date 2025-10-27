const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Player = require('../models/Player');

// Get team statistics
router.get('/team', async (req, res) => {
  try {
    // Get all matches (IPL 2025)
    const matches = await Match.find({});
    const totalMatches = matches.length;
    const completedMatches = matches.filter(m => m.status === 'completed');
    const abandonedMatches = matches.filter(m => m.status === 'abandoned');
    
    // Count wins (check if result contains "RCB won" or "Royal Challengers Bengaluru won")
    const wins = completedMatches.filter(m => 
      m.result && (
        m.result.toLowerCase().includes('rcb won') || 
        m.result.toLowerCase().includes('royal challengers bengaluru won') ||
        m.result.toLowerCase().includes('royal challengers') && m.result.toLowerCase().includes('won')
      )
    ).length;
    
    const losses = completedMatches.filter(m => 
      m.result && 
      !m.result.toLowerCase().includes('rcb won') && 
      !m.result.toLowerCase().includes('royal challengers bengaluru won') && 
      !m.result.toLowerCase().includes('abandoned') &&
      !m.result.toLowerCase().includes('no result')
    ).length;
    
    const winPercentage = completedMatches.length > 0 
      ? ((wins / completedMatches.length) * 100) 
      : 0;
    
    // Calculate Net Run Rate
    let totalRunsScored = 0;
    let totalRunsConceded = 0;
    let totalOversPlayed = 0;
    let totalOversFaced = 0;
    
    completedMatches.forEach(match => {
      if (match.ourScore && match.theirScore) {
        totalRunsScored += match.ourScore.runs || 0;
        totalRunsConceded += match.theirScore.runs || 0;
        
        // Convert overs string to number (e.g., "20.0" to 20, "18.4" to 18.67)
        const parseOvers = (oversStr) => {
          if (!oversStr) return 20;
          const parts = String(oversStr).split('.');
          const overs = parseInt(parts[0]) || 0;
          const balls = parseInt(parts[1]) || 0;
          return overs + (balls / 6);
        };
        
        const rcbOvers = parseOvers(match.ourScore.overs);
        const oppOvers = parseOvers(match.theirScore.overs);
        
        totalOversPlayed += rcbOvers;
        totalOversFaced += oppOvers;
      }
    });
    
    const nrr = totalOversPlayed > 0 && totalOversFaced > 0
      ? ((totalRunsScored / totalOversPlayed) - (totalRunsConceded / totalOversFaced))
      : 0;
    
    // Points: 2 per win, 1 per abandoned match
    const points = (wins * 2) + abandonedMatches.length;
    
    const stats = {
      season: '2025',
      totalMatches,
      played: completedMatches.length,
      wins,
      losses,
      abandoned: abandonedMatches.length,
      winPercentage: parseFloat(winPercentage.toFixed(1)),
      points,
      nrr: parseFloat(nrr.toFixed(3)),
      upcomingMatches: matches.filter(m => m.status === 'upcoming').length
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get top batsmen
router.get('/batsmen', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const batsmen = await Player.find({ 
      isActive: true,
      'stats.runs': { $exists: true, $gt: 0 }
    })
    .sort({ 'stats.runs': -1, 'stats.average': -1 })
    .limit(parseInt(limit));
    
    res.json({ success: true, data: batsmen });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get top bowlers
router.get('/bowlers', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const bowlers = await Player.find({ 
      isActive: true,
      'stats.wickets': { $exists: true, $gt: 0 }
    })
    .sort({ 'stats.wickets': -1, 'stats.economy': 1 })
    .limit(parseInt(limit));
    
    res.json({ success: true, data: bowlers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get IPL teams comparison data
router.get('/comparison', async (req, res) => {
  try {
    // IPL 2025 Final Standings (RCB Champions!)
    const teamsData = [
      { team: 'RCB', matches: 14, wins: 10, losses: 3, abandoned: 1, points: 21, nrr: 0.685, position: 1 },
      { team: 'PBKS', matches: 14, wins: 9, losses: 5, abandoned: 0, points: 18, nrr: 0.512, position: 2 },
      { team: 'CSK', matches: 14, wins: 8, losses: 6, abandoned: 0, points: 16, nrr: 0.398, position: 3 },
      { team: 'MI', matches: 14, wins: 8, losses: 6, abandoned: 0, points: 16, nrr: 0.245, position: 4 },
      { team: 'DC', matches: 14, wins: 7, losses: 7, abandoned: 0, points: 14, nrr: 0.156, position: 5 },
      { team: 'KKR', matches: 14, wins: 6, losses: 7, abandoned: 1, points: 13, nrr: -0.089, position: 6 },
      { team: 'RR', matches: 14, wins: 6, losses: 8, abandoned: 0, points: 12, nrr: -0.234, position: 7 },
      { team: 'SRH', matches: 14, wins: 5, losses: 9, abandoned: 0, points: 10, nrr: -0.412, position: 8 },
      { team: 'GT', matches: 14, wins: 4, losses: 10, abandoned: 0, points: 8, nrr: -0.567, position: 9 },
      { team: 'LSG', matches: 14, wins: 3, losses: 11, abandoned: 0, points: 6, nrr: -0.789, position: 10 }
    ];
    
    res.json({ success: true, data: teamsData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
