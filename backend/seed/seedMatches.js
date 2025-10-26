require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');
const fs = require('fs');
const path = require('path');

// Read matches data from JSON file
const matchesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'matchesData.json'), 'utf8')
);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcb_universe';

// Connect and seed
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Update or insert matches 1-8 only (keep other matches intact)
    for (const matchData of matchesData) {
      await Match.findOneAndUpdate(
        { matchNumber: matchData.matchNumber },
        matchData,
        { upsert: true, new: true }
      );
    }
    
    console.log(`✅ Successfully updated matches 1-8!`);
    console.log('\n📊 Matches updated:');
    matchesData.forEach((m, i) => {
      console.log(`${i + 1}. Match ${m.matchNumber}: vs ${m.opponent} - ${m.result}`);
    });
    
    const totalMatches = await Match.countDocuments();
    console.log(`\n📈 Total matches in database: ${totalMatches}`);
    console.log('\n🎉 First 8 matches updated with real data!');
    console.log('👉 Other matches remain unchanged');
    console.log('👉 Go to Matches page and click on any match to view scorecard');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
