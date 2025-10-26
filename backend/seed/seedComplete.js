const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Poll = require('../models/Poll');
const IconicMoment = require('../models/IconicMoment');

dotenv.config();

// Load data from JSON files
const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'playersData2025.json'), 'utf8'));
const matchesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'matchesData2025.json'), 'utf8'));
const iconicMomentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'iconicMomentsData.json'), 'utf8'));

// Polls data
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
  },
  {
    question: 'Favorite RCB Iconic Moment?',
    options: [
      { text: 'IPL 2025 Championship Win', votes: 0 },
      { text: 'Gayle\'s 175*', votes: 0 },
      { text: 'Virat-AB 229 Partnership', votes: 0 },
      { text: 'All of them!', votes: 0 }
    ],
    isActive: true,
    category: 'Moment',
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
    console.log('\n📊 Seeding new data...\n');
    
    const insertedPlayers = await Player.insertMany(playersData);
    console.log(`✅ ${insertedPlayers.length} Players seeded`);
    console.log('   Players: ' + insertedPlayers.map(p => p.name).join(', '));

    const insertedMatches = await Match.insertMany(matchesData);
    console.log(`\n✅ ${insertedMatches.length} Matches seeded`);
    console.log(`   League Stage: ${insertedMatches.filter(m => m.matchNumber <= 14).length} matches`);

    const insertedPolls = await Poll.insertMany(polls);
    console.log(`\n✅ ${insertedPolls.length} Polls seeded`);

    const insertedMoments = await IconicMoment.insertMany(iconicMomentsData);
    console.log(`\n✅ ${insertedMoments.length} Iconic Moments seeded`);
    console.log('   Moments: ' + insertedMoments.map(m => m.title).join('\n            '));

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`\n📈 Summary:`);
    console.log(`   • ${insertedPlayers.length} Players (RCB Squad 2025)`);
    console.log(`   • ${insertedMatches.length} Matches (IPL 2025 Season)`);
    console.log(`   • ${insertedMoments.length} Iconic Moments`);
    console.log(`   • ${insertedPolls.length} Active Polls`);
    console.log('\n🏏 Ee Sala Cup Namde! 🏆');
    console.log('='.repeat(60) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
};

seedDatabase();
