require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const IconicMoment = require('../models/IconicMoment');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcb_universe';

const iconicMoments = [
  // 1. RCB Trophy 2025 - Championship Win
  {
    momentId: "rcb-ipl-2025-champions",
    title: "RCB Wins Maiden IPL Title - 2025 Champions!",
    shortTitle: "IPL 2025 Champions",
    description: "After 18 years of heartbreak and near-misses, Royal Challengers Bengaluru finally lifted their maiden IPL trophy in 2025. In a thrilling final against Punjab Kings at the Narendra Modi Stadium, Ahmedabad, RCB defended 190 runs to win by 6 runs. Krunal Pandya's brilliant spell of 2/17 in 4 overs proved to be the match-winner. The entire RCB squad and millions of fans erupted in joy as captain Rajat Patidar lifted the trophy. 'Ee Sala Cup Namde' finally came true!",
    date: new Date("2025-06-03T22:30:00.000Z"),
    season: "IPL 2025",
    category: "championship",
    opponent: "Punjab Kings",
    venue: "Narendra Modi Stadium, Ahmedabad",
    stats: {
      "RCB Score": "190/9",
      "PBKS Score": "184/7",
      "Margin": "6 runs",
      "Player of Match": "Krunal Pandya",
      "Best Bowling": "2/17",
      "Years Waited": "18"
    },
    highlights: [
      "RCB's first-ever IPL title after 18 years",
      "Krunal Pandya's match-winning spell of 2/17",
      "Virat Kohli scored crucial 43 runs",
      "Shashank Singh's valiant 61* in vain for PBKS",
      "Rajat Patidar lifted the trophy as captain",
      "Historic moment for RCB franchise and fans worldwide"
    ],
    images: [{
      path: "/images/moments/rcb-trophy-2025.jpg",
      caption: "RCB players celebrating with the IPL 2025 trophy",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.espncricinfo.com/series/ipl-2025",
    impactScore: 10,
    isFeatured: true,
    isChampionship: true,
    tags: ["championship", "trophy", "2025", "final", "maiden-title"]
  },

  // 2. Virat Kohli 2016 Season
  {
    momentId: "kohli-2016-record-season",
    title: "Virat Kohli's Record-Breaking 2016 Season - 973 Runs",
    shortTitle: "Kohli's 973 Runs",
    description: "The greatest individual season in IPL history! Virat Kohli was unstoppable in IPL 2016, scoring a phenomenal 973 runs in just 16 matches at an average of 81.08 and strike rate of 152.03. He smashed 4 centuries including a breathtaking 113 off 50 balls against KXIP. Despite RCB finishing runners-up, Kohli's batting masterclass remains unmatched. He won the Orange Cap and was the undisputed king of IPL 2016.",
    date: new Date("2016-05-29T19:30:00.000Z"),
    season: "IPL 2016",
    category: "batting",
    opponent: "Various",
    venue: "Various",
    stats: {
      "Total Runs": "973",
      "Matches": "16",
      "Average": "81.08",
      "Strike Rate": "152.03",
      "Centuries": "4",
      "Fifties": "7"
    },
    highlights: [
      "Highest runs in a single IPL season (973 runs)",
      "4 centuries - most by any player in one season",
      "7 fifties including multiple match-winning knocks",
      "Average of 81.08 - highest for 900+ runs",
      "113 off 50 balls vs KXIP - fastest IPL century by an Indian",
      "Orange Cap winner with record margin"
    ],
    images: [{
      path: "/images/moments/kohli-2016.jpg",
      caption: "Virat Kohli in his record-breaking 2016 season",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.iplt20.com/stats/2016",
    impactScore: 10,
    isFeatured: true,
    isChampionship: false,
    tags: ["batting", "kohli", "2016", "record", "orange-cap"]
  },

  // 3. Chris Gayle 175* - Highest IPL Score
  {
    momentId: "gayle-175-vs-pwi",
    title: "Chris Gayle's Unbelievable 175* - Highest IPL Score Ever",
    shortTitle: "Gayle's 175*",
    description: "The Universe Boss created history on April 23, 2013, at the M.Chinnaswamy Stadium. Chris Gayle demolished Pune Warriors India with an unbeaten 175 off just 66 balls - the highest individual score in IPL history. He smashed 13 fours and a record 17 sixes, reaching his century in just 30 balls (fastest IPL hundred). RCB posted a mammoth 263/5, the highest team total in IPL at that time. Gayle's innings remains the most destructive batting display ever witnessed in T20 cricket.",
    date: new Date("2013-04-23T20:00:00.000Z"),
    season: "IPL 2013",
    category: "batting",
    opponent: "Pune Warriors India",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    stats: {
      "Runs": "175*",
      "Balls": "66",
      "Strike Rate": "265.15",
      "Fours": "13",
      "Sixes": "17",
      "Century": "30 balls"
    },
    highlights: [
      "Highest individual score in IPL history (175*)",
      "Fastest IPL century - 30 balls",
      "17 sixes - most in an IPL innings",
      "Strike rate of 265.15",
      "RCB scored 263/5 - then highest IPL total",
      "Won by 130 runs - one of the biggest margins"
    ],
    images: [{
      path: "/images/moments/gayle-175.jpg",
      caption: "Chris Gayle's record-breaking 175* against PWI",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.espncricinfo.com/series/ipl-2013",
    impactScore: 10,
    isFeatured: true,
    isChampionship: false,
    tags: ["batting", "gayle", "record", "175", "fastest-century"]
  },

  // 4. AB de Villiers - Mr. 360
  {
    momentId: "ab-devilliers-360-legend",
    title: "AB de Villiers - The 360° Superman of RCB",
    shortTitle: "AB - Mr. 360",
    description: "Abraham Benjamin de Villiers, fondly known as AB or Mr. 360, redefined batting for RCB from 2011-2021. His ability to hit the ball to any part of the ground with unorthodox shots made him a fan favorite. AB scored 5162 runs for RCB in 156 matches at a strike rate of 173.41. His partnerships with Virat Kohli, especially in IPL 2016, are legendary. From his 129* off 52 balls vs Gujarat Lions to countless match-winning knocks, AB remains RCB's most beloved overseas player.",
    date: new Date("2021-10-08T19:30:00.000Z"),
    season: "2011-2021",
    category: "batting",
    opponent: "Various",
    venue: "Various",
    stats: {
      "Total Runs": "5162",
      "Matches": "156",
      "Average": "39.71",
      "Strike Rate": "173.41",
      "Fifties": "38",
      "Highest": "133*"
    },
    highlights: [
      "5162 runs for RCB - 2nd highest for franchise",
      "Strike rate of 173.41 - highest for 5000+ runs",
      "38 fifties including multiple match-winners",
      "Iconic 360° shots and innovative batting",
      "Legendary partnerships with Virat Kohli",
      "Most loved overseas player in RCB history"
    ],
    images: [{
      path: "/images/moments/ab-devilliers.jpg",
      caption: "AB de Villiers - RCB's Mr. 360",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.iplt20.com/teams/royal-challengers-bangalore",
    impactScore: 10,
    isFeatured: true,
    isChampionship: false,
    tags: ["batting", "ab-devilliers", "360", "legend"]
  },

  // 5. Virat-AB Partnership
  {
    momentId: "virat-ab-partnership-229",
    title: "Virat Kohli & AB de Villiers - Record 229 Run Partnership",
    shortTitle: "Kohli-AB 229 Partnership",
    description: "On May 14, 2016, Virat Kohli and AB de Villiers produced the highest partnership in IPL history - an unbeaten 229 runs for the 2nd wicket against Gujarat Lions. Kohli scored 109 off 55 balls while AB smashed 129* off 52 balls. RCB chased down 159 in just 15.1 overs, winning by 9 wickets. The duo's chemistry and destructive batting made them the most feared partnership in IPL. Together, they scored 3000+ runs for RCB.",
    date: new Date("2016-05-14T20:00:00.000Z"),
    season: "IPL 2016",
    category: "partnership",
    opponent: "Gujarat Lions",
    venue: "M.Chinnaswamy Stadium, Bengaluru",
    stats: {
      "Partnership": "229*",
      "Kohli": "109 (55)",
      "AB": "129* (52)",
      "Target": "159",
      "Overs": "15.1",
      "Margin": "9 wickets"
    },
    highlights: [
      "Highest partnership in IPL history (229*)",
      "Both scored centuries in same innings",
      "Chased 159 in just 15.1 overs",
      "Kohli's 109 off 55 balls",
      "AB's unbeaten 129 off 52 balls",
      "Most iconic partnership in RCB history"
    ],
    images: [{
      path: "/images/moments/virat-ab-partnership.jpg",
      caption: "Virat Kohli and AB de Villiers - Record 229 partnership",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.espncricinfo.com/series/ipl-2016",
    impactScore: 10,
    isFeatured: true,
    isChampionship: false,
    tags: ["partnership", "kohli", "ab", "record", "2016"]
  },

  // 6. RCB 2025 Historic Chase
  {
    momentId: "rcb-2025-historic-chase",
    title: "RCB's Historic Chase - 230 in 18.4 Overs vs LSG",
    shortTitle: "230 Chase vs LSG",
    description: "On May 9, 2025, RCB produced one of the greatest chases in IPL history. Chasing 228 against Lucknow Super Giants at Ekana Stadium, RCB reached 230/4 in just 18.4 overs. Jitesh Sharma's blistering 85* off 33 balls (8 fours, 6 sixes) and Virat Kohli's 54 off 30 balls powered the chase. Despite Rishabh Pant's magnificent 118* for LSG, RCB's batting firepower proved too strong. This chase showcased RCB's championship mentality in IPL 2025.",
    date: new Date("2025-05-09T19:30:00.000Z"),
    season: "IPL 2025",
    category: "team",
    opponent: "Lucknow Super Giants",
    venue: "Ekana Cricket Stadium, Lucknow",
    stats: {
      "Target": "228",
      "RCB Score": "230/4",
      "Overs": "18.4",
      "Jitesh": "85* (33)",
      "Kohli": "54 (30)",
      "Margin": "6 wickets"
    },
    highlights: [
      "Chased 228 in just 18.4 overs",
      "Jitesh Sharma's explosive 85* off 33 balls",
      "Virat Kohli's crucial 54 off 30 balls",
      "Won by 6 wickets with 8 balls to spare",
      "One of highest successful chases in IPL 2025",
      "Showcased RCB's championship-winning form"
    ],
    images: [{
      path: "/images/moments/rcb-2025-chase.jpg",
      caption: "RCB celebrating historic chase against LSG",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.espncricinfo.com/series/ipl-2025",
    impactScore: 9,
    isFeatured: true,
    isChampionship: false,
    tags: ["chase", "2025", "team", "jitesh-sharma"]
  },

  // 7. RCB Fans - 12th Man
  {
    momentId: "rcb-fans-12th-man",
    title: "RCB Fans - The Unbreakable 12th Man",
    shortTitle: "RCB Fans",
    description: "Through 18 years of heartbreaks, near-misses, and disappointments, RCB fans never gave up. From filling the M.Chinnaswamy Stadium with a sea of red and gold to traveling across India to support their team, RCB fans are the most passionate in IPL. The 'Ee Sala Cup Namde' chant became a symbol of hope and belief. In 2025, when RCB finally won the trophy, it was a victory for millions of fans who stood by the team through thick and thin. The 12th man finally got their reward!",
    date: new Date("2025-06-03T22:30:00.000Z"),
    season: "2008-2025",
    category: "fans",
    opponent: "N/A",
    venue: "Everywhere",
    stats: {
      "Years": "18",
      "Fans": "Millions",
      "Home": "Chinnaswamy",
      "Chant": "Ee Sala Cup Namde",
      "Trophy": "2025",
      "Loyalty": "Unbreakable"
    },
    highlights: [
      "18 years of unwavering support",
      "Filled stadiums across India in red and gold",
      "'Ee Sala Cup Namde' - iconic chant",
      "Most passionate fanbase in IPL",
      "Never gave up despite heartbreaks",
      "Finally celebrated maiden title in 2025"
    ],
    images: [{
      path: "/images/moments/rcb-fans.jpg",
      caption: "RCB fans - The passionate 12th man",
      isHero: true
    }],
    videoUrl: "https://www.youtube.com/watch?v=example",
    sourceUrl: "https://www.royalchallengers.com/fans",
    impactScore: 10,
    isFeatured: true,
    isChampionship: false,
    tags: ["fans", "support", "12th-man", "ee-sala-cup-namde"]
  }
];

// Connect and seed
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    console.log('📸 Seeding Iconic Moments...\n');
    
    // Clear existing moments
    await IconicMoment.deleteMany({});
    console.log('🗑️  Cleared existing moments\n');
    
    // Insert new moments
    await IconicMoment.insertMany(iconicMoments);
    
    console.log('✅ Successfully seeded iconic moments!\n');
    console.log('📊 Moments added:');
    iconicMoments.forEach((m, i) => {
      console.log(`${i + 1}. ${m.title}`);
    });
    
    console.log('\n🎉 All 7 iconic moments with images are ready!');
    console.log('👉 Go to Iconic Moments page to see them!');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
