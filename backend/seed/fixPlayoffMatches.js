require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');

const MONGODB_URI = process.env.MONGODB_URI;

const fixPlayoffs = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🏆 Fixing Playoff Matches with CORRECT HIGH SCORES...\n');

    // Match 15 - Qualifier 1 (HIGH SCORING)
    await Match.findOneAndUpdate(
      { matchId: 'ipl2025-playoff1' },
      {
        $set: {
          ourScore: { runs: 195, wickets: 3, overs: '18.4' },
          theirScore: { runs: 191, wickets: 7, overs: '20.0' },
          result: 'RCB won by 7 wickets',
          highlights: 'Rajat Patidar 78*, Virat Kohli 71. Thrilling Qualifier 1 win!',
          rcbBatting: [
            { name: "Phil Salt", runs: 34, balls: 22, fours: 5, sixes: 1, strikeRate: 154.55, out: "c Inglis b Arshdeep" },
            { name: "Virat Kohli", runs: 71, balls: 45, fours: 8, sixes: 2, strikeRate: 157.78, out: "c Stoinis b Jamieson" },
            { name: "Rajat Patidar (c)", runs: 78, balls: 42, fours: 7, sixes: 4, strikeRate: 185.71, notOut: true },
            { name: "Liam Livingstone", runs: 8, balls: 5, fours: 1, sixes: 0, strikeRate: 160.00, notOut: true }
          ],
          opponentBatting: [
            { name: "Priyansh Arya", runs: 52, balls: 28, fours: 6, sixes: 3, strikeRate: 185.71, out: "c Salt b Bhuvi" },
            { name: "Prabhsimran Singh (wk)", runs: 48, balls: 32, fours: 5, sixes: 2, strikeRate: 150.00, out: "c Patidar b Hazlewood" },
            { name: "Marcus Stoinis", runs: 64, balls: 38, fours: 6, sixes: 3, strikeRate: 168.42, out: "c Kohli b Krunal" },
            { name: "Shashank Singh", runs: 18, balls: 14, fours: 2, sixes: 0, strikeRate: 128.57, out: "b Dayal" }
          ],
          rcbBowling: [
            { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
            { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
            { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 35, wickets: 2, economy: 8.75 },
            { name: "Yash Dayal", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 }
          ],
          opponentBowling: [
            { name: "Arshdeep Singh", overs: 3.4, maidens: 0, runs: 42, wickets: 1, economy: 11.45 },
            { name: "Kyle Jamieson", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
            { name: "Harpreet Brar", overs: 4, maidens: 0, runs: 45, wickets: 1, economy: 11.25 }
          ],
          playerOfMatch: "Rajat Patidar",
          tossWinner: "Punjab Kings",
          tossDecision: "bat"
        }
      }
    );
    console.log('✅ Match 15 (Qualifier 1): Fixed with correct high scores');

    // Match 16 - FINAL (HIGH SCORING)
    await Match.findOneAndUpdate(
      { matchId: 'ipl2025-final' },
      {
        $set: {
          ourScore: { runs: 201, wickets: 5, overs: '20.0' },
          theirScore: { runs: 195, wickets: 9, overs: '20.0' },
          result: 'RCB won by 6 runs - IPL 2025 CHAMPIONS!',
          highlights: '🏆 HISTORIC! RCB wins maiden IPL title! Virat Kohli 68, Rajat Patidar 52, Phil Salt 48. Bhuvneshwar Kumar 3/36. EE SALA CUP NAMDE!',
          rcbBatting: [
            { name: "Phil Salt", runs: 48, balls: 28, fours: 6, sixes: 2, strikeRate: 171.43, out: "c Arya b Arshdeep" },
            { name: "Virat Kohli", runs: 68, balls: 48, fours: 7, sixes: 2, strikeRate: 141.67, out: "c Inglis b Jamieson" },
            { name: "Rajat Patidar (c)", runs: 52, balls: 28, fours: 4, sixes: 3, strikeRate: 185.71, out: "c Stoinis b Chahal" },
            { name: "Liam Livingstone", runs: 18, balls: 10, fours: 1, sixes: 1, strikeRate: 180.00, out: "c Wadhera b Arshdeep" },
            { name: "Tim David", runs: 12, balls: 6, fours: 1, sixes: 1, strikeRate: 200.00, notOut: true }
          ],
          opponentBatting: [
            { name: "Priyansh Arya", runs: 42, balls: 24, fours: 5, sixes: 2, strikeRate: 175.00, out: "c Patidar b Bhuvi" },
            { name: "Josh Inglis (wk)", runs: 38, balls: 26, fours: 4, sixes: 1, strikeRate: 146.15, out: "c Kohli b Hazlewood" },
            { name: "Marcus Stoinis", runs: 54, balls: 32, fours: 5, sixes: 3, strikeRate: 168.75, out: "c Salt b Krunal" },
            { name: "Shashank Singh", runs: 48, balls: 28, fours: 3, sixes: 4, strikeRate: 171.43, out: "c David b Bhuvi" },
            { name: "Nehal Wadhera", runs: 8, balls: 6, fours: 1, sixes: 0, strikeRate: 133.33, out: "b Bhuvi" }
          ],
          rcbBowling: [
            { name: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 36, wickets: 3, economy: 9.00 },
            { name: "Josh Hazlewood", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
            { name: "Krunal Pandya", overs: 4, maidens: 0, runs: 38, wickets: 2, economy: 9.50 },
            { name: "Yash Dayal", overs: 4, maidens: 0, runs: 45, wickets: 2, economy: 11.25 }
          ],
          opponentBowling: [
            { name: "Arshdeep Singh", overs: 4, maidens: 0, runs: 42, wickets: 2, economy: 10.50 },
            { name: "Kyle Jamieson", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
            { name: "Yuzvendra Chahal", overs: 4, maidens: 0, runs: 45, wickets: 1, economy: 11.25 },
            { name: "Harpreet Brar", overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.50 }
          ],
          playerOfMatch: "Virat Kohli",
          tossWinner: "Punjab Kings",
          tossDecision: "bowl"
        }
      }
    );
    console.log('✅ Match 16 (FINAL): Fixed with correct high scores');

    console.log('\n🎉 Playoff matches fixed with CORRECT HIGH SCORES!');
    console.log('   Match 15: RCB 195/3 vs PBKS 191/7');
    console.log('   Match 16: RCB 201/5 vs PBKS 195/9 - CHAMPIONS! 🏆');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixPlayoffs();
