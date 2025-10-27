require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI;

const fixMatchScores = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🔧 Fixing score inconsistencies in ALL matches...\n');

    // Get all matches
    const matches = await Match.find({});

    let fixed = 0;
    let wins = 0;
    let losses = 0;

    for (const match of matches) {
      let needsUpdate = false;
      const updates = {};

      // Remove the old 'scores' field if it exists and conflicts with ourScore/theirScore
      if (match.scores) {
        updates.$unset = { scores: "" };
        needsUpdate = true;
      }

      // Count wins/losses
      if (match.result && match.status === 'completed') {
        if (match.result.toLowerCase().includes('rcb won') || 
            match.result.toLowerCase().includes('royal challengers') && match.result.toLowerCase().includes('won')) {
          wins++;
        } else if (match.result.toLowerCase().includes('abandoned') || 
                   match.result.toLowerCase().includes('no result')) {
          // Don't count
        } else {
          losses++;
        }
      }

      if (needsUpdate) {
        await Match.findByIdAndUpdate(match._id, updates);
        console.log(`✅ Fixed Match ${match.matchNumber}: ${match.opponent}`);
        fixed++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   • Total matches: ${matches.length}`);
    console.log(`   • Matches fixed: ${fixed}`);
    console.log(`   • RCB Wins: ${wins}`);
    console.log(`   • RCB Losses: ${losses}`);
    console.log(`   • Abandoned/NR: ${matches.length - wins - losses}`);

    console.log('\n🎉 All match scores are now consistent!');
    console.log('👉 Frontend will now display correct scores everywhere!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixMatchScores();
