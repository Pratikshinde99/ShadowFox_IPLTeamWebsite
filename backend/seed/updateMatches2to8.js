require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcb_universe';

// Sample detailed data for matches 2-8
const matches = [
  // Match 2: CSK vs RCB
  {
    matchNumber: 2,
    matchId: "ipl2025-m8",
    rcbBatting: [
      { name: "Phil Salt", runs: 45, balls: 28, fours: 6, sixes: 2, strikeRate: 160.71, out: "c Dhoni b Pathirana" },
      { name: "Virat Kohli", runs: 67, balls: 42, fours: 7, sixes: 3, strikeRate: 159.52, out: "c Jadeja b Chahar" },
      { name: "Rajat Patidar (c)", runs: 38, balls: 24, fours: 4, sixes: 2, strikeRate: 158.33, notOut: true },
      { name: "Liam Livingstone", runs: 28, balls: 18, fours: 2, sixes: 2, strikeRate: 155.56, notOut: true }
    ],
    opponentBatting: [
      { name: "Ruturaj Gaikwad", runs: 34, balls: 26, fours: 4, sixes: 1, strikeRate: 130.77, out: "c Salt b Hazlewood" },
      { name: "Devon Conway", runs: 28, balls: 22, fours: 3, sixes: 1, strikeRate: 127.27, out: "b Dayal" },
      { name: "MS Dhoni (c)", runs: 42, balls: 31, fours: 3, sixes: 2, strikeRate: 135.48, out: "c Patidar b Krunal" }
    ],
    rcbBowling: [
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 28, wickets: 3, economy: 7.00 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 26, wickets: 2, economy: 6.50 }
    ],
    opponentBowling: [
      { name: "Deepak Chahar", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
      { name: "Matheesha Pathirana", overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 }
    ],
    tossWinner: "Royal Challengers Bengaluru",
    tossDecision: "bat"
  },
  // Match 3-8 similar structure
  {
    matchNumber: 3,
    matchId: "ipl2025-m14",
    rcbBatting: [
      { name: "Phil Salt", runs: 38, balls: 25, fours: 5, sixes: 1, strikeRate: 152.00, out: "c Gill b Rashid" },
      { name: "Virat Kohli", runs: 52, balls: 38, fours: 6, sixes: 2, strikeRate: 136.84, out: "c Miller b Noor" },
      { name: "Rajat Patidar (c)", runs: 41, balls: 29, fours: 4, sixes: 2, strikeRate: 141.38, out: "b Rashid" }
    ],
    opponentBatting: [
      { name: "Shubman Gill (c)", runs: 72, balls: 44, fours: 8, sixes: 3, strikeRate: 163.64, notOut: true },
      { name: "David Miller", runs: 48, balls: 26, fours: 4, sixes: 3, strikeRate: 184.62, notOut: true }
    ],
    rcbBowling: [
      { name: "Mohammed Siraj", overs: 4, maidens: 0, runs: 34, wickets: 2, economy: 8.50 },
      { name: "Josh Hazlewood", overs: 3.5, maidens: 0, runs: 38, wickets: 0, economy: 9.91 }
    ],
    opponentBowling: [
      { name: "Rashid Khan", overs: 4, maidens: 0, runs: 28, wickets: 3, economy: 7.00 },
      { name: "Noor Ahmad", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 }
    ],
    tossWinner: "Gujarat Titans",
    tossDecision: "bowl"
  }
];

// Add more matches 4-8 with similar structure
const additionalMatches = [
  { matchNumber: 4, matchId: "ipl2025-m20" },
  { matchNumber: 5, matchId: "ipl2025-m24" },
  { matchNumber: 6, matchId: "ipl2025-m28" },
  { matchNumber: 7, matchId: "ipl2025-m34" },
  { matchNumber: 8, matchId: "ipl2025-m37" }
];

additionalMatches.forEach(m => {
  matches.push({
    matchNumber: m.matchNumber,
    matchId: m.matchId,
    rcbBatting: [
      { name: "Phil Salt", runs: 45, balls: 30, fours: 5, sixes: 2, strikeRate: 150.00, out: "c keeper b bowler" },
      { name: "Virat Kohli", runs: 55, balls: 38, fours: 6, sixes: 2, strikeRate: 144.74, out: "c fielder b bowler" }
    ],
    opponentBatting: [
      { name: "Opener 1", runs: 40, balls: 28, fours: 4, sixes: 2, strikeRate: 142.86, out: "c Salt b Hazlewood" }
    ],
    rcbBowling: [
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 30, wickets: 2, economy: 7.50 }
    ],
    opponentBowling: [
      { name: "Bowler 1", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 }
    ],
    tossWinner: "Royal Challengers Bengaluru",
    tossDecision: "bat"
  });
});

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    for (const match of matches) {
      await Match.findOneAndUpdate(
        { matchNumber: match.matchNumber },
        { $set: match },
        { new: true }
      );
      console.log(`✅ Match ${match.matchNumber} updated with scorecard data`);
    }
    
    console.log('\n🎉 Matches 2-8 updated!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
