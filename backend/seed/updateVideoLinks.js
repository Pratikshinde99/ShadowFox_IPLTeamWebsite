const mongoose = require('mongoose');
const IconicMoment = require('../models/IconicMoment');
require('dotenv').config();

const updateVideoLinks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rcb_universe');
    console.log('Connected to MongoDB');

    const updates = [
      {
        momentId: 'rcb-ipl-2025-champions',
        videoUrl: 'https://www.iplt20.com/video/63960'
      },
      {
        momentId: 'rcb-fans-12th-man',
        videoUrl: 'https://www.youtube.com/playlist?list=PLyn3ph7Iw4XBH9bKZ0jf3-YIp-N84leUk'
      },
      {
        momentId: 'ab-devilliers-360-legend',
        videoUrl: 'https://www.iplt20.com/video/139234/spiderman-superman-ab-man'
      },
      {
        momentId: 'kohli-2016-record-season',
        videoUrl: 'https://www.iplt20.com/stats/2016'
      },
      {
        momentId: 'virat-ab-partnership-229',
        videoUrl: 'https://www.youtube.com/watch?v=pi9Mfb5bVCY'
      },
      {
        momentId: 'gayle-175-vs-pwi',
        videoUrl: 'https://www.youtube.com/watch?v=jX6CKPkZOQo'
      },
      {
        momentId: 'rcb-2025-historic-chase',
        videoUrl: 'https://www.hotstar.com/in/sports/cricket/lsg-vs-rcb-highlights/1540043320/video/highlights/watch'
      }
    ];

    for (const update of updates) {
      const result = await IconicMoment.updateOne(
        { momentId: update.momentId },
        { $set: { videoUrl: update.videoUrl } }
      );
      console.log(`✓ Updated ${update.momentId}: ${result.modifiedCount} document(s) modified`);
    }

    console.log('\n✅ All video links updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating video links:', error);
    process.exit(1);
  }
};

updateVideoLinks();
