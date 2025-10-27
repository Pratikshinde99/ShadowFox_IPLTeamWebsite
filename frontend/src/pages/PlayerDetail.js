import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Target, Trophy, Star, FileText, Calendar } from 'lucide-react';
import Scorecard from '../components/Scorecard';

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
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

  // Sample recent matches data - this would come from backend
  const getRecentMatches = () => {
    return [
      {
        _id: '1',
        matchNumber: 1,
        opponent: 'Mumbai Indians',
        venue: 'M. Chinnaswamy Stadium',
        date: '2025-03-22',
        status: 'Completed',
        scores: {
          rcb: { runs: 178, wickets: 4, overs: 20 },
          opponent: { runs: 165, wickets: 8, overs: 20 }
        },
        result: { winner: 'RCB', summary: 'RCB won by 13 runs' },
        playerPerformance: {
          runs: 45,
          balls: 32,
          fours: 4,
          sixes: 2,
          wickets: 0,
          economy: 0
        }
      },
      {
        _id: '2',
        matchNumber: 2,
        opponent: 'Chennai Super Kings',
        venue: 'MA Chidambaram Stadium',
        date: '2025-03-25',
        status: 'Completed',
        scores: {
          rcb: { runs: 195, wickets: 5, overs: 20 },
          opponent: { runs: 188, wickets: 7, overs: 20 }
        },
        result: { winner: 'RCB', summary: 'RCB won by 7 runs' },
        playerPerformance: {
          runs: 62,
          balls: 38,
          fours: 6,
          sixes: 3,
          wickets: 0,
          economy: 0
        }
      },
      {
        _id: '3',
        matchNumber: 3,
        opponent: 'Kolkata Knight Riders',
        venue: 'Eden Gardens',
        date: '2025-03-28',
        status: 'Completed',
        scores: {
          rcb: { runs: 172, wickets: 6, overs: 20 },
          opponent: { runs: 175, wickets: 4, overs: 19.2 }
        },
        result: { winner: 'KKR', summary: 'KKR won by 6 wickets' },
        playerPerformance: {
          runs: 38,
          balls: 28,
          fours: 3,
          sixes: 2,
          wickets: 0,
          economy: 0
        }
      }
    ];
  };

  useEffect(() => {
    fetchPlayerDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPlayerDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/players/${id}`);
      const data = await response.json();
      if (data.success) {
        setPlayer(data.data);
      }
    } catch (error) {
      console.error('Error fetching player details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      'Batsman': 'bg-blue-500',
      'Bowler': 'bg-green-500',
      'All-Rounder': 'bg-purple-500',
      'Wicket-Keeper': 'bg-orange-500'
    };
    return colors[role] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-400">Player not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/squad')}
          className="flex items-center gap-2 text-rcb-gold hover:text-rcb-gold/80 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Squad</span>
        </motion.button>

        {/* Player Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Player Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-rcb-red/20 to-rcb-gold/20 rounded-lg flex items-center justify-center overflow-hidden border-2 border-rcb-red/30">
                {player.photo ? (
                  <img 
                    src={player.photo} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML += '<div class="text-9xl">👤</div>';
                    }}
                  />
                ) : (
                  <div className="text-9xl">👤</div>
                )}
                <div className={`absolute top-3 left-3 ${getRoleColor(player.role)} px-3 py-1 rounded-full text-xs font-bold`}>
                  {player.role}
                </div>
                <div className="absolute top-4 right-4 bg-rcb-black/80 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-rcb-gold">
                  {player.jerseyNumber}
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="md:col-span-2">
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">{player.name}</h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`${getRoleColor(player.role)} px-4 py-2 rounded-full text-sm font-bold`}>
                  {player.role}
                </span>
                <span className="px-4 py-2 bg-rcb-darkGray rounded-full text-sm font-semibold">
                  {player.nationality}
                </span>
                <span className="px-4 py-2 bg-rcb-gold/20 border border-rcb-gold rounded-full text-sm font-bold text-rcb-gold">
                  #{player.jerseyNumber}
                </span>
              </div>
              {player.bio && (
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{player.bio}</p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rcb-darkGray/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Batting Style</p>
                  <p className="text-white font-bold">{player.battingStyle}</p>
                </div>
                <div className="bg-rcb-darkGray/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Bowling Style</p>
                  <p className="text-white font-bold">{player.bowlingStyle}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* IPL 2025 Contribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-rcb-gold" size={28} />
            <h2 className="text-3xl font-bold">IPL 2025 Contribution</h2>
            <Star className="text-rcb-gold animate-pulse" size={24} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <StatCard label="Matches" value={player.ipl2025Contribution.matches} />
            <StatCard label="Runs" value={player.ipl2025Contribution.runs} />
            <StatCard label="Wickets" value={player.ipl2025Contribution.wickets} />
            <StatCard label="Strike Rate" value={player.ipl2025Contribution.strikeRate.toFixed(2)} />
            <StatCard label="Average" value={player.ipl2025Contribution.average.toFixed(2)} />
            <StatCard label="Economy" value={player.ipl2025Contribution.economy.toFixed(2)} />
            <StatCard label="Impact" value={player.ipl2025Contribution.impactRating.toFixed(1)} highlight />
          </div>
        </motion.div>

        {/* Career Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-rcb-gold" size={28} />
            <h2 className="text-3xl font-bold">Career Statistics</h2>
          </div>
          
          {/* Batting Stats */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-rcb-gold mb-4">Batting</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard label="Matches" value={player.stats.matches} />
              <StatCard label="Runs" value={player.stats.runs} />
              <StatCard label="Highest Score" value={player.stats.highestScore} />
              <StatCard label="Average" value={player.stats.average.toFixed(2)} />
              <StatCard label="Strike Rate" value={player.stats.strikeRate.toFixed(2)} />
              <StatCard label="Fifties" value={player.stats.fifties} />
              <StatCard label="Hundreds" value={player.stats.hundreds} />
              <StatCard label="Fours" value={player.stats.fours} />
              <StatCard label="Sixes" value={player.stats.sixes} />
            </div>
          </div>

          {/* Bowling Stats */}
          {player.stats.wickets > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-rcb-gold mb-4">Bowling</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <StatCard label="Wickets" value={player.stats.wickets} />
                <StatCard label="Best Bowling" value={player.stats.bestBowling} />
                <StatCard label="Economy" value={player.stats.economy.toFixed(2)} />
                <StatCard label="5W Hauls" value={player.stats.fiveWicketHauls} />
              </div>
            </div>
          )}

          {/* Fielding Stats */}
          {(player.stats.catches > 0 || player.stats.stumpings > 0) && (
            <div>
              <h3 className="text-xl font-bold text-rcb-gold mb-4">Fielding</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <StatCard label="Catches" value={player.stats.catches} />
                {player.stats.stumpings > 0 && (
                  <StatCard label="Stumpings" value={player.stats.stumpings} />
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Recent Matches with Scorecards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-rcb-gold" size={28} />
            <h2 className="text-3xl font-bold">Recent Matches</h2>
          </div>
          <div className="space-y-4">
            {getRecentMatches().map((match, index) => (
              <motion.div
                key={match._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-rcb-lightGray/50 border border-rcb-red/20 rounded-lg p-5 hover:border-rcb-gold/40 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">
                        RCB vs {match.opponent}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        match.result.winner === 'RCB' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {match.result.winner === 'RCB' ? 'WON' : 'LOST'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-rcb-darkGray/50 rounded p-3">
                        <div className="text-xs text-gray-400 mb-1">RCB</div>
                        <div className="text-lg font-bold text-rcb-gold">
                          {match.scores.rcb.runs}/{match.scores.rcb.wickets}
                          <span className="text-sm text-gray-400 ml-1">({match.scores.rcb.overs})</span>
                        </div>
                      </div>
                      <div className="bg-rcb-darkGray/50 rounded p-3">
                        <div className="text-xs text-gray-400 mb-1">{match.opponent}</div>
                        <div className="text-lg font-bold text-gray-300">
                          {match.scores.opponent.runs}/{match.scores.opponent.wickets}
                          <span className="text-sm text-gray-400 ml-1">({match.scores.opponent.overs})</span>
                        </div>
                      </div>
                    </div>

                    {/* Player Performance */}
                    <div className="bg-rcb-gold/10 border border-rcb-gold/30 rounded p-3">
                      <div className="text-xs text-rcb-gold font-semibold mb-2">Player Performance</div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {match.playerPerformance.runs > 0 && (
                          <div>
                            <span className="text-gray-400">Runs: </span>
                            <span className="text-white font-bold">{match.playerPerformance.runs} ({match.playerPerformance.balls})</span>
                          </div>
                        )}
                        {match.playerPerformance.fours > 0 && (
                          <div>
                            <span className="text-gray-400">4s: </span>
                            <span className="text-white font-bold">{match.playerPerformance.fours}</span>
                          </div>
                        )}
                        {match.playerPerformance.sixes > 0 && (
                          <div>
                            <span className="text-gray-400">6s: </span>
                            <span className="text-white font-bold">{match.playerPerformance.sixes}</span>
                          </div>
                        )}
                        {match.playerPerformance.wickets > 0 && (
                          <div>
                            <span className="text-gray-400">Wickets: </span>
                            <span className="text-white font-bold">{match.playerPerformance.wickets}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(match.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} • {match.venue}
                    </div>
                  </div>

                  <button
                    onClick={() => openScorecard(match)}
                    className="btn-primary flex items-center gap-2 whitespace-nowrap self-start lg:self-center"
                  >
                    <FileText size={18} />
                    View Scorecard
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Highlights */}
        {player.careerHighlights && player.careerHighlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-rcb-gold" size={28} />
              <h2 className="text-3xl font-bold">Career Highlights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {player.careerHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="card hover-glow"
                >
                  <div className="aspect-video bg-gradient-to-br from-rcb-red/20 to-rcb-gold/20 rounded-lg mb-4 flex items-center justify-center">
                    <Award size={48} className="text-rcb-gold" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{highlight.title}</h3>
                  <p className="text-gray-400 mb-3 leading-relaxed">{highlight.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-rcb-gold/20 border border-rcb-gold rounded-full text-rcb-gold font-bold text-sm">
                      {highlight.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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

const StatCard = ({ label, value, highlight }) => (
  <div className={`text-center p-4 rounded-lg transition-all duration-300 ${
    highlight 
      ? 'bg-gradient-to-br from-rcb-red/30 to-rcb-gold/30 border-2 border-rcb-gold shadow-lg shadow-rcb-gold/20' 
      : 'bg-rcb-darkGray/50 hover:bg-rcb-darkGray/70'
  }`}>
    <div className={`text-3xl font-bold mb-1 ${highlight ? 'text-rcb-gold' : 'text-white'}`}>
      {value}
    </div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

export default PlayerDetail;
