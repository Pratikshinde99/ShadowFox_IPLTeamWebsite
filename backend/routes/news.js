const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

// Cache for 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

// RCB IPL 2025 News Data
const mockNews = [
  {
    id: 1,
    title: 'RCB Wins Maiden IPL Title - Champions 2025!',
    summary: 'After 18 years of wait, Royal Challengers Bengaluru finally lift the IPL trophy! RCB defeated Punjab Kings by 6 runs in a thrilling final at Ahmedabad. Krunal Pandya\'s brilliant bowling (2/17) sealed the historic victory. Ee Sala Cup Namde!',
    image: '/images/news/rcb-trophy-celebration.jpg',
    source: 'IPL Official',
    publishedAt: new Date('2025-06-03').toISOString(),
    url: 'https://www.iplt20.com/news/rcb-champions-2025',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT',
    category: 'Championship'
  },
  {
    id: 2,
    title: 'Historic Final: RCB 190/9 vs PBKS 184/7',
    summary: 'Relive the epic IPL 2025 final where RCB defended 190 runs against Punjab Kings. Virat Kohli\'s 43 and Jitesh Sharma\'s 24 set up the total. Watch full match highlights and celebration moments.',
    image: '/images/news/final-match-2025.jpg',
    source: 'ESPN Cricinfo',
    publishedAt: new Date('2025-06-03').toISOString(),
    url: 'https://www.espncricinfo.com/series/ipl-2025-final',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Match Highlights'
  },
  {
    id: 3,
    title: 'Virat Kohli: "This is for all RCB fans"',
    summary: 'Emotional Virat Kohli dedicates IPL 2025 title to millions of RCB fans who waited 18 years. "We never gave up, and neither did our fans. This trophy belongs to them," says King Kohli.',
    image: '/images/news/virat-kohli-2025.jpg',
    source: 'Cricbuzz',
    publishedAt: new Date('2025-06-04').toISOString(),
    url: 'https://www.cricbuzz.com/cricket-news/virat-kohli-rcb-champions',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Interview'
  },
  {
    id: 4,
    title: 'RCB Dominates Playoff 1: Beats PBKS by 8 Wickets',
    summary: 'Suyash Sharma\'s magical spell (3/17) and Phil Salt\'s unbeaten 56 powered RCB to a commanding 8-wicket victory in Qualifier 1. RCB directly qualified for the final with this win.',
    image: '/images/news/playoff-victory.jpg',
    source: 'IPL Official',
    publishedAt: new Date('2025-05-29').toISOString(),
    url: 'https://www.iplt20.com/news/rcb-playoff-victory',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Playoffs'
  },
  {
    id: 5,
    title: 'Jitesh Sharma\'s Explosive 85* Powers Historic Chase',
    summary: 'RCB chased down 228 against LSG in just 18.4 overs! Jitesh Sharma smashed 85* off 33 balls with 8 fours and 6 sixes. One of the greatest chases in IPL history.',
    image: '/images/news/match-action.jpg',
    source: 'ESPN Cricinfo',
    publishedAt: new Date('2025-05-09').toISOString(),
    url: 'https://www.espncricinfo.com/series/ipl-2025-match-12',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Match Highlights'
  },
  {
    id: 6,
    title: 'RCB Fans Celebrate Across India - Ee Sala Cup Namde!',
    summary: 'Millions of RCB fans erupted in joy as their team finally won the IPL trophy. From Bengaluru to Mumbai, celebrations lit up cities across India. The 18-year wait is finally over!',
    image: '/images/news/rcb-fans-celebration.jpg',
    source: 'Times of India',
    publishedAt: new Date('2025-06-04').toISOString(),
    url: 'https://timesofindia.indiatimes.com/sports/cricket/ipl/rcb-fans-celebrate',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Fans'
  },
  {
    id: 7,
    title: 'RCB Squad 2025: Perfect Balance of Youth and Experience',
    summary: 'Royal Challengers Bengaluru unveiled their championship-winning squad for IPL 2025. With Virat Kohli, Phil Salt, Josh Hazlewood, and exciting youngsters, RCB had the perfect mix.',
    image: '/images/news/rcb-squad-2025.jpg',
    source: 'Cricbuzz',
    publishedAt: new Date('2025-03-15').toISOString(),
    url: 'https://www.cricbuzz.com/cricket-news/rcb-squad-2025',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Squad'
  },
  {
    id: 8,
    title: 'Josh Hazlewood: The Match-Winner for RCB',
    summary: 'Australian pacer Josh Hazlewood was RCB\'s go-to bowler in IPL 2025. His 4-wicket haul against RR and crucial spells in playoffs made him invaluable to the championship win.',
    image: '/images/news/new-players-2025.jpg',
    source: 'ESPN Cricinfo',
    publishedAt: new Date('2025-05-20').toISOString(),
    url: 'https://www.espncricinfo.com/story/josh-hazlewood-rcb-2025',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Player Focus'
  },
  {
    id: 9,
    title: 'Behind the Scenes: RCB Training Camp 2025',
    summary: 'Go inside RCB\'s intensive training sessions at M.Chinnaswamy Stadium. Watch how the team prepared for their historic IPL 2025 campaign with fitness drills, net sessions, and team bonding.',
    image: '/images/news/rcb-training.jpg',
    source: 'RCB Official',
    publishedAt: new Date('2025-03-20').toISOString(),
    url: 'https://www.royalchallengers.com/training-2025',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Training'
  },
  {
    id: 10,
    title: 'Team Spirit: The Secret Behind RCB\'s Success',
    summary: 'Captain Rajat Patidar reveals how team unity and positive mindset led RCB to their maiden IPL title. "We believed in each other and played as one unit," says the champion captain.',
    image: '/images/news/team-huddle.jpg',
    source: 'Cricbuzz',
    publishedAt: new Date('2025-06-05').toISOString(),
    url: 'https://www.cricbuzz.com/cricket-news/rcb-team-spirit-2025',
    videoUrl: 'https://www.youtube.com/@royalchallengersbengaluruYT/videos',
    category: 'Team'
  }
];

// Get latest news
router.get('/', async (req, res) => {
  try {
    // Check cache first
    const cachedNews = cache.get('rcb_news');
    if (cachedNews) {
      return res.json({ success: true, data: cachedNews, cached: true });
    }
    
    // In production, integrate with actual cricket news API
    // For now, return mock data
    const news = mockNews;
    
    // Cache the results
    cache.set('rcb_news', news);
    
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single news article
router.get('/:id', async (req, res) => {
  try {
    const article = mockNews.find(n => n.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
