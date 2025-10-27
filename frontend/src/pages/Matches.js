import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, TrendingUp, FileText } from 'lucide-react';
import { getMatches } from '../services/api';
import Scorecard from '../components/Scorecard';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scorecardOpen, setScorecardOpen] = useState(false);

  const openScorecard = (match) => {
    setSelectedMatch(match);
    setScorecardOpen(true);
  };

  const closeScorecard = () => {
    setScorecardOpen(false);
    setTimeout(() => setSelectedMatch(null), 300);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await getMatches();
      if (response.success) {
        setMatches(response.data);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = matches.filter(match => {
    if (filter === 'All') return true;
    return match.status === filter;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Upcoming': 'bg-blue-500',
      'Live': 'bg-green-500 animate-pulse',
      'Completed': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
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
            Match Schedule
          </h1>
          <p className="text-xl text-gray-400">
            IPL 2025 - Royal Challengers Bengaluru
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['All', 'Upcoming', 'Live', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === status
                  ? 'bg-rcb-red text-white'
                  : 'bg-rcb-lightGray text-gray-400 hover:bg-rcb-red/20'
              }`}
            >
              {status}
            </button>
          ))}
        </motion.div>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No matches found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => (match.status === 'Completed' || match.status === 'completed') && openScorecard(match)}
                className={`glass-effect rounded-xl p-6 hover-glow ${(match.status === 'Completed' || match.status === 'completed') ? 'cursor-pointer' : ''}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Match Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(match.status)}`}>
                        {match.status}
                      </span>
                      <span className="text-gray-400">Match #{match.matchNumber}</span>
                    </div>

                    {/* Teams */}
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        RCB vs {match.opponent}
                      </h3>
                      
                      {/* Scores for Completed/Live Matches */}
                      {match.status !== 'Upcoming' && match.scores && (
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between bg-rcb-darkGray rounded-lg p-3">
                            <span className="font-semibold text-white">RCB</span>
                            <span className="text-xl font-bold text-rcb-gold">
                              {match.scores.rcb?.runs}/{match.scores.rcb?.wickets} 
                              <span className="text-sm text-gray-400 ml-2">
                                ({match.scores.rcb?.overs} ov)
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-rcb-darkGray rounded-lg p-3">
                            <span className="font-semibold text-white">{match.opponent}</span>
                            <span className="text-xl font-bold text-gray-300">
                              {match.scores.opponent?.runs}/{match.scores.opponent?.wickets}
                              <span className="text-sm text-gray-400 ml-2">
                                ({match.scores.opponent?.overs} ov)
                              </span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Result */}
                      {match.status === 'completed' && match.result && (
                        <div className={`mt-4 p-3 rounded-lg bg-rcb-darkGray ${match.result.includes('Royal Challengers Bengaluru won') ? 'text-green-500' : 'text-red-500'}`}>
                          <div className="flex items-center gap-2">
                            <Trophy size={20} />
                            <span className="font-semibold">{match.result}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Match Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(match.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{match.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {match.status === 'Completed' || match.status === 'completed' ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openScorecard(match);
                        }}
                        className="btn-primary flex items-center gap-2 whitespace-nowrap"
                      >
                        <FileText size={20} />
                        View Scorecard
                      </button>
                    ) : null}
                    {match.status === 'Live' && (
                      <button className="btn-primary flex items-center gap-2">
                        <TrendingUp size={20} />
                        Live Updates
                      </button>
                    )}
                    {match.status === 'Completed' && match.highlights && (
                      <button className="btn-secondary">
                        View Highlights
                      </button>
                    )}
                    {match.status === 'Upcoming' && (
                      <button className="btn-secondary">
                        Set Reminder
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Scorecard Modal */}
      <Scorecard 
        match={selectedMatch}
        isOpen={scorecardOpen}
        onClose={closeScorecard}
      />
    </div>
  );
};

export default Matches;
