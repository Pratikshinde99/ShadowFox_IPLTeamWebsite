const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Poll = require('../models/Poll');
const IconicMoment = require('../models/IconicMoment');

dotenv.config();

// Simple players data
const playersData = [
  {
    name: "Virat Kohli",
    jerseyNumber: 18,
    role: "Batsman",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    nationality: "India",
    age: 36,
    image: "/images/players/virat-kohli.jpg",
    bio: "Former Indian captain and RCB legend. One of the greatest batsmen of all time.",
    stats: {
      matches: 237,
      runs: 7263,
      average: 36.67,
      strikeRate: 130.02,
      fifties: 50,
      hundreds: 7,
      highestScore: 113
    }
  },
  {
    name: "Faf du Plessis",
    jerseyNumber: 19,
    role: "Batsman",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    nationality: "South Africa",
    age: 39,
    image: "/images/players/faf.jpg",
    bio: "RCB captain and experienced South African batsman.",
    stats: {
      matches: 121,
      runs: 3296,
      average: 31.09,
      strikeRate: 130.71,
      fifties: 23,
      hundreds: 1,
      highestScore: 120
    }
  },
  {
    name: "Glenn Maxwell",
    jerseyNumber: 32,
    role: "All-Rounder",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm off break",
    nationality: "Australia",
    age: 35,
    image: "/images/players/maxwell.jpg",
    bio: "Australian all-rounder known for his explosive batting.",
    stats: {
      matches: 123,
      runs: 2550,
      average: 23.18,
      strikeRate: 154.67,
      wickets: 37,
      economy: 7.58
    }
  },
  {
    name: "Mohammed Siraj",
    jerseyNumber: 13,
    role: "Bowler",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm fast",
    nationality: "India",
    age: 30,
    image: "/images/players/siraj.jpg",
    bio: "India's premier fast bowler and RCB's pace spearhead.",
    stats: {
      matches: 93,
      wickets: 93,
      economy: 8.67,
      average: 29.47,
      bestBowling: "4/21"
    }
  }
];

// Simple matches data
const matchesData = [
  {
    matchId: "RCB-2025-M1",
    matchNumber: 1,
    opponent: "Mumbai Indians",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: new Date("2025-03-22"),
    time: "19:30 IST",
    status: "completed",
    result: "RCB won by 7 wickets",
    ourScore: { runs: 182, wickets: 3, overs: "18.4" },
    theirScore: { runs: 178, wickets: 8, overs: "20.0" },
    highlights: "Virat Kohli scored 68 off 42 balls.",
    season: "2025"
  },
  {
    matchId: "RCB-2025-M2",
    matchNumber: 2,
    opponent: "Chennai Super Kings",
    venue: "M. A. Chidambaram Stadium, Chennai",
    date: new Date("2025-03-26"),
    time: "19:30 IST",
    status: "completed",
    result: "RCB won by 5 runs",
    ourScore: { runs: 198, wickets: 5, overs: "20.0" },
    theirScore: { runs: 193, wickets: 7, overs: "20.0" },
    highlights: "Will Jacks smashed 62 off 27 balls.",
    season: "2025"
  },
  {
    matchId: "RCB-2025-M3",
    matchNumber: 3,
    opponent: "Rajasthan Royals",
    venue: "Sawai Mansingh Stadium, Jaipur",
    date: new Date("2025-04-05"),
    time: "19:30 IST",
    status: "upcoming",
    result: "",
    season: "2025"
  }
];

// Iconic moments
const iconicMomentsData = [
  {
    momentId: "RCB-2025-IM1",
    title: "IPL 2025 - Opening Match Victory",
    description: "RCB started IPL 2025 with a dominant 7-wicket victory over Mumbai Indians at Chinnaswamy Stadium.",
    date: new Date("2025-03-22"),
    season: "2025",
    category: "team",
    imageUrl: "/images/moments/ipl2025-opener.jpg",
    videoUrl: "",
    tags: ["Victory", "IPL 2025", "Chinnaswamy"]
  },
  {
    momentId: "RCB-2023-IM1",
    title: "Virat Kohli's Century",
    description: "Virat Kohli's magnificent century against Gujarat Titans.",
    date: new Date("2023-05-21"),
    season: "2023",
    category: "batting",
    imageUrl: "/images/moments/kohli-century.jpg",
    videoUrl: "",
    tags: ["Virat Kohli", "Century", "IPL 2023"]
  }
];

// Polls
const polls = [
  {
    question: "Who will be RCB's MVP this season?",
    options: [
      { text: "Virat Kohli", votes: 0 },
      { text: "Glenn Maxwell", votes: 0 },
      { text: "Mohammed Siraj", votes: 0 },
      { text: "Faf du Plessis", votes: 0 }
    ],
    isActive: true,
    category: "Player",
    totalVotes: 0
  },
  {
    question: "Will RCB win IPL 2025?",
    options: [
      { text: "Yes, Ee Sala Cup Namde!", votes: 0 },
      { text: "Maybe, if we play well", votes: 0 },
      { text: "Not sure", votes: 0 }
    ],
    isActive: true,
    category: "General",
    totalVotes: 0
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Poll.deleteMany({});
    await IconicMoment.deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Insert new data
    console.log('📊 Seeding new data...\n');
    
    const insertedPlayers = await Player.insertMany(playersData);
    console.log(`✅ ${insertedPlayers.length} Players seeded`);

    const insertedMatches = await Match.insertMany(matchesData);
    console.log(`✅ ${insertedMatches.length} Matches seeded`);

    const insertedPolls = await Poll.insertMany(polls);
    console.log(`✅ ${insertedPolls.length} Polls seeded`);

    const insertedMoments = await IconicMoment.insertMany(iconicMomentsData);
    console.log(`✅ ${insertedMoments.length} Iconic Moments seeded`);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`\n📈 Summary:`);
    console.log(`   • ${insertedPlayers.length} Players`);
    console.log(`   • ${insertedMatches.length} Matches`);
    console.log(`   • ${insertedMoments.length} Iconic Moments`);
    console.log(`   • ${insertedPolls.length} Active Polls`);
    console.log('\n🏏 Ee Sala Cup Namde! 🏆');
    console.log('='.repeat(60) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
