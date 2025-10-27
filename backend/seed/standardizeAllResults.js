require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI;

// Standardize all match results to consistent format
const standardizeResults = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🔧 Standardizing ALL match results...\n');

    const matches = await Match.find({}).sort({ matchNumber: 1 });

    for (const match of matches) {
      let newResult = match.result;

      // Standardize "Royal Challengers Bengaluru won" to "RCB won"
      if (newResult && newResult.includes('Royal Challengers Bengaluru won')) {
        newResult = newResult.replace('Royal Challengers Bengaluru won', 'RCB won');
      }
      if (newResult && newResult.includes('Royal Challengers won')) {
        newResult = newResult.replace('Royal Challengers won', 'RCB won');
      }

      // Update if changed
      if (newResult !== match.result) {
        await Match.findByIdAndUpdate(match._id, { result: newResult });
        console.log(`✅ Match ${match.matchNumber}: ${match.opponent}`);
        console.log(`   OLD: ${match.result}`);
        console.log(`   NEW: ${newResult}\n`);
      }
    }

    console.log('📊 Final Results Summary:\n');
    const updatedMatches = await Match.find({}).sort({ matchNumber: 1 });
    
    updatedMatches.forEach(m => {
      const status = m.result && m.result.toLowerCase().includes('rcb won') ? '✅' : 
                     m.result && m.result.toLowerCase().includes('abandoned') ? '🌧️' : '❌';
      console.log(`${status} Match ${m.matchNumber}: vs ${m.opponent} - ${m.result}`);
    });

    console.log('\n🎉 All match results are now standardized!');
    console.log('👉 All matches will now display consistently in the UI!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

standardizeResults();
