import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Heart, Award, Target, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [iconicMoments, setIconicMoments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIconicMoments();
  }, []);

  const fetchIconicMoments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/iconic-moments');
      const data = await response.json();
      
      // Available moment images
      const momentImages = [
        '/images/moments/gayle-175.jpg',
        '/images/moments/kohli-2016.jpg',
        '/images/moments/ab-devilliers.jpg',
        '/images/moments/virat-ab-partnership.jpg',
        '/images/moments/rcb-trophy-2025.jpg',
        '/images/moments/rcb-2025-chase.jpg',
        '/images/moments/rcb-fans.jpg',
        '/images/moments/gayle-175.jpg' // Repeat for 8th
      ];
      
      if (data.success) {
        // Get top 8 moments sorted by impact score
        const topMoments = data.data
          .sort((a, b) => b.impactScore - a.impactScore)
          .slice(0, 8)
          .map((moment, index) => ({
            ...moment,
            displayImage: momentImages[index]
          }));
        setIconicMoments(topMoments);
      }
    } catch (error) {
      console.error('Error fetching iconic moments:', error);
    }
  };

  const achievements = [
    { year: '2009', title: 'Runners-up', desc: 'First IPL Final appearance' },
    { year: '2011', title: 'Runners-up', desc: 'Second consecutive final' },
    { year: '2016', title: 'Runners-up', desc: 'Best season performance' },
    { year: '2025', title: 'Ee Sala Cup Namde!', desc: 'This is our year!' }
  ];

  const legends = [
    { name: 'Virat Kohli', role: 'Captain & Batsman', desc: 'RCB\'s highest run-scorer and heart of the team' },
    { name: 'AB de Villiers', role: 'Batsman', desc: 'Mr. 360 - The most innovative batsman' },
    { name: 'Chris Gayle', role: 'Batsman', desc: 'Universe Boss - Destructive opener' },
    { name: 'Anil Kumble', role: 'Captain & Bowler', desc: 'Legendary spinner and former captain' }
  ];

  const funFacts = [
    '🏏 RCB has never won the IPL trophy (yet!)',
    '🔴 Team colors: Red and Gold representing passion and royalty',
    '🏟️ Home ground: M. Chinnaswamy Stadium, Bengaluru',
    '👥 Largest fan base in IPL with millions of supporters',
    '📊 Highest team total in IPL: 263/5 vs Pune Warriors (2013)',
    '⚡ Most sixes in IPL history by a team'
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            About RCB
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Royal Challengers Bengaluru - A legacy of passion, entertainment, and never-give-up spirit
          </p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 md:p-12 mb-16 text-center bg-black/40"
        >
          <div className="mb-6 flex justify-center">
            <img 
              src="/images/rcb-logo.jpg" 
              alt="RCB Logo" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="text-6xl">🏏</div>';
              }}
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Royal Challengers Story
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded in 2008, Royal Challengers Bengaluru has been one of the most exciting and 
            entertaining teams in the Indian Premier League. Known for our aggressive batting, 
            passionate fan base, and the iconic "Ee Sala Cup Namde" (This year, the cup is ours) 
            slogan, RCB represents the spirit of never giving up. With legends like Virat Kohli, 
            AB de Villiers, and Chris Gayle, we've created countless memorable moments in IPL history.
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="card hover-glow text-center">
            <Calendar className="mx-auto mb-4 text-rcb-gold" size={48} />
            <h3 className="text-4xl font-bold text-white mb-2">2008</h3>
            <p className="text-gray-400">Founded</p>
          </div>
          <div className="card hover-glow text-center">
            <Trophy className="mx-auto mb-4 text-rcb-gold" size={48} />
            <h3 className="text-4xl font-bold text-white mb-2">3</h3>
            <p className="text-gray-400">IPL Finals</p>
          </div>
          <div className="card hover-glow text-center">
            <Users className="mx-auto mb-4 text-rcb-gold" size={48} />
            <h3 className="text-4xl font-bold text-white mb-2">Millions</h3>
            <p className="text-gray-400">Fans Worldwide</p>
          </div>
        </motion.div>

        {/* Achievements Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Award className="text-rcb-gold" />
            Journey & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card hover-glow"
              >
                <div className="text-4xl font-bold text-rcb-gold mb-3">{achievement.year}</div>
                <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-400">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legends */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Heart className="text-rcb-red" />
            RCB Legends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legends.map((legend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-rcb-red rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {legend.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{legend.name}</h3>
                    <p className="text-rcb-gold text-sm mb-2">{legend.role}</p>
                    <p className="text-gray-400">{legend.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Target className="text-rcb-gold" />
            Did You Know?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="bg-rcb-lightGray rounded-lg p-6 hover:bg-rcb-red/10 transition-colors"
              >
                <p className="text-white text-lg">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Anthem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-effect rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">RCB Anthem</h2>
          <div className="aspect-video bg-gradient-to-br from-rcb-red/20 to-rcb-gold/20 rounded-xl overflow-hidden relative group cursor-pointer mb-6">
            <img 
              src="/images/rcb-anthem.jpg" 
              alt="RCB Anthem" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full"><div class="text-center"><div class="text-6xl mb-4">🎵</div><p class="text-gray-400">RCB Anthem</p></div></div>';
              }}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <a 
                href="https://youtu.be/9TUPVMWhpvk?si=JB11D_65tiTQ7NUf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 bg-rcb-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl"
              >
                <Play size={36} className="text-white ml-1" fill="white" />
              </a>
            </div>
          </div>
          <a 
            href="https://youtu.be/9TUPVMWhpvk?si=JB11D_65tiTQ7NUf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 mb-4"
          >
            <Play size={20} />
            Watch RCB Anthem
          </a>
          <p className="text-xl text-rcb-gold font-bold mb-4">
            "Ee Sala Cup Namde!"
          </p>
          <p className="text-gray-400">
            Our battle cry that echoes through stadiums and unites millions of fans
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Iconic Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {iconicMoments.length > 0 ? (
              iconicMoments.map((moment, index) => (
                <motion.div
                  key={moment._id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.05 }}
                  onClick={() => navigate('/iconic-moments')}
                  className="aspect-square bg-gradient-to-br from-rcb-red/20 to-rcb-gold/20 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group relative"
                >
                  <img 
                    src={moment.displayImage} 
                    alt={moment.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Fallback to a gradient background with emoji
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      parent.style.background = 'linear-gradient(135deg, #dc2626 0%, #fbbf24 100%)';
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">📸</div>';
                    }}
                  />
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-semibold line-clamp-2">{moment.title}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div 
                  key={item} 
                  onClick={() => navigate('/iconic-moments')}
                  className="aspect-square bg-gradient-to-br from-rcb-red/20 to-rcb-gold/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-4xl">📸</span>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/iconic-moments')}
              className="btn-primary"
            >
              View All Iconic Moments
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
