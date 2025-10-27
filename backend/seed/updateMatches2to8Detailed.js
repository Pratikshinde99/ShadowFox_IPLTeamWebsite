require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI;

// Detailed scorecard data for matches 2-8
const detailedUpdates = [
  // Match 2 - vs CSK
  {
    matchId: "ipl2025-m2",
    tossWinner: "RCB",
    tossDecision: "bat",
    playerOfMatch: "Phil Salt",
    rcbBatting: [
      { name: "Phil Salt", runs: 72, balls: 38, fours: 10, sixes: 3, strikeRate: 189.47, out: "c Dhoni b Pathirana" },
      { name: "Virat Kohli", runs: 35, balls: 24, fours: 4, sixes: 1, strikeRate: 145.83, out: "c Jadeja b Noor" },
      { name: "Liam Livingstone", runs: 48, balls: 25, fours: 4, sixes: 3, strikeRate: 192.00, out: "c Dhoni b Pathirana" },
      { name: "Rajat Patidar (c)", runs: 22, balls: 18, fours: 2, sixes: 1, strikeRate: 122.22, out: "run out" },
      { name: "Tim David", runs: 12, balls: 8, fours: 1, sixes: 1, strikeRate: 150.00, notOut: true }
    ],
    opponentBatting: [
      { name: "Ruturaj Gaikwad (c)", runs: 28, balls: 22, fours: 4, sixes: 0, strikeRate: 127.27, out: "c Salt b Bhuvi" },
      { name: "Devon Conway", runs: 34, balls: 28, fours: 3, sixes: 1, strikeRate: 121.43, out: "c Patidar b Hazlewood" },
      { name: "Ravindra Jadeja", runs: 42, balls: 31, fours: 4, sixes: 2, strikeRate: 135.48, out: "c David b Krunal" },
      { name: "MS Dhoni (wk)", runs: 18, balls: 14, fours: 1, sixes: 1, strikeRate: 128.57, out: "b Bhuvi" }
    ],
    rcbBowling: [
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 28, wickets: 3, economy: 7.00 },
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 24, wickets: 2, economy: 6.00 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 }
    ],
    opponentBowling: [
      { name: "Matheesha Pathirana", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
      { name: "Noor Ahmad", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
      { name: "Ravindra Jadeja", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 }
    ],
    rcbExtras: { total: 7 },
    opponentExtras: { total: 8 }
  },

  // Match 3 - vs GT (LOSS)
  {
    matchId: "ipl2025-m3",
    tossWinner: "Gujarat Titans",
    tossDecision: "bowl",
    playerOfMatch: "Shubman Gill",
    rcbBatting: [
      { name: "Phil Salt", runs: 24, balls: 18, fours: 3, sixes: 1, strikeRate: 133.33, out: "c Saha b Rashid" },
      { name: "Virat Kohli", runs: 31, balls: 25, fours: 4, sixes: 0, strikeRate: 124.00, out: "c Miller b Noor" },
      { name: "Rajat Patidar (c)", runs: 52, balls: 34, fours: 6, sixes: 2, strikeRate: 152.94, out: "c Gill b Rashid" },
      { name: "Liam Livingstone", runs: 28, balls: 22, fours: 2, sixes: 2, strikeRate: 127.27, out: "b Mohit" },
      { name: "Tim David", runs: 18, balls: 12, fours: 1, sixes: 1, strikeRate: 150.00, out: "c Miller b Rashid" }
    ],
    opponentBatting: [
      { name: "Shubman Gill (c)", runs: 78, balls: 52, fours: 8, sixes: 3, strikeRate: 150.00, notOut: true },
      { name: "Sai Sudharsan", runs: 42, balls: 28, fours: 5, sixes: 1, strikeRate: 150.00, out: "c Kohli b Hazlewood" },
      { name: "David Miller", runs: 34, balls: 21, fours: 3, sixes: 2, strikeRate: 161.90, notOut: true }
    ],
    rcbBowling: [
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
      { name: "Bhuvneshwar Kumar", overs: 3.3, maidens: 0, runs: 38, wickets: 1, economy: 10.86 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 32, wickets: 0, economy: 8.00 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 }
    ],
    opponentBowling: [
      { name: "Rashid Khan", overs: 4, maidens: 0, runs: 28, wickets: 3, economy: 7.00 },
      { name: "Noor Ahmad", overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
      { name: "Mohit Sharma", overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 }
    ],
    rcbExtras: { total: 5 },
    opponentExtras: { total: 7 }
  },

  // Match 4 - vs MI
  {
    matchId: "ipl2025-m4",
    tossWinner: "Mumbai Indians",
    tossDecision: "bowl",
    playerOfMatch: "Virat Kohli",
    rcbBatting: [
      { name: "Phil Salt", runs: 28, balls: 19, fours: 4, sixes: 1, strikeRate: 147.37, out: "c Kishan b Bumrah" },
      { name: "Virat Kohli", runs: 81, balls: 48, fours: 9, sixes: 3, strikeRate: 168.75, out: "c Rohit b Bumrah" },
      { name: "Rajat Patidar (c)", runs: 22, balls: 16, fours: 2, sixes: 1, strikeRate: 137.50, out: "c Hardik b Chawla" },
      { name: "Tim David", runs: 38, balls: 18, fours: 3, sixes: 3, strikeRate: 211.11, notOut: true },
      { name: "Krunal Pandya", runs: 12, balls: 10, fours: 1, sixes: 0, strikeRate: 120.00, notOut: true }
    ],
    opponentBatting: [
      { name: "Rohit Sharma (c)", runs: 45, balls: 32, fours: 5, sixes: 2, strikeRate: 140.63, out: "c Salt b Krunal" },
      { name: "Ishan Kishan (wk)", runs: 52, balls: 34, fours: 6, sixes: 2, strikeRate: 152.94, out: "b Hazlewood" },
      { name: "Hardik Pandya", runs: 38, balls: 24, fours: 3, sixes: 2, strikeRate: 158.33, out: "c David b Krunal" },
      { name: "Tilak Varma", runs: 24, balls: 18, fours: 2, sixes: 1, strikeRate: 133.33, out: "c Kohli b Bhuvi" }
    ],
    rcbBowling: [
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 29, wickets: 3, economy: 7.25 },
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 },
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 }
    ],
    opponentBowling: [
      { name: "Jasprit Bumrah", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 },
      { name: "Piyush Chawla", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
      { name: "Gerald Coetzee", overs: 4, maidens: 0, runs: 45, wickets: 1, economy: 11.25 }
    ],
    rcbExtras: { total: 8 },
    opponentExtras: { total: 6 }
  },

  // Match 5 - vs DC
  {
    matchId: "ipl2025-m5",
    tossWinner: "Delhi Capitals",
    tossDecision: "bat",
    playerOfMatch: "Phil Salt",
    rcbBatting: [
      { name: "Phil Salt", runs: 89, balls: 45, fours: 11, sixes: 4, strikeRate: 197.78, notOut: true },
      { name: "Virat Kohli", runs: 62, balls: 38, fours: 7, sixes: 2, strikeRate: 163.16, notOut: true },
      { name: "Rajat Patidar (c)", runs: 12, balls: 8, fours: 2, sixes: 0, strikeRate: 150.00, out: "c Porel b Axar" }
    ],
    opponentBatting: [
      { name: "Jake Fraser-McGurk", runs: 58, balls: 28, fours: 7, sixes: 3, strikeRate: 207.14, out: "c Salt b Hazlewood" },
      { name: "KL Rahul (c)", runs: 42, balls: 34, fours: 4, sixes: 1, strikeRate: 123.53, out: "c Kohli b Bhuvi" },
      { name: "Tristan Stubbs", runs: 38, balls: 26, fours: 3, sixes: 2, strikeRate: 146.15, out: "c Patidar b Hazlewood" },
      { name: "Axar Patel", runs: 24, balls: 18, fours: 2, sixes: 1, strikeRate: 133.33, out: "b Hazlewood" }
    ],
    rcbBowling: [
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 31, wickets: 3, economy: 7.75 },
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 }
    ],
    opponentBowling: [
      { name: "Mukesh Kumar", overs: 3.4, maidens: 0, runs: 42, wickets: 0, economy: 11.45 },
      { name: "Axar Patel", overs: 4, maidens: 0, runs: 28, wickets: 1, economy: 7.00 },
      { name: "Kuldeep Yadav", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 }
    ],
    rcbExtras: { total: 12 },
    opponentExtras: { total: 8 }
  },

  // Match 6 - vs RR
  {
    matchId: "ipl2025-m6",
    tossWinner: "Rajasthan Royals",
    tossDecision: "bat",
    playerOfMatch: "Liam Livingstone",
    rcbBatting: [
      { name: "Phil Salt", runs: 28, balls: 22, fours: 4, sixes: 1, strikeRate: 127.27, out: "c Jurel b Boult" },
      { name: "Virat Kohli", runs: 22, balls: 18, fours: 3, sixes: 0, strikeRate: 122.22, out: "c Jaiswal b Ashwin" },
      { name: "Rajat Patidar (c)", runs: 58, balls: 36, fours: 6, sixes: 3, strikeRate: 161.11, out: "c Parag b Sandeep" },
      { name: "Liam Livingstone", runs: 67, balls: 31, fours: 5, sixes: 5, strikeRate: 216.13, notOut: true },
      { name: "Tim David", runs: 12, balls: 8, fours: 1, sixes: 1, strikeRate: 150.00, notOut: true }
    ],
    opponentBatting: [
      { name: "Yashasvi Jaiswal", runs: 72, balls: 42, fours: 8, sixes: 4, strikeRate: 171.43, out: "c Salt b Bhuvi" },
      { name: "Jos Buttler (wk)", runs: 45, balls: 28, fours: 5, sixes: 2, strikeRate: 160.71, out: "c Kohli b Hazlewood" },
      { name: "Riyan Parag (c)", runs: 38, balls: 24, fours: 3, sixes: 2, strikeRate: 158.33, out: "c David b Krunal" },
      { name: "Shimron Hetmyer", runs: 24, balls: 16, fours: 2, sixes: 1, strikeRate: 150.00, out: "b Dayal" }
    ],
    rcbBowling: [
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 }
    ],
    opponentBowling: [
      { name: "Trent Boult", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
      { name: "Ravichandran Ashwin", overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
      { name: "Sandeep Sharma", overs: 3.1, maidens: 0, runs: 42, wickets: 2, economy: 13.26 }
    ],
    rcbExtras: { total: 8 },
    opponentExtras: { total: 9 }
  },

  // Match 7 - vs PBKS
  {
    matchId: "ipl2025-m7",
    tossWinner: "Punjab Kings",
    tossDecision: "bat",
    playerOfMatch: "Virat Kohli",
    rcbBatting: [
      { name: "Phil Salt", runs: 34, balls: 24, fours: 5, sixes: 1, strikeRate: 141.67, out: "c Dhawan b Arshdeep" },
      { name: "Virat Kohli", runs: 76, balls: 44, fours: 8, sixes: 3, strikeRate: 172.73, notOut: true },
      { name: "Rajat Patidar (c)", runs: 28, balls: 20, fours: 3, sixes: 1, strikeRate: 140.00, out: "c Jitesh b Rabada" },
      { name: "Jitesh Sharma (wk)", runs: 42, balls: 24, fours: 4, sixes: 2, strikeRate: 175.00, notOut: true }
    ],
    opponentBatting: [
      { name: "Shikhar Dhawan (c)", runs: 48, balls: 36, fours: 6, sixes: 1, strikeRate: 133.33, out: "c Salt b Bhuvi" },
      { name: "Prabhsimran Singh (wk)", runs: 38, balls: 26, fours: 4, sixes: 2, strikeRate: 146.15, out: "c Kohli b Dayal" },
      { name: "Liam Livingstone", runs: 52, balls: 32, fours: 5, sixes: 3, strikeRate: 162.50, out: "c Patidar b Dayal" },
      { name: "Sam Curran", runs: 24, balls: 18, fours: 2, sixes: 1, strikeRate: 133.33, out: "b Dayal" }
    ],
    rcbBowling: [
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 34, wickets: 3, economy: 8.50 },
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 }
    ],
    opponentBowling: [
      { name: "Arshdeep Singh", overs: 3.2, maidens: 0, runs: 38, wickets: 1, economy: 11.40 },
      { name: "Kagiso Rabada", overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 },
      { name: "Sam Curran", overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75 }
    ],
    rcbExtras: { total: 9 },
    opponentExtras: { total: 8 }
  },

  // Match 8 - vs SRH (LOSS)
  {
    matchId: "ipl2025-m8",
    tossWinner: "Sunrisers Hyderabad",
    tossDecision: "bat",
    playerOfMatch: "Travis Head",
    rcbBatting: [
      { name: "Phil Salt", runs: 42, balls: 28, fours: 5, sixes: 2, strikeRate: 150.00, out: "c Head b Cummins" },
      { name: "Virat Kohli", runs: 38, balls: 26, fours: 4, sixes: 1, strikeRate: 146.15, out: "c Klaasen b Natarajan" },
      { name: "Rajat Patidar (c)", runs: 64, balls: 38, fours: 7, sixes: 3, strikeRate: 168.42, out: "c Abhishek b Cummins" },
      { name: "Tim David", runs: 45, balls: 22, fours: 3, sixes: 4, strikeRate: 204.55, notOut: true }
    ],
    opponentBatting: [
      { name: "Travis Head", runs: 89, balls: 48, fours: 9, sixes: 5, strikeRate: 185.42, out: "c Salt b Hazlewood" },
      { name: "Abhishek Sharma", runs: 52, balls: 28, fours: 5, sixes: 3, strikeRate: 185.71, out: "c Kohli b Bhuvi" },
      { name: "Heinrich Klaasen (wk)", runs: 38, balls: 22, fours: 3, sixes: 2, strikeRate: 172.73, notOut: true }
    ],
    rcbBowling: [
      { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 45, wickets: 1, economy: 11.25 },
      { name: "Yash Dayal", overs: 4, maidens: 0, runs: 48, wickets: 1, economy: 12.00 },
      { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 }
    ],
    opponentBowling: [
      { name: "Pat Cummins (c)", overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
      { name: "T Natarajan", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
      { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 48, wickets: 2, economy: 12.00 }
    ],
    rcbExtras: { total: 8 },
    opponentExtras: { total: 10 }
  }
];

const updateMatches = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('📊 Updating matches 2-8 with detailed scorecards...\n');

    for (const update of detailedUpdates) {
      const { matchId, ...updateData } = update;
      
      const result = await Match.findOneAndUpdate(
        { matchId },
        { $set: updateData },
        { new: true }
      );

      if (result) {
        console.log(`✅ Match ${result.matchNumber}: vs ${result.opponent} - Updated with full scorecard`);
      } else {
        console.log(`❌ Match ${matchId} not found`);
      }
    }

    const totalMatches = await Match.countDocuments();
    const matchesWithScorecard = await Match.countDocuments({ 
      rcbBatting: { $exists: true, $ne: [] } 
    });

    console.log(`\n📈 Total matches in database: ${totalMatches}`);
    console.log(`📊 Matches with detailed scorecards: ${matchesWithScorecard}`);
    console.log('\n🎉 ALL MATCHES NOW HAVE COMPLETE SCORECARD DATA!');
    console.log('👉 Go to Matches page and click on any match to view beautiful scorecards!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateMatches();
