const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Poll = require('../models/Poll');
const IconicMoment = require('../models/IconicMoment');

dotenv.config();

// Load ALL data from JSON files
const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'playersData2025.json'), 'utf8'));

// Complete matches data with proper structure
const matchesData = [
  {
    matchId: "RCB-2025-M1",
    matchNumber: 1,
    opponent: "Mumbai Indians",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-03-22"),
    time: "19:30 IST",
    homeAway: "home",
    status: "completed",
    result: "RCB won by 7 wickets",
    ourScore: { runs: 182, wickets: 3, overs: "18.4" },
    theirScore: { runs: 178, wickets: 8, overs: "20.0" },
    highlights: "Virat Kohli scored 68 off 42 balls. Siraj took 3 wickets in powerplay.",
    topPerformers: [
      { name: "Virat Kohli", performance: "68 runs off 42 balls" },
      { name: "Mohammed Siraj", performance: "3 wickets for 28 runs" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M2",
    matchNumber: 2,
    opponent: "Chennai Super Kings",
    venue: "M. A. Chidambaram Stadium, Chennai",
    date: new Date("2025-03-26"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "RCB won by 5 runs",
    ourScore: { runs: 198, wickets: 5, overs: "20.0" },
    theirScore: { runs: 193, wickets: 7, overs: "20.0" },
    highlights: "Will Jacks smashed 62 off 27 balls. Hasaranga took 4 wickets.",
    topPerformers: [
      { name: "Will Jacks", performance: "62 runs off 27 balls" },
      { name: "Wanindu Hasaranga", performance: "4 wickets for 32 runs" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M3",
    matchNumber: 3,
    opponent: "Kolkata Knight Riders",
    venue: "Eden Gardens, Kolkata",
    date: new Date("2025-03-30"),
    time: "15:30 IST",
    homeAway: "away",
    status: "completed",
    result: "KKR won by 4 wickets",
    ourScore: { runs: 175, wickets: 7, overs: "20.0" },
    theirScore: { runs: 176, wickets: 6, overs: "19.2" },
    highlights: "Glenn Maxwell scored 58. RCB fought hard but fell short.",
    topPerformers: [
      { name: "Glenn Maxwell", performance: "58 runs off 35 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M4",
    matchNumber: 4,
    opponent: "Rajasthan Royals",
    venue: "Sawai Mansingh Stadium, Jaipur",
    date: new Date("2025-04-03"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "RCB won by 8 wickets",
    ourScore: { runs: 189, wickets: 2, overs: "18.3" },
    theirScore: { runs: 185, wickets: 9, overs: "20.0" },
    highlights: "Rajat Patidar scored brilliant 87*. Siraj took 3 crucial wickets.",
    topPerformers: [
      { name: "Rajat Patidar", performance: "87* runs off 52 balls" },
      { name: "Mohammed Siraj", performance: "3 wickets for 31 runs" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M5",
    matchNumber: 5,
    opponent: "Delhi Capitals",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-04-07"),
    time: "19:30 IST",
    homeAway: "home",
    status: "completed",
    result: "RCB won by 6 wickets",
    ourScore: { runs: 168, wickets: 4, overs: "19.1" },
    theirScore: { runs: 164, wickets: 8, overs: "20.0" },
    highlights: "Virat Kohli's match-winning 72*. Hasaranga took 3/28.",
    topPerformers: [
      { name: "Virat Kohli", performance: "72* runs off 48 balls" },
      { name: "Wanindu Hasaranga", performance: "3 wickets for 28 runs" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M6",
    matchNumber: 6,
    opponent: "Punjab Kings",
    venue: "IS Bindra Stadium, Mohali",
    date: new Date("2025-04-11"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "RCB won by 23 runs",
    ourScore: { runs: 201, wickets: 5, overs: "20.0" },
    theirScore: { runs: 178, wickets: 9, overs: "20.0" },
    highlights: "Faf du Plessis scored 78. Maxwell took 3 wickets.",
    topPerformers: [
      { name: "Faf du Plessis", performance: "78 runs off 49 balls" },
      { name: "Glenn Maxwell", performance: "3 wickets for 24 runs" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M7",
    matchNumber: 7,
    opponent: "Sunrisers Hyderabad",
    venue: "Rajiv Gandhi Stadium, Hyderabad",
    date: new Date("2025-04-15"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "RCB won by 35 runs",
    ourScore: { runs: 212, wickets: 4, overs: "20.0" },
    theirScore: { runs: 177, wickets: 8, overs: "20.0" },
    highlights: "Will Jacks exploded with 88 off 38 balls.",
    topPerformers: [
      { name: "Will Jacks", performance: "88 runs off 38 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M8",
    matchNumber: 8,
    opponent: "Gujarat Titans",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-04-19"),
    time: "19:30 IST",
    homeAway: "home",
    status: "completed",
    result: "RCB won by 9 wickets",
    ourScore: { runs: 192, wickets: 1, overs: "18.2" },
    theirScore: { runs: 188, wickets: 6, overs: "20.0" },
    highlights: "Virat Kohli century - 103* off 58 balls!",
    topPerformers: [
      { name: "Virat Kohli", performance: "103* runs off 58 balls" }
    ],
    season: "2025",
    matchType: "league",
    isSpecial: true,
    specialNote: "Virat Kohli's 8th IPL Century"
  },
  {
    matchId: "RCB-2025-M9",
    matchNumber: 9,
    opponent: "Lucknow Super Giants",
    venue: "BRSABV Ekana Stadium, Lucknow",
    date: new Date("2025-04-23"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "LSG won by 3 wickets",
    ourScore: { runs: 181, wickets: 7, overs: "20.0" },
    theirScore: { runs: 182, wickets: 7, overs: "19.5" },
    highlights: "Close match. Maxwell scored 62 but RCB fell short.",
    topPerformers: [
      { name: "Glenn Maxwell", performance: "62 runs off 34 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M10",
    matchNumber: 10,
    opponent: "Mumbai Indians",
    venue: "Wankhede Stadium, Mumbai",
    date: new Date("2025-04-27"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "RCB won by 5 wickets",
    ourScore: { runs: 172, wickets: 5, overs: "19.3" },
    theirScore: { runs: 168, wickets: 9, overs: "20.0" },
    highlights: "Rajat Patidar's 65 guided RCB to victory.",
    topPerformers: [
      { name: "Rajat Patidar", performance: "65 runs off 41 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M11",
    matchNumber: 11,
    opponent: "Chennai Super Kings",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-05-01"),
    time: "19:30 IST",
    homeAway: "home",
    status: "completed",
    result: "RCB won by 7 wickets",
    ourScore: { runs: 195, wickets: 3, overs: "18.5" },
    theirScore: { runs: 191, wickets: 6, overs: "20.0" },
    highlights: "Faf and Virat partnership of 129 runs.",
    topPerformers: [
      { name: "Faf du Plessis", performance: "71 runs off 42 balls" },
      { name: "Virat Kohli", performance: "58 runs off 39 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M12",
    matchNumber: 12,
    opponent: "Kolkata Knight Riders",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-05-05"),
    time: "19:30 IST",
    homeAway: "home",
    status: "completed",
    result: "RCB won by 29 runs",
    ourScore: { runs: 208, wickets: 5, overs: "20.0" },
    theirScore: { runs: 179, wickets: 8, overs: "20.0" },
    highlights: "Will Jacks 92 off 41 balls. Siraj 4 wickets.",
    topPerformers: [
      { name: "Will Jacks", performance: "92 runs off 41 balls" },
      { name: "Mohammed Siraj", performance: "4 wickets for 29 runs" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M13",
    matchNumber: 13,
    opponent: "Rajasthan Royals",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-05-09"),
    time: "19:30 IST",
    homeAway: "home",
    status: "completed",
    result: "RCB won by 6 wickets",
    ourScore: { runs: 183, wickets: 4, overs: "19.2" },
    theirScore: { runs: 179, wickets: 7, overs: "20.0" },
    highlights: "Maxwell 73* off 38 balls sealed the win.",
    topPerformers: [
      { name: "Glenn Maxwell", performance: "73* runs off 38 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-M14",
    matchNumber: 14,
    opponent: "Delhi Capitals",
    venue: "Arun Jaitley Stadium, Delhi",
    date: new Date("2025-05-13"),
    time: "19:30 IST",
    homeAway: "away",
    status: "completed",
    result: "RCB won by 8 wickets",
    ourScore: { runs: 176, wickets: 2, overs: "17.4" },
    theirScore: { runs: 172, wickets: 8, overs: "20.0" },
    highlights: "Virat Kohli 81*. RCB finished league stage strong.",
    topPerformers: [
      { name: "Virat Kohli", performance: "81* runs off 49 balls" }
    ],
    season: "2025",
    matchType: "league"
  },
  {
    matchId: "RCB-2025-Q1",
    matchNumber: 15,
    opponent: "Mumbai Indians",
    venue: "Narendra Modi Stadium, Ahmedabad",
    date: new Date("2025-05-17"),
    time: "19:30 IST",
    homeAway: "neutral",
    status: "completed",
    result: "RCB won by 23 runs",
    ourScore: { runs: 196, wickets: 5, overs: "20.0" },
    theirScore: { runs: 173, wickets: 9, overs: "20.0" },
    highlights: "Faf 68, Maxwell 52*. RCB qualified for final!",
    topPerformers: [
      { name: "Faf du Plessis", performance: "68 runs off 44 balls" },
      { name: "Glenn Maxwell", performance: "52* runs off 28 balls" }
    ],
    season: "2025",
    matchType: "qualifier",
    isPlayoff: true
  },
  {
    matchId: "RCB-2025-FINAL",
    matchNumber: 16,
    opponent: "Kolkata Knight Riders",
    venue: "Narendra Modi Stadium, Ahmedabad",
    date: new Date("2025-05-21"),
    time: "19:30 IST",
    homeAway: "neutral",
    status: "completed",
    result: "RCB won by 6 wickets - IPL 2025 CHAMPIONS!",
    ourScore: { runs: 187, wickets: 4, overs: "19.1" },
    theirScore: { runs: 183, wickets: 7, overs: "20.0" },
    highlights: "IPL 2025 CHAMPIONS! Maxwell 68*, DK 34* sealed the trophy. Ee Sala Cup Namde!",
    topPerformers: [
      { name: "Glenn Maxwell", performance: "68* runs off 33 balls" },
      { name: "Dinesh Karthik", performance: "34* runs off 14 balls" },
      { name: "Virat Kohli", performance: "54 runs off 38 balls" }
    ],
    season: "2025",
    matchType: "final",
    isPlayoff: true,
    isFinal: true,
    isChampionship: true,
    isSpecial: true,
    specialNote: "RCB's First IPL Championship - Ee Sala Cup Namde!"
  }
];

// Complete Iconic Moments
const iconicMomentsData = [
  {
    momentId: "RCB-2025-CHAMPIONSHIP",
    title: "IPL 2025 Championship Win - Ee Sala Cup Namde!",
    description: "After 18 years of wait, RCB finally lifted the IPL trophy! Maxwell's 68* and DK's 34* in the final sealed RCB's maiden championship.",
    date: new Date("2025-05-21"),
    season: "2025",
    category: "championship",
    imageUrl: "/images/moments/ipl-2025-trophy.jpg",
    videoUrl: "https://youtube.com/rcb-2025-final",
    tags: ["Championship", "IPL 2025", "Final", "Maxwell", "DK", "Trophy"]
  },
  {
    momentId: "RCB-2025-VIRAT-CENTURY",
    title: "Virat Kohli's 8th IPL Century",
    description: "Virat Kohli scored a magnificent 103* off 58 balls against Gujarat Titans at Chinnaswamy Stadium.",
    date: new Date("2025-04-19"),
    season: "2025",
    category: "batting",
    imageUrl: "/images/moments/virat-century-2025.jpg",
    videoUrl: "",
    tags: ["Virat Kohli", "Century", "IPL 2025"]
  },
  {
    momentId: "RCB-2016-VIRAT-973",
    title: "Virat Kohli's Record 973 Runs",
    description: "Virat Kohli scored 973 runs in IPL 2016 - the most runs in a single IPL season, including 4 centuries.",
    date: new Date("2016-05-29"),
    season: "2016",
    category: "batting",
    imageUrl: "/images/moments/virat-2016.jpg",
    videoUrl: "",
    tags: ["Virat Kohli", "Record", "IPL 2016", "973 runs"]
  },
  {
    momentId: "RCB-2013-GAYLE-175",
    title: "Chris Gayle's 175* - Highest IPL Score",
    description: "Chris Gayle smashed 175* off 66 balls vs PWI - the highest individual score in IPL history with 13 fours and 17 sixes.",
    date: new Date("2013-04-23"),
    season: "2013",
    category: "batting",
    imageUrl: "/images/moments/gayle-175.jpg",
    videoUrl: "",
    tags: ["Chris Gayle", "175", "Record", "IPL 2013"]
  },
  {
    momentId: "RCB-2016-VIRAT-AB-229",
    title: "Virat-AB 229 Run Partnership",
    description: "Virat Kohli and AB de Villiers put up a record 229-run partnership against Gujarat Lions - highest partnership in IPL.",
    date: new Date("2016-05-14"),
    season: "2016",
    category: "partnership",
    imageUrl: "/images/moments/virat-ab-229.jpg",
    videoUrl: "",
    tags: ["Virat Kohli", "AB de Villiers", "Partnership", "Record"]
  },
  {
    momentId: "RCB-2009-KUMBLE-5",
    title: "Anil Kumble's 5/5 - Best IPL Figures",
    description: "Anil Kumble took 5 wickets for just 5 runs against Rajasthan Royals - best bowling figures in IPL history.",
    date: new Date("2009-05-18"),
    season: "2009",
    category: "bowling",
    imageUrl: "/images/moments/kumble-5-5.jpg",
    videoUrl: "",
    tags: ["Anil Kumble", "5/5", "Record", "Bowling"]
  },
  {
    momentId: "RCB-2025-HASARANGA-5",
    title: "Wanindu Hasaranga's 5/18",
    description: "Wanindu Hasaranga took 5 wickets for 18 runs against Mumbai Indians in IPL 2025.",
    date: new Date("2025-03-22"),
    season: "2025",
    category: "bowling",
    imageUrl: "/images/moments/hasaranga-5wickets.jpg",
    videoUrl: "",
    tags: ["Hasaranga", "5 wickets", "IPL 2025"]
  },
  {
    momentId: "RCB-2025-JACKS-92",
    title: "Will Jacks' Explosive 92",
    description: "Will Jacks smashed 92 off 41 balls with 8 fours and 7 sixes against KKR.",
    date: new Date("2025-05-05"),
    season: "2025",
    category: "batting",
    imageUrl: "/images/moments/jacks-92.jpg",
    videoUrl: "",
    tags: ["Will Jacks", "92", "IPL 2025"]
  }
];

// Complete Polls
const polls = [
  {
    question: "Who will be RCB's MVP this season?",
    options: [
      { text: "Virat Kohli", votes: 1247 },
      { text: "Glenn Maxwell", votes: 983 },
      { text: "Mohammed Siraj", votes: 756 },
      { text: "Faf du Plessis", votes: 654 },
      { text: "Rajat Patidar", votes: 432 }
    ],
    isActive: true,
    category: "Player",
    totalVotes: 4072
  },
  {
    question: "Best RCB Moment Ever?",
    options: [
      { text: "IPL 2025 Championship Win", votes: 2341 },
      { text: "Gayle's 175*", votes: 1876 },
      { text: "Virat-AB 229 Partnership", votes: 1543 },
      { text: "Virat's 973 runs in 2016", votes: 1234 }
    ],
    isActive: true,
    category: "General",
    totalVotes: 6994
  },
  {
    question: "Which match are you most excited to watch?",
    options: [
      { text: "RCB vs MI", votes: 876 },
      { text: "RCB vs CSK", votes: 1234 },
      { text: "RCB vs KKR", votes: 654 },
      { text: "All matches!", votes: 2456 }
    ],
    isActive: true,
    category: "Match",
    totalVotes: 5220
  },
  {
    question: "Who is your favorite RCB player of all time?",
    options: [
      { text: "Virat Kohli", votes: 3456 },
      { text: "AB de Villiers", votes: 2987 },
      { text: "Chris Gayle", votes: 1876 },
      { text: "Rahul Dravid", votes: 987 },
      { text: "Anil Kumble", votes: 654 }
    ],
    isActive: true,
    category: "Player",
    totalVotes: 9960
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 Database:', process.env.MONGODB_URI?.split('@')[1]?.split('/')[1] || 'Unknown');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Poll.deleteMany({});
    await IconicMoment.deleteMany({});
    console.log('✅ Cleared all existing data\n');

    // Insert new data
    console.log('📊 Seeding complete RCB Universe data...\n');
    
    console.log('👥 Inserting Players...');
    const insertedPlayers = await Player.insertMany(playersData);
    console.log(`✅ ${insertedPlayers.length} Players seeded`);
    console.log('   Players:', insertedPlayers.map(p => p.name).join(', '));

    console.log('\n⚔️  Inserting Matches...');
    const insertedMatches = await Match.insertMany(matchesData);
    console.log(`✅ ${insertedMatches.length} Matches seeded`);
    console.log(`   League Matches: ${insertedMatches.filter(m => m.matchType === 'league').length}`);
    console.log(`   Playoff Matches: ${insertedMatches.filter(m => m.isPlayoff).length}`);
    console.log(`   Championship Final: ${insertedMatches.filter(m => m.isChampionship).length}`);

    console.log('\n📊 Inserting Polls...');
    const insertedPolls = await Poll.insertMany(polls);
    console.log(`✅ ${insertedPolls.length} Polls seeded`);

    console.log('\n🏆 Inserting Iconic Moments...');
    const insertedMoments = await IconicMoment.insertMany(iconicMomentsData);
    console.log(`✅ ${insertedMoments.length} Iconic Moments seeded`);
    console.log('   Moments:', insertedMoments.map(m => m.title).slice(0, 3).join('\n            '));

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('🎉 COMPLETE RCB UNIVERSE DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(70));
    console.log(`\n📈 Complete Summary:`);
    console.log(`   • ${insertedPlayers.length} Players (Full RCB Squad 2025)`);
    console.log(`   • ${insertedMatches.length} Matches (14 League + 2 Playoffs including Final)`);
    console.log(`   • ${insertedMoments.length} Iconic Moments (Including IPL 2025 Championship)`);
    console.log(`   • ${insertedPolls.length} Active Polls with ${polls.reduce((sum, p) => sum + p.totalVotes, 0)} total votes`);
    console.log('\n🏆 IPL 2025 CHAMPIONS - EE SALA CUP NAMDE! 🏆');
    console.log('='.repeat(70) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

seedDatabase();
