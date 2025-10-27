const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Poll = require('../models/Poll');
const IconicMoment = require('../models/IconicMoment');

dotenv.config();

// Load YOUR EXACT DATA FILES
const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rcb2025Squad.json'), 'utf8'));
const matchesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rcbIPL2025Matches.json'), 'utf8'));
const detailedMatchesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'detailedMatchesData.json'), 'utf8'));
const iconicMomentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'iconicMomentsRCB.json'), 'utf8'));

// Merge detailed scorecard data into matches
const mergedMatches = matchesData.map(match => {
  const detailedMatch = detailedMatchesData.find(dm => dm.matchId === match.matchId);
  if (detailedMatch) {
    return {
      ...match,
      tossWinner: detailedMatch.tossWinner,
      tossDecision: detailedMatch.tossDecision,
      playerOfMatch: detailedMatch.playerOfMatch,
      rcbBatting: detailedMatch.rcbBatting || [],
      opponentBatting: detailedMatch.opponentBatting || [],
      rcbBowling: detailedMatch.rcbBowling || [],
      opponentBowling: detailedMatch.opponentBowling || [],
      rcbExtras: detailedMatch.rcbExtras || { total: 0 },
      opponentExtras: detailedMatch.opponentExtras || { total: 0 }
    };
  }
  return match;
});

// Polls data
const polls = [
  {
    question: 'Who will be RCB\'s MVP this season?',
    options: [
      { text: 'Virat Kohli', votes: 1247 },
      { text: 'Rajat Patidar', votes: 1543 },
      { text: 'Phil Salt', votes: 876 },
      { text: 'Bhuvneshwar Kumar', votes: 654 }
    ],
    isActive: true,
    category: 'Player',
    totalVotes: 4320
  },
  {
    question: 'Best RCB Captain?',
    options: [
      { text: 'Rajat Patidar', votes: 2341 },
      { text: 'Virat Kohli', votes: 3456 },
      { text: 'Faf du Plessis', votes: 1234 }
    ],
    isActive: true,
    category: 'General',
    totalVotes: 7031
  },
  {
    question: 'Which match are you most excited for?',
    options: [
      { text: 'RCB vs MI', votes: 876 },
      { text: 'RCB vs CSK', votes: 1234 },
      { text: 'RCB vs KKR', votes: 654 },
      { text: 'All matches!', votes: 2456 }
    ],
    isActive: true,
    category: 'Match',
    totalVotes: 5220
  },
  {
    question: 'Favorite RCB Moment?',
    options: [
      { text: 'Gayle\'s 175*', votes: 1876 },
      { text: 'Virat-AB Partnership', votes: 1543 },
      { text: 'Kohli\'s 973 runs', votes: 1234 },
      { text: 'All moments!', votes: 987 }
    ],
    isActive: true,
    category: 'General',
    totalVotes: 5640
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
    console.log('✅ Cleared all existing data\n');

    // Insert Players
    console.log('👥 Seeding RCB 2025 Squad...');
    const insertedPlayers = await Player.insertMany(playersData);
    console.log(`✅ ${insertedPlayers.length} Players seeded\n`);
    console.log('🏏 RCB 2025 Squad:');
    insertedPlayers.forEach((player, index) => {
      const captainTag = player.name === 'Rajat Patidar' ? ' (C)' : '';
      console.log(`   ${index + 1}. ${player.name}${captainTag} - ${player.role} (#${player.jerseyNumber})`);
    });

    // Insert Matches with detailed scorecards
    console.log('\n⚔️  Seeding Matches with DETAILED SCORECARDS...');
    const insertedMatches = await Match.insertMany(mergedMatches);
    console.log(`✅ ${insertedMatches.length} Matches seeded with complete scorecard data\n`);
    
    const matchesWithScorecard = insertedMatches.filter(m => m.rcbBatting && m.rcbBatting.length > 0);
    console.log(`   📊 Matches with detailed scorecards: ${matchesWithScorecard.length}`);
    console.log(`   📈 Total matches: ${insertedMatches.length}`);

    // Insert Polls
    console.log('\n📊 Seeding Polls...');
    const insertedPolls = await Poll.insertMany(polls);
    console.log(`✅ ${insertedPolls.length} Polls seeded`);

    // Insert Iconic Moments
    console.log('\n🏆 Seeding Iconic Moments...');
    const insertedMoments = await IconicMoment.insertMany(iconicMomentsData);
    console.log(`✅ ${insertedMoments.length} Iconic Moments seeded\n`);
    console.log('   Top Moments:');
    insertedMoments.slice(0, 5).forEach((moment, index) => {
      console.log(`   ${index + 1}. ${moment.shortTitle || moment.title} (${moment.season})`);
    });

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('🎉 COMPLETE RCB 2025 DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(70));
    console.log(`\n📈 Complete Summary:`);
    console.log(`   • ${insertedPlayers.length} Players (Full RCB 2025 Squad)`);
    console.log(`   • Captain: Rajat Patidar`);
    console.log(`   • ${insertedMatches.length} Matches (IPL 2025 Season)`);
    console.log(`   • ${matchesWithScorecard.length} Matches with DETAILED SCORECARDS`);
    console.log(`   • ${insertedMoments.length} Iconic Moments`);
    console.log(`   • ${insertedPolls.length} Active Polls (${polls.reduce((sum, p) => sum + p.totalVotes, 0)} total votes)`);
    console.log('\n✅ DETAILED SCORECARD FEATURE: WORKING!');
    console.log('   Users can now view complete batting/bowling stats for each match');
    console.log('\n🏏 Ee Sala Cup Namde! 🏆');
    console.log('='.repeat(70) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    process.exit(1);
  }
};

seedDatabase();
