import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { getUpcomingMatches, getNews } from '../services/api';

const Home = () => {
  const [nextMatch, setNextMatch] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [matchesRes, newsRes] = await Promise.all([
        getUpcomingMatches(),
        getNews()
      ]);
      
      if (matchesRes.success && matchesRes.data.length > 0) {
        setNextMatch(matchesRes.data[0]);
      }
      
      if (newsRes.success) {
        setNews(newsRes.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!nextMatch) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const matchDate = new Date(nextMatch.date).getTime();
      const distance = matchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextMatch]);

  const features = [
    { icon: Users, title: 'Team Squad', desc: 'Meet the RCB warriors', link: '/squad' },
    { icon: Calendar, title: 'Matches', desc: 'Schedule & live scores', link: '/matches' },
    { icon: TrendingUp, title: 'Statistics', desc: 'Performance analytics', link: '/statistics' },
    { icon: Trophy, title: 'Fan Zone', desc: 'Polls & community', link: '/fan-zone' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-rcb-red/20 to-black">
          {/* Radial Gradient Overlays */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-rcb-red/20 via-transparent to-transparent"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-rcb-red/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-rcb-gold/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rcb-red/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Diagonal Stripes */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-2 bg-rcb-gold transform -rotate-12 origin-top-left" style={{width: '150%'}}></div>
            <div className="absolute top-20 left-0 w-full h-2 bg-rcb-red transform -rotate-12 origin-top-left" style={{width: '150%'}}></div>
            <div className="absolute top-40 left-0 w-full h-2 bg-rcb-gold transform -rotate-12 origin-top-left" style={{width: '150%'}}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* RCB Logo */}
            <div className="flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64">
                <img 
                  src="/images/rcb-logo.jpg" 
                  alt="RCB Logo" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              <span className="text-rcb-red">EE SALA CUP</span>{' '}
              <span className="text-rcb-gold">NAMDE!</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-semibold">
              The Ultimate Fan Hub for Royal Challengers Bengaluru
            </p>

            {/* Countdown Timer */}
            {nextMatch && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto mb-8"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Next Match: RCB vs {nextMatch.opponent}
                </h3>
                <p className="text-gray-400 mb-6">{nextMatch.venue}</p>
                
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="bg-rcb-red/20 rounded-lg p-4">
                      <div className="text-4xl md:text-5xl font-bold text-rcb-gold">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-400 uppercase mt-2">{unit}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/squad" 
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
              >
                <Users size={20} />
                Explore Squad
              </Link>
              <Link 
                to="/matches" 
                className="btn-secondary inline-flex items-center gap-2 px-8 py-3 text-base"
              >
                <Calendar size={20} />
                View Matches
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Explore RCB Universe
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={feature.link} className="block h-full">
                  <div className="card h-full hover:border-rcb-red/40 transition-all duration-300">
                    <div className="w-16 h-16 bg-rcb-red/20 rounded-full flex items-center justify-center mb-4">
                      <feature.icon size={32} className="text-rcb-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.desc}</p>
                    <div className="flex items-center text-rcb-gold">
                      <span className="font-semibold">Explore</span>
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 bg-rcb-lightGray">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Latest News</h2>
            <Link to="/news" className="text-rcb-gold hover:text-rcb-gold/80 flex items-center">
              View All <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="card h-full flex flex-col hover:border-rcb-gold/40 transition-all duration-300">
                  <div className="h-48 bg-rcb-red/10 rounded-lg mb-4 flex items-center justify-center flex-shrink-0">
                    <span className="text-5xl">📰</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">{article.summary}</p>
                  <div className="flex justify-between items-center text-sm mt-auto">
                    <span className="text-rcb-gold font-semibold">{article.source}</span>
                    <span className="text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Join the RCB Family
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with fellow fans, participate in polls, and show your support for RCB!
            </p>
            <Link to="/fan-zone" className="btn-primary text-lg">
              Enter Fan Zone
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
