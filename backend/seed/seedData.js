const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Poll = require('../models/Poll');

dotenv.config();

// RCB Squad 2025 - Sample Data
const players = [
  {
    name: 'Virat Kohli',
    role: 'Batsman',
    nationality: 'India',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    jerseyNumber: 18,
    photo: '/images/players/virat-kohli.jpg',
    stats: { matches: 237, runs: 7263, wickets: 4, strikeRate: 130.02, average: 37.25, economy: 8.2 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Faf du Plessis',
    role: 'Batsman',
    nationality: 'South Africa',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm off break',
    jerseyNumber: 19,
    photo: '/images/players/faf-du-plessis.jpg',
    stats: { matches: 121, runs: 3546, wickets: 0, strikeRate: 129.71, average: 32.24, economy: 0 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Glenn Maxwell',
    role: 'All-Rounder',
    nationality: 'Australia',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm off break',
    jerseyNumber: 32,
    photo: '/images/players/glenn-maxwell.jpg',
    stats: { matches: 129, runs: 2771, wickets: 38, strikeRate: 154.67, average: 24.31, economy: 7.45 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Mohammed Siraj',
    role: 'Bowler',
    nationality: 'India',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    jerseyNumber: 13,
    photo: '/images/players/mohammed-siraj.jpg',
    stats: { matches: 93, runs: 156, wickets: 93, strikeRate: 104.00, average: 8.00, economy: 8.67 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Dinesh Karthik',
    role: 'Wicket-Keeper',
    nationality: 'India',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm off break',
    jerseyNumber: 7,
    photo: '/images/players/dinesh-karthik.jpg',
    stats: { matches: 257, runs: 4842, wickets: 0, strikeRate: 135.36, average: 25.62, economy: 0 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Wanindu Hasaranga',
    role: 'All-Rounder',
    nationality: 'Sri Lanka',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm leg break',
    jerseyNumber: 10,
    photo: '/images/players/wanindu-hasaranga.jpg',
    stats: { matches: 32, runs: 289, wickets: 43, strikeRate: 146.70, average: 14.45, economy: 7.28 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Harshal Patel',
    role: 'Bowler',
    nationality: 'India',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    jerseyNumber: 8,
    photo: '/images/players/harshal-patel.jpg',
    stats: { matches: 71, runs: 246, wickets: 78, strikeRate: 123.12, average: 11.14, economy: 8.92 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Rajat Patidar',
    role: 'Batsman',
    nationality: 'India',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm off break',
    jerseyNumber: 9,
    photo: '/images/players/rajat-patidar.jpg',
    stats: { matches: 23, runs: 524, wickets: 0, strikeRate: 152.03, average: 29.11, economy: 0 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Josh Hazlewood',
    role: 'Bowler',
    nationality: 'Australia',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    jerseyNumber: 17,
    photo: '/images/players/josh-hazlewood.jpg',
    stats: { matches: 12, runs: 14, wickets: 12, strikeRate: 70.00, average: 7.00, economy: 7.83 },
    isActive: true,
    season: '2025'
  },
  {
    name: 'Anuj Rawat',
    role: 'Wicket-Keeper',
    nationality: 'India',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm off break',
    jerseyNumber: 34,
    photo: '/images/players/anuj-rawat.jpg',
    stats: { matches: 18, runs: 234, wickets: 0, strikeRate: 128.57, average: 15.60, economy: 0 },
    isActive: true,
    season: '2025'
  }
];

// Sample Matches
const matches = [
  {
    matchNumber: 1,
    opponent: 'Mumbai Indians',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    date: new Date('2025-03-22'),
    time: '19:30 IST',
    status: 'Upcoming',
    season: '2025'
  },
  {
    matchNumber: 2,
    opponent: 'Chennai Super Kings',
    venue: 'M. A. Chidambaram Stadium, Chennai',
    date: new Date('2025-03-26'),
    time: '19:30 IST',
    status: 'Upcoming',
    season: '2025'
  },
  {
    matchNumber: 3,
    opponent: 'Kolkata Knight Riders',
    venue: 'Eden Gardens, Kolkata',
    date: new Date('2025-03-30'),
    time: '15:30 IST',
    status: 'Upcoming',
    season: '2025'
  },
  {
    matchNumber: 4,
    opponent: 'Delhi Capitals',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    date: new Date('2025-04-03'),
    time: '19:30 IST',
    status: 'Upcoming',
    season: '2025'
  },
  {
    matchNumber: 5,
    opponent: 'Rajasthan Royals',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    date: new Date('2025-04-07'),
    time: '19:30 IST',
    status: 'Upcoming',
    season: '2025'
  }
];

// Sample Polls
const polls = [
  {
    question: 'Who will be RCB\'s MVP this season?',
    options: [
      { text: 'Virat Kohli', votes: 0 },
      { text: 'Glenn Maxwell', votes: 0 },
      { text: 'Mohammed Siraj', votes: 0 },
      { text: 'Faf du Plessis', votes: 0 }
    ],
    isActive: true,
    category: 'Player',
    totalVotes: 0
  },
  {
    question: 'Will RCB win IPL 2025?',
    options: [
      { text: 'Yes, Ee Sala Cup Namde!', votes: 0 },
      { text: 'Maybe, if we play well', votes: 0 },
      { text: 'Not sure', votes: 0 }
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

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Poll.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Player.insertMany(players);
    console.log('✅ Players seeded');

    await Match.insertMany(matches);
    console.log('✅ Matches seeded');

    await Poll.insertMany(polls);
    console.log('✅ Polls seeded');

    console.log('🎉 Database seeded successfully!');
    console.log('🏏 Ee Sala Cup Namde!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
