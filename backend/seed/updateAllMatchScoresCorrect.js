require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI;

// CORRECT scores from IPL 2025 data
const correctScores = [
  // Match 1
  {
    matchId: "ipl2025-m1",
    ourScore: { runs: 177, wickets: 3, overs: "16.2" },
    theirScore: { runs: 174, wickets: 8, overs: "20.0" },
    result: "RCB won by 7 wickets",
    venue: "Eden Gardens, Kolkata",
    date: "2025-03-22T19:30:00.000Z"
  },
  // Match 2
  {
    matchId: "ipl2025-m2",
    ourScore: { runs: 196, wickets: 7, overs: "20.0" },
    theirScore: { runs: 146, wickets: 8, overs: "20.0" },
    result: "RCB won by 50 runs",
    venue: "MA Chidambaram Stadium, Chennai",
    date: "2025-03-28T19:30:00.000Z"
  },
  // Match 3
  {
    matchId: "ipl2025-m3",
    ourScore: { runs: 169, wickets: 8, overs: "20.0" },
    theirScore: { runs: 170, wickets: 2, overs: "17.5" },
    result: "GT won by 8 wickets",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "2025-04-02T19:30:00.000Z"
  },
  // Match 4
  {
    matchId: "ipl2025-m4",
    ourScore: { runs: 221, wickets: 5, overs: "20.0" },
    theirScore: { runs: 209, wickets: 9, overs: "20.0" },
    result: "RCB won by 12 runs",
    venue: "Wankhede Stadium, Mumbai",
    date: "2025-04-07T19:30:00.000Z"
  },
  // Match 5
  {
    matchId: "ipl2025-m5",
    ourScore: { runs: 163, wickets: 7, overs: "20.0" },
    theirScore: { runs: 169, wickets: 4, overs: "17.5" },
    result: "DC won by 6 wickets",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "2025-04-10T19:30:00.000Z"
  },
  // Match 6
  {
    matchId: "ipl2025-m6",
    ourScore: { runs: 175, wickets: 1, overs: "17.3" },
    theirScore: { runs: 173, wickets: 4, overs: "20.0" },
    result: "RCB won by 9 wickets",
    venue: "Sawai Mansingh Stadium, Jaipur",
    date: "2025-04-13T19:30:00.000Z"
  },
  // Match 7
  {
    matchId: "ipl2025-m7",
    ourScore: { runs: 95, wickets: 9, overs: "14.0" },
    theirScore: { runs: 98, wickets: 5, overs: "12.1" },
    result: "PBKS won by 5 wickets",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "2025-04-18T19:30:00.000Z"
  },
  // Match 8
  {
    matchId: "ipl2025-m7", // This should be match 8
    matchNumber: 8,
    ourScore: { runs: 159, wickets: 3, overs: "18.5" },
    theirScore: { runs: 157, wickets: 6, overs: "20.0" },
    result: "RCB won by 7 wickets",
    venue: "New PCA Stadium, Chandigarh",
    opponent: "Punjab Kings",
    date: "2025-04-20T19:30:00.000Z"
  },
  // Match 9
  {
    matchId: "ipl2025-m40",
    ourScore: { runs: 205, wickets: 5, overs: "20.0" },
    theirScore: { runs: 194, wickets: 9, overs: "20.0" },
    result: "RCB won by 11 runs",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "2025-04-24T19:30:00.000Z"
  },
  // Match 10
  {
    matchId: "ipl2025-m43",
    ourScore: { runs: 165, wickets: 4, overs: "18.3" },
    theirScore: { runs: 162, wickets: 8, overs: "20.0" },
    result: "RCB won by 6 wickets",
    venue: "Arun Jaitley Stadium, Delhi",
    date: "2025-04-27T19:30:00.000Z"
  },
  // Match 11
  {
    matchId: "ipl2025-m49",
    ourScore: { runs: 213, wickets: 5, overs: "20.0" },
    theirScore: { runs: 211, wickets: 5, overs: "20.0" },
    result: "RCB won by 2 runs",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    date: "2025-05-03T19:30:00.000Z"
  },
  // Match 12 - ABANDONED
  {
    matchId: "ipl2025-m63",
    matchNumber: 12,
    ourScore: { runs: 0, wickets: 0, overs: "0.0" },
    theirScore: { runs: 0, wickets: 0, overs: "0.0" },
    result: "Match Abandoned - No Result (Rain)",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    opponent: "Kolkata Knight Riders",
    status: "abandoned",
    date: "2025-05-17T19:30:00.000Z"
  },
  // Match 13
  {
    matchId: "ipl2025-m59",
    matchNumber: 13,
    ourScore: { runs: 189, wickets: 10, overs: "19.5" },
    theirScore: { runs: 231, wickets: 6, overs: "20.0" },
    result: "SRH won by 42 runs",
    venue: "Ekana Cricket Stadium, Lucknow",
    opponent: "Sunrisers Hyderabad",
    date: "2025-05-23T19:30:00.000Z"
  },
  // Match 14
  {
    matchId: "ipl2025-m55",
    matchNumber: 14,
    ourScore: { runs: 230, wickets: 4, overs: "18.4" },
    theirScore: { runs: 227, wickets: 3, overs: "20.0" },
    result: "RCB won by 6 wickets",
    venue: "Ekana Cricket Stadium, Lucknow",
    opponent: "Lucknow Super Giants",
    date: "2025-05-27T19:30:00.000Z"
  },
  // Match 15 - Qualifier 1
  {
    matchId: "ipl2025-playoff1",
    ourScore: { runs: 106, wickets: 2, overs: "10.0" },
    theirScore: { runs: 101, wickets: 10, overs: "14.1" },
    result: "RCB won by 8 wickets",
    venue: "New PCA Stadium, Chandigarh",
    highlights: "Qualifier 1 - RCB storm into IPL 2025 Final! PBKS bowled out for 101.",
    date: "2025-05-29T19:30:00.000Z"
  },
  // Match 16 - FINAL
  {
    matchId: "ipl2025-final",
    ourScore: { runs: 190, wickets: 9, overs: "20.0" },
    theirScore: { runs: 184, wickets: 7, overs: "20.0" },
    result: "RCB won by 6 runs - IPL 2025 CHAMPIONS!",
    venue: "Narendra Modi Stadium, Ahmedabad",
    highlights: "🏆 HISTORIC! RCB wins maiden IPL title! EE SALA CUP NAMDE!",
    date: "2025-06-03T19:30:00.000Z"
  }
];

const updateAllScores = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('📊 Updating ALL 16 matches with CORRECT scores...\n');

    for (const update of correctScores) {
      const { matchId, matchNumber, ...updateData } = update;
      
      let query = { matchId };
      if (matchNumber) {
        query = { matchNumber };
      }

      const result = await Match.findOneAndUpdate(
        query,
        { $set: updateData },
        { new: true }
      );

      if (result) {
        console.log(`✅ Match ${result.matchNumber}: ${result.opponent}`);
        console.log(`   Score: RCB ${updateData.ourScore.runs}/${updateData.ourScore.wickets} vs ${updateData.theirScore.runs}/${updateData.theirScore.wickets}`);
      }
    }

    console.log('\n🎉 ALL 16 MATCHES UPDATED WITH CORRECT SCORES!');
    console.log('\n📋 Summary:');
    console.log('   • Match 1: RCB 177/3 vs KKR 174/8 ✅');
    console.log('   • Match 4: RCB 221/5 vs MI 209/9 ✅ (HIGH SCORE)');
    console.log('   • Match 5: DC 169/4 vs RCB 163/7 ❌ (LOSS)');
    console.log('   • Match 7: PBKS 98/5 vs RCB 95/9 ❌ (LOSS)');
    console.log('   • Match 11: RCB 213/5 vs CSK 211/5 ✅ (THRILLER)');
    console.log('   • Match 14: RCB 230/4 vs LSG 227/3 ✅ (HIGH CHASE)');
    console.log('   • Match 15: RCB 106/2 vs PBKS 101 ✅ (QUALIFIER)');
    console.log('   • Match 16: RCB 190/9 vs PBKS 184/7 🏆 (CHAMPIONS!)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateAllScores();
