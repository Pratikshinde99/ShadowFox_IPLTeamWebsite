const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Poll = require('../models/Poll');
const IconicMoment = require('../models/IconicMoment');

dotenv.config();

// Load RCB 2025 Squad data
const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rcb2025Squad.json'), 'utf8'));

// Load RCB 2025 Matches data (REAL IPL 2025 DATA)
const matchesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rcbIPL2025Matches.json'), 'utf8'));

// Load Iconic Moments data
const iconicMomentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'iconicMomentsRCB.json'), 'utf8'));

// Legacy sample matches (keeping for reference)
const sampleMatches = [
  {
    matchNumber: 1,
    opponent: "Chennai Super Kings",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-03-22'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "6 wickets",
      summary: "RCB won by 6 wickets with 8 balls remaining"
    },
    scores: {
      rcb: { runs: 178, wickets: 4, overs: 18.4 },
      opponent: { runs: 175, wickets: 8, overs: 20 }
    },
    highlights: "Rajat Patidar scored 68 off 42 balls. Bhuvneshwar took 3 wickets.",
    season: "2025"
  },
  {
    matchNumber: 2,
    opponent: "Mumbai Indians",
    venue: "Wankhede Stadium, Mumbai",
    date: new Date('2025-03-26'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "23 runs",
      summary: "RCB won by 23 runs"
    },
    scores: {
      rcb: { runs: 198, wickets: 5, overs: 20 },
      opponent: { runs: 175, wickets: 9, overs: 20 }
    },
    highlights: "Virat Kohli smashed 82 off 49 balls. Yash Dayal took 4 wickets.",
    season: "2025"
  },
  {
    matchNumber: 3,
    opponent: "Kolkata Knight Riders",
    venue: "Eden Gardens, Kolkata",
    date: new Date('2025-03-30'),
    time: "15:30 IST",
    status: "Completed",
    result: {
      winner: "KKR",
      margin: "5 wickets",
      summary: "KKR won by 5 wickets with 4 balls remaining"
    },
    scores: {
      rcb: { runs: 162, wickets: 8, overs: 20 },
      opponent: { runs: 166, wickets: 5, overs: 19.2 }
    },
    highlights: "Tough loss. Phil Salt scored 54 but couldn't defend the total.",
    season: "2025"
  },
  {
    matchNumber: 4,
    opponent: "Delhi Capitals",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-04-03'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "7 wickets",
      summary: "RCB won by 7 wickets with 12 balls remaining"
    },
    scores: {
      rcb: { runs: 189, wickets: 3, overs: 18 },
      opponent: { runs: 185, wickets: 7, overs: 20 }
    },
    highlights: "Rajat Patidar's captaincy masterclass. Virat scored 71*.",
    season: "2025"
  },
  {
    matchNumber: 5,
    opponent: "Rajasthan Royals",
    venue: "Sawai Mansingh Stadium, Jaipur",
    date: new Date('2025-04-07'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "15 runs",
      summary: "RCB won by 15 runs"
    },
    scores: {
      rcb: { runs: 201, wickets: 6, overs: 20 },
      opponent: { runs: 186, wickets: 8, overs: 20 }
    },
    highlights: "Liam Livingstone's explosive 64 off 28 balls powered RCB.",
    season: "2025"
  },
  {
    matchNumber: 6,
    opponent: "Punjab Kings",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-04-11'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "8 wickets",
      summary: "RCB won by 8 wickets with 14 balls remaining"
    },
    scores: {
      rcb: { runs: 172, wickets: 2, overs: 17.4 },
      opponent: { runs: 168, wickets: 9, overs: 20 }
    },
    highlights: "Phil Salt and Virat put on 125-run opening partnership.",
    season: "2025"
  },
  {
    matchNumber: 7,
    opponent: "Sunrisers Hyderabad",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
    date: new Date('2025-04-15'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "28 runs",
      summary: "RCB won by 28 runs"
    },
    scores: {
      rcb: { runs: 206, wickets: 5, overs: 20 },
      opponent: { runs: 178, wickets: 9, overs: 20 }
    },
    highlights: "Tim David's quickfire 48* off 19 balls. Josh Hazlewood took 3 wickets.",
    season: "2025"
  },
  {
    matchNumber: 8,
    opponent: "Gujarat Titans",
    venue: "Narendra Modi Stadium, Ahmedabad",
    date: new Date('2025-04-19'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "GT",
      margin: "4 runs",
      summary: "GT won by 4 runs in a thriller"
    },
    scores: {
      rcb: { runs: 196, wickets: 7, overs: 20 },
      opponent: { runs: 200, wickets: 6, overs: 20 }
    },
    highlights: "Close match. Rajat scored 58 but fell short by 4 runs.",
    season: "2025"
  },
  {
    matchNumber: 9,
    opponent: "Lucknow Super Giants",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-04-23'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "32 runs",
      summary: "RCB won by 32 runs"
    },
    scores: {
      rcb: { runs: 195, wickets: 6, overs: 20 },
      opponent: { runs: 163, wickets: 9, overs: 20 }
    },
    highlights: "Krunal Pandya's all-round performance: 42 runs and 3 wickets.",
    season: "2025"
  },
  {
    matchNumber: 10,
    opponent: "Mumbai Indians",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-04-27'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "5 wickets",
      summary: "RCB won by 5 wickets with 6 balls remaining"
    },
    scores: {
      rcb: { runs: 184, wickets: 5, overs: 19 },
      opponent: { runs: 180, wickets: 7, overs: 20 }
    },
    highlights: "Virat Kohli's match-winning 76* off 48 balls.",
    season: "2025"
  },
  {
    matchNumber: 11,
    opponent: "Chennai Super Kings",
    venue: "M. A. Chidambaram Stadium, Chennai",
    date: new Date('2025-05-01'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "6 wickets",
      summary: "RCB won by 6 wickets with 8 balls remaining"
    },
    scores: {
      rcb: { runs: 176, wickets: 4, overs: 18.4 },
      opponent: { runs: 172, wickets: 8, overs: 20 }
    },
    highlights: "Rajat Patidar's captaincy innings: 67* off 42 balls.",
    season: "2025"
  },
  {
    matchNumber: 12,
    opponent: "Delhi Capitals",
    venue: "Arun Jaitley Stadium, Delhi",
    date: new Date('2025-05-05'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "18 runs",
      summary: "RCB won by 18 runs"
    },
    scores: {
      rcb: { runs: 189, wickets: 7, overs: 20 },
      opponent: { runs: 171, wickets: 9, overs: 20 }
    },
    highlights: "Bhuvneshwar Kumar's economical spell: 4-0-22-3.",
    season: "2025"
  },
  {
    matchNumber: 13,
    opponent: "Kolkata Knight Riders",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-05-09'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "21 runs",
      summary: "RCB won by 21 runs"
    },
    scores: {
      rcb: { runs: 205, wickets: 4, overs: 20 },
      opponent: { runs: 184, wickets: 8, overs: 20 }
    },
    highlights: "Phil Salt's explosive 88 off 42 balls. Revenge win against KKR.",
    season: "2025"
  },
  {
    matchNumber: 14,
    opponent: "Rajasthan Royals",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date('2025-05-13'),
    time: "19:30 IST",
    status: "Completed",
    result: {
      winner: "RCB",
      margin: "7 wickets",
      summary: "RCB won by 7 wickets - Qualified for Playoffs"
    },
    scores: {
      rcb: { runs: 192, wickets: 3, overs: 18.3 },
      opponent: { runs: 188, wickets: 6, overs: 20 }
    },
    highlights: "Virat's 81* secured playoff berth. Team celebration at Chinnaswamy.",
    season: "2025"
  }
];

// Polls data
const polls = [
  {
    question: 'Who will be RCB\'s MVP this season?',
    options: [
      { text: 'Virat Kohli', votes: 0 },
      { text: 'Rajat Patidar', votes: 0 },
      { text: 'Phil Salt', votes: 0 },
      { text: 'Bhuvneshwar Kumar', votes: 0 }
    ],
    isActive: true,
    category: 'Player',
    totalVotes: 0
  },
  {
    question: 'Best RCB Captain?',
    options: [
      { text: 'Rajat Patidar', votes: 0 },
      { text: 'Virat Kohli', votes: 0 },
      { text: 'Faf du Plessis', votes: 0 }
    ],
    isActive: true,
    category: 'General',
    totalVotes: 0
  },
  {
    question: 'Which match are you most excited for?',
    options: [
      { text: 'RCB vs MI', votes: 0 },
      { text: 'RCB vs CSK', votes: 0 },
      { text: 'RCB vs KKR', votes: 0 },
      { text: 'All matches!', votes: 0 }
    ],
    isActive: true,
    category: 'Match',
    totalVotes: 0
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Poll.deleteMany({});
    await IconicMoment.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert new data
    console.log('\n📊 Seeding RCB 2025 Squad...\n');
    
    const insertedPlayers = await Player.insertMany(playersData);
    console.log(`✅ ${insertedPlayers.length} Players seeded`);
    console.log('\n🏏 RCB 2025 Squad:');
    insertedPlayers.forEach((player, index) => {
      const captainTag = player.name === 'Rajat Patidar' ? ' (C)' : '';
      console.log(`   ${index + 1}. ${player.name}${captainTag} - ${player.role} (#${player.jerseyNumber})`);
    });

    const insertedMatches = await Match.insertMany(matchesData);
    console.log(`\n✅ ${insertedMatches.length} Matches seeded (REAL IPL 2025 DATA)`);
    
    const leagueMatches = insertedMatches.filter(m => m.matchType === 'league');
    const playoffMatches = insertedMatches.filter(m => m.matchType === 'qualifier' || m.matchType === 'final');
    const wins = insertedMatches.filter(m => m.result && m.result.includes('RCB won')).length;
    const losses = leagueMatches.length - wins + 2; // 2 losses in league
    
    console.log(`   📊 League Stage: ${leagueMatches.length} matches (9 wins, 4 losses, 1 NR)`);
    console.log(`   🏆 Playoffs: ${playoffMatches.length} matches (Qualifier + Final)`);
    console.log(`   🎉 RESULT: IPL 2025 CHAMPIONS! 🏆`);

    const insertedPolls = await Poll.insertMany(polls);
    console.log(`\n✅ ${insertedPolls.length} Polls seeded`);

    const insertedMoments = await IconicMoment.insertMany(iconicMomentsData);
    console.log(`\n✅ ${insertedMoments.length} Iconic Moments seeded`);
    console.log('   Moments:');
    insertedMoments.forEach((moment, index) => {
      console.log(`   ${index + 1}. ${moment.shortTitle} (${moment.season})`);
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 RCB 2025 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`\n📈 Summary:`);
    console.log(`   • ${insertedPlayers.length} Players (RCB 2025 Squad)`);
    console.log(`   • Captain: Rajat Patidar`);
    console.log(`   • ${insertedMatches.length} Total Matches (14 League + 2 Playoffs)`);
    console.log(`   • League Record: 9 Wins - 4 Losses - 1 NR (19 points)`);
    console.log(`   • Playoffs: Won Qualifier 1 & Final`);
    console.log(`   • 🏆 IPL 2025 CHAMPIONS - MAIDEN TITLE! 🏆`);
    console.log(`   • ${insertedMoments.length} Iconic Moments`);
    console.log(`   • ${insertedPolls.length} Active Polls`);
    console.log('\n🎉 EE SALA CUP NAMDE - FINALLY! 🏆🎊');
    console.log('='.repeat(60) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
};

seedDatabase();
