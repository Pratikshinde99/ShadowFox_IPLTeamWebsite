require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcb_universe';

// Matches 9-16 - Basic data (scorecard details to be added later)
const matches9to16 = [
  {
    matchNumber: 9,
    matchId: "ipl2025-m40",
    opponent: "Rajasthan Royals",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-04-24T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Match completed - Details to be updated"
  },
  {
    matchNumber: 10,
    matchId: "ipl2025-m43",
    opponent: "Delhi Capitals",
    venue: "Arun Jaitley Stadium, Delhi",
    date: new Date("2025-04-27T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Match completed - Details to be updated"
  },
  {
    matchNumber: 11,
    matchId: "ipl2025-m49",
    opponent: "Chennai Super Kings",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-05-03T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Match completed - Details to be updated"
  },
  {
    matchNumber: 12,
    matchId: "ipl2025-m55",
    opponent: "Lucknow Super Giants",
    venue: "Ekana Cricket Stadium, Lucknow",
    date: new Date("2025-05-09T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Match completed - Details to be updated"
  },
  {
    matchNumber: 13,
    matchId: "ipl2025-m59",
    opponent: "Sunrisers Hyderabad",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-05-13T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Match completed - Details to be updated"
  },
  {
    matchNumber: 14,
    matchId: "ipl2025-m63",
    opponent: "Kolkata Knight Riders",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-05-17T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Match completed - Details to be updated"
  },
  {
    matchNumber: 15,
    matchId: "ipl2025-playoff1",
    opponent: "Punjab Kings",
    venue: "Mullanpur / New PCA Stadium, Mullanpur",
    date: new Date("2025-05-29T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "qualifier",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Playoff - Details to be updated",
    isPlayoff: true
  },
  {
    matchNumber: 16,
    matchId: "ipl2025-final",
    opponent: "Punjab Kings",
    venue: "Narendra Modi Stadium, Ahmedabad",
    date: new Date("2025-06-03T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "final",
    scores: {
      rcb: { runs: 0, wickets: 0, overs: "0.0" },
      opponent: { runs: 0, wickets: 0, overs: "0.0" }
    },
    result: "Final - Details to be updated",
    isFinal: true,
    isPlayoff: true
  }
];

// Connect and add matches 9-16
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    console.log('📊 Adding matches 9-16...\n');
    
    let added = 0;
    for (const matchData of matches9to16) {
      const result = await Match.findOneAndUpdate(
        { matchNumber: matchData.matchNumber },
        matchData,
        { upsert: true, new: true }
      );
      added++;
      console.log(`✅ Match ${matchData.matchNumber}: vs ${matchData.opponent} - Added`);
    }
    
    const totalMatches = await Match.countDocuments();
    console.log(`\n📈 Total matches in database: ${totalMatches}`);
    console.log(`✅ Added ${added} matches (9-16)`);
    console.log('\n🎉 All 16 matches are now in the database!');
    console.log('👉 Matches 1-8 have detailed scorecards');
    console.log('👉 Matches 9-16 have "View Scorecard" button (add data later)');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
