import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Play, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { getNews } from '../services/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await getNews();
      if (response.success) {
        setNews(response.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Latest News
          </h1>
          <p className="text-xl text-gray-400">
            Stay updated with RCB's latest happenings
          </p>
        </motion.div>

        {/* Featured News */}
        {news.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl overflow-hidden mb-12 hover-glow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="h-80 lg:h-auto bg-gradient-to-br from-rcb-red/30 to-rcb-gold/30 overflow-hidden flex items-center justify-center">
                <img 
                  src={news[0].image} 
                  alt={news[0].title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-8xl">📰</div>';
                  }}
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-rcb-gold" />
                  <span className="text-sm text-rcb-gold font-semibold">FEATURED</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {news[0].title}
                </h2>
                <p className="text-gray-400 mb-6 text-lg">
                  {news[0].summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(news[0].publishedAt).toLocaleDateString()}
                    </span>
                    <span>{news[0].source}</span>
                  </div>
                  <div className="flex gap-3">
                    {news[0].videoUrl && (
                      <a 
                        href={news[0].videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2"
                      >
                        <Play size={16} /> Watch Video
                      </a>
                    )}
                    <a 
                      href={news[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2"
                    >
                      Read More <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="card hover-glow group cursor-pointer"
            >
              {/* Image */}
              <div className="h-56 bg-gradient-to-br from-rcb-red/20 to-rcb-gold/20 rounded-lg mb-4 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-6xl">📰</div>';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {article.category && (
                  <div className="absolute top-3 left-3 bg-rcb-gold text-rcb-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {article.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-rcb-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {article.summary}
                </p>

                {/* Footer */}
                <div className="flex items-end justify-between pt-4 border-t border-rcb-red/20">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar size={14} />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="text-rcb-gold">{article.source}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    {article.videoUrl && (
                      <a 
                        href={article.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rcb-red hover:text-rcb-red/80"
                        title="Watch Video"
                      >
                        <Play size={18} />
                      </a>
                    )}
                    <a 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rcb-gold hover:text-rcb-gold/80 flex items-center gap-1"
                    >
                      Read <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Play className="text-rcb-gold" />
            Latest Videos & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.filter(n => n.videoUrl).slice(0, 3).map((video) => (
              <div key={video.id} className="glass-effect rounded-xl overflow-hidden hover-glow group flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-rcb-red/20 to-rcb-black overflow-hidden relative flex items-center justify-center">
                  <img 
                    src={video.image} 
                    alt={video.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-20 h-20 bg-rcb-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play size={36} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
                    {video.summary}
                  </p>
                  <a 
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full flex items-center justify-center gap-2 mt-auto"
                  >
                    <Play size={16} /> Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Media Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 glass-effect rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Follow RCB on Social Media</h2>
          <p className="text-gray-400 text-center mb-8">Get real-time updates, exclusive content, and behind-the-scenes access</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Twitter */}
            <a 
              href="https://twitter.com/RCBTweets"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rcb-darkGray rounded-lg p-6 text-center hover:bg-rcb-red/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#1DA1F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Twitter size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Twitter / X</h3>
              <p className="text-gray-400 text-sm mb-3">@RCBTweets</p>
              <div className="text-rcb-gold font-semibold">Follow Now →</div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/royalchallengers.bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rcb-darkGray rounded-lg p-6 text-center hover:bg-rcb-red/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instagram</h3>
              <p className="text-gray-400 text-sm mb-3">@royalchallengers.bengaluru</p>
              <div className="text-rcb-gold font-semibold">Follow Now →</div>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/RoyalChallengersBangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rcb-darkGray rounded-lg p-6 text-center hover:bg-rcb-red/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Facebook size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Facebook</h3>
              <p className="text-gray-400 text-sm mb-3">Royal Challengers Bangalore</p>
              <div className="text-rcb-gold font-semibold">Like Page →</div>
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@royalchallengersbengaluruYT"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rcb-darkGray rounded-lg p-6 text-center hover:bg-rcb-red/20 transition-colors group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Youtube size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">YouTube</h3>
              <p className="text-gray-400 text-sm mb-3">RCB Official</p>
              <div className="text-rcb-gold font-semibold">Subscribe →</div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default News;
