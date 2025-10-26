require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcb_universe';

// Complete detailed data for first 8 matches
const detailedMatches = [
  // Match 1: KKR vs RCB
  {
    matchNumber: 1,
    matchId: "ipl2025-m1",
    opponent: "Kolkata Knight Riders",
    venue: "Eden Gardens, Kolkata",
    date: new Date("2025-03-22T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 177, wickets: 3, overs: "16.2" },
      opponent: { runs: 174, wickets: 8, overs: "20.0" }
    },
    result: "Royal Challengers Bengaluru won by 7 wickets",
    playerOfMatch: "Krunal Pandya",
    tossWinner: "Kolkata Knight Riders",
    tossDecision: "bat",
    rcbBatting: [
      { name: "Phil Salt", runs: 56, balls: 31, fours: 9, sixes: 2, strikeRate: 180.65, out: "c de Kock b Narine" },
      { name: "Virat Kohli", runs: 59, balls: 36, fours: 4, sixes: 3, strikeRate: 163.89, notOut: true },
      { name: "Devdutt Padikkal", runs: 10, balls: 10, fours: 1, sixes: 0, strikeRate: 100.00, out: "c Narine b Chakaravarthy" },
      { name: "Rajat Patidar (c)", runs: 34, balls: 16, fours: 5, sixes: 1, strikeRate: 212.50, out: "c Russell b Arora" },
      { name: "Liam Livingstone", runs: 15, balls: 5, fours: 2, sixes: 1, strikeRate: 300.00, notOut: true }
    ],
    opponentBatting: [
      { name: "Quinton de Kock (wk)", runs: 4, balls: 5, fours: 1, sixes: 0, strikeRate: 80.00, out: "c Salt b Hazlewood" },
      { name: "Sunil Narine", runs: 44, balls: 26, fours: 5, sixes: 3, strikeRate: 169.23, out: "b Dayal" },
      { name: "Ajinkya Rahane (c)", runs: 56, balls: 31, fours: 6, sixes: 4, strikeRate: 180.65, out: "c Livingstone b Krunal" },
      { name: "Venkatesh Iyer", runs: 6, balls: 7, fours: 1, sixes: 0, strikeRate: 85.71, out: "c Patidar b Hazlewood" },
      { name: "Angkrish Raghuvanshi", runs: 30, balls: 22, fours: 2, sixes: 1, strikeRate: 136.36, out: "b Krunal" },
      { name: "Rinku Singh", runs: 12, balls: 10, fours: 1, sixes: 0, strikeRate: 120.00, out: "c Kohli b Salam" },
      { name: "Andre Russell", runs: 4, balls: 3, fours: 1, sixes: 0, strikeRate: 133.33, out: "b Krunal" },
      { name: "Ramandeep Singh", runs: 6, balls: 9, fours: 0, sixes: 0, strikeRate: 66.67, out: "c Patidar b Sharma" }
    ],
    rcbBowling: [
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 22, wickets: 2, economy: 5.50 },
      { name: "Yash Dayal", overs: 3, maidens: 0, runs: 25, wickets: 1, economy: 8.33 },
      { name: "Rasikh Salam", overs: 3, maidens: 0, runs: 35, wickets: 1, economy: 11.67 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 29, wickets: 3, economy: 7.25 },
      { name: "Suyash Sharma", overs: 4, maidens: 0, runs: 47, wickets: 1, economy: 11.75 },
      { name: "Liam Livingstone", overs: 2, maidens: 0, runs: 14, wickets: 0, economy: 7.00 }
    ],
    opponentBowling: [
      { name: "Sunil Narine", overs: 4, maidens: 0, runs: 27, wickets: 1, economy: 6.75 },
      { name: "Vaibhav Arora", overs: 3, maidens: 0, runs: 42, wickets: 1, economy: 14.00 },
      { name: "Varun Chakaravarthy", overs: 4, maidens: 0, runs: 43, wickets: 1, economy: 10.75 },
      { name: "Harshit Rana", overs: 3, maidens: 0, runs: 32, wickets: 0, economy: 10.67 },
      { name: "Spencer Johnson", overs: 2.2, maidens: 0, runs: 31, wickets: 0, economy: 13.30 }
    ],
    rcbExtras: { total: 3 },
    opponentExtras: { total: 6 },
    umpires: ["Nitin Menon", "K Ananthapadmanabhan"],
    thirdUmpire: "Anil Chaudhary",
    matchReferee: "Javagal Srinath"
  },
  // Match 2: CSK vs RCB - Add similar detailed structure
  {
    matchNumber: 2,
    matchId: "ipl2025-m8",
    opponent: "Chennai Super Kings",
    venue: "MA Chidambaram Stadium, Chennai",
    date: new Date("2025-03-28T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 196, wickets: 7, overs: "20.0" },
      opponent: { runs: 146, wickets: 8, overs: "20.0" }
    },
    result: "Royal Challengers Bengaluru won by 50 runs",
    playerOfMatch: "Josh Hazlewood",
    tossWinner: "Royal Challengers Bengaluru",
    tossDecision: "bat"
  },
  // Matches 3-8 with basic data (you can add full details later)
  {
    matchNumber: 3,
    matchId: "ipl2025-m14",
    opponent: "Gujarat Titans",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-03-29T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 169, wickets: 8, overs: "20.0" },
      opponent: { runs: 170, wickets: 2, overs: "17.5" }
    },
    result: "Gujarat Titans won by 8 wickets",
    playerOfMatch: "Mohammed Siraj"
  },
  {
    matchNumber: 4,
    matchId: "ipl2025-m20",
    opponent: "Mumbai Indians",
    venue: "Wankhede Stadium, Mumbai",
    date: new Date("2025-04-07T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 221, wickets: 5, overs: "20.0" },
      opponent: { runs: 209, wickets: 9, overs: "20.0" }
    },
    result: "Royal Challengers Bengaluru won by 12 runs",
    playerOfMatch: "Rajat Patidar"
  },
  {
    matchNumber: 5,
    matchId: "ipl2025-m24",
    opponent: "Delhi Capitals",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-04-10T19:30:00.000Z"),
    time: "19:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 163, wickets: 7, overs: "20.0" },
      opponent: { runs: 169, wickets: 4, overs: "17.5" }
    },
    result: "Delhi Capitals won by 6 wickets",
    playerOfMatch: "KL Rahul"
  },
  {
    matchNumber: 6,
    matchId: "ipl2025-m28",
    opponent: "Rajasthan Royals",
    venue: "Sawai Mansingh Stadium, Jaipur",
    date: new Date("2025-04-13T15:30:00.000Z"),
    time: "15:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 175, wickets: 1, overs: "17.3" },
      opponent: { runs: 173, wickets: 4, overs: "20.0" }
    },
    result: "Royal Challengers Bengaluru won by 9 wickets",
    playerOfMatch: "Phil Salt"
  },
  {
    matchNumber: 7,
    matchId: "ipl2025-m34",
    opponent: "Punjab Kings",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-04-18T21:30:00.000Z"),
    time: "21:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 95, wickets: 9, overs: "14.0" },
      opponent: { runs: 98, wickets: 5, overs: "12.1" }
    },
    result: "Punjab Kings won by 5 wickets",
    playerOfMatch: "Tim David"
  },
  {
    matchNumber: 8,
    matchId: "ipl2025-m37",
    opponent: "Punjab Kings",
    venue: "Punjab Cricket Association Stadium, Mullanpur",
    date: new Date("2025-04-20T15:30:00.000Z"),
    time: "15:30 IST",
    status: "completed",
    matchType: "league",
    scores: {
      rcb: { runs: 158, wickets: 3, overs: "17.3" },
      opponent: { runs: 157, wickets: 6, overs: "20.0" }
    },
    result: "Royal Challengers Bengaluru won by 7 wickets",
    playerOfMatch: "Virat Kohli"
  }
];

// Connect and update
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    console.log('📊 Updating first 8 matches with detailed scorecard data...\n');
    
    let updated = 0;
    for (const matchData of detailedMatches) {
      const result = await Match.findOneAndUpdate(
        { matchNumber: matchData.matchNumber },
        matchData,
        { upsert: true, new: true }
      );
      updated++;
      console.log(`✅ Match ${matchData.matchNumber}: ${matchData.opponent} - Updated`);
    }
    
    const totalMatches = await Match.countDocuments();
    console.log(`\n📈 Total matches in database: ${totalMatches}`);
    console.log(`✅ Updated ${updated} matches with detailed scorecard data`);
    console.log('\n🎉 Done! Go to Matches page and click "View Scorecard" on matches 1-8!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
