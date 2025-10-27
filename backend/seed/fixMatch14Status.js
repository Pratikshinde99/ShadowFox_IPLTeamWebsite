require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI;

const fixMatch14 = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🔧 Fixing Match 14 (LSG) - Changing status from "abandoned" to "completed"...\n');

    // Fix Match 14 - it was completed, not abandoned!
    const result = await Match.findOneAndUpdate(
      { matchNumber: 14 },
      {
        $set: {
          status: 'completed'
        }
      },
      { new: true }
    );

    if (result) {
      console.log(`✅ Match 14: ${result.opponent}`);
      console.log(`   Status: ${result.status}`);
      console.log(`   Result: ${result.result}`);
      console.log(`   Score: RCB ${result.ourScore.runs}/${result.ourScore.wickets} vs LSG ${result.theirScore.runs}/${result.theirScore.wickets}`);
    }

    // Verify the fix
    const allMatches = await Match.find({}).sort({ matchNumber: 1 });
    const completed = allMatches.filter(m => m.status === 'completed').length;
    const abandoned = allMatches.filter(m => m.status === 'abandoned').length;

    console.log('\n📊 Updated Stats:');
    console.log(`   • Total matches: ${allMatches.length}`);
    console.log(`   • Completed: ${completed}`);
    console.log(`   • Abandoned: ${abandoned}`);

    // Count wins
    const wins = allMatches.filter(m => 
      m.status === 'completed' && 
      m.result && (
        m.result.toLowerCase().includes('rcb won') || 
        m.result.toLowerCase().includes('royal challengers') && m.result.toLowerCase().includes('won')
      )
    ).length;

    console.log(`   • RCB Wins: ${wins}`);
    console.log('\n🎉 Match 14 status fixed! Stats will now show correctly.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixMatch14();
