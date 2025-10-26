import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Target, TrendingUp, Award } from 'lucide-react';
import { getTeamStats, getTopBatsmen, getTopBowlers } from '../services/api';

const Statistics = () => {
  const [teamStats, setTeamStats] = useState(null);
  const [topBatsmen, setTopBatsmen] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [statsRes, batsmenRes, bowlersRes] = await Promise.all([
        getTeamStats(),
        getTopBatsmen(),
        getTopBowlers()
      ]);

      if (statsRes.success) setTeamStats(statsRes.data);
      if (batsmenRes.success) setTopBatsmen(batsmenRes.data);
      if (bowlersRes.success) setTopBowlers(bowlersRes.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
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

  const winLossData = teamStats ? [
    { name: 'Wins', value: teamStats.wins, color: '#22c55e' },
    { name: 'Losses', value: teamStats.losses, color: '#ef4444' }
  ] : [];

  const batsmenChartData = topBatsmen.map(player => ({
    name: player.name.split(' ').pop(),
    runs: player.stats.runs,
    strikeRate: player.stats.strikeRate
  }));

  const bowlersChartData = topBowlers.map(player => ({
    name: player.name.split(' ').pop(),
    wickets: player.stats.wickets,
    economy: player.stats.economy
  }));

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
            Team Statistics
          </h1>
          <p className="text-xl text-gray-400">
            IPL 2025 Performance Analytics
          </p>
        </motion.div>

        {/* Key Stats Cards */}
        {teamStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <div className="card hover-glow">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="text-rcb-gold" size={32} />
                <span className="text-3xl font-bold text-rcb-gold">{teamStats.wins}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Wins</h3>
              <p className="text-sm text-gray-400">Out of {teamStats.played} matches</p>
            </div>

            <div className="card hover-glow">
              <div className="flex items-center justify-between mb-4">
                <Target className="text-rcb-red" size={32} />
                <span className="text-3xl font-bold text-rcb-red">{teamStats.points}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Points</h3>
              <p className="text-sm text-gray-400">League standings</p>
            </div>

            <div className="card hover-glow">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="text-green-500" size={32} />
                <span className="text-3xl font-bold text-green-500">
                  {teamStats.winPercentage.toFixed(1)}%
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">Win Rate</h3>
              <p className="text-sm text-gray-400">Season average</p>
            </div>

            <div className="card hover-glow">
              <div className="flex items-center justify-between mb-4">
                <Award className="text-blue-500" size={32} />
                <span className={`text-3xl font-bold ${teamStats.nrr >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {teamStats.nrr >= 0 ? '+' : ''}{teamStats.nrr}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">Net Run Rate</h3>
              <p className="text-sm text-gray-400">Tournament NRR</p>
            </div>
          </motion.div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Win/Loss Pie Chart */}
          {teamStats && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Win/Loss Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={winLossData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #DA1212',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Team Performance Summary */}
          {teamStats && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Season Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-rcb-darkGray rounded-lg">
                  <span className="text-gray-400">Total Matches</span>
                  <span className="text-xl font-bold text-white">{teamStats.totalMatches}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-rcb-darkGray rounded-lg">
                  <span className="text-gray-400">Matches Played</span>
                  <span className="text-xl font-bold text-white">{teamStats.played}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-rcb-darkGray rounded-lg">
                  <span className="text-gray-400">Upcoming Matches</span>
                  <span className="text-xl font-bold text-white">{teamStats.upcomingMatches}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-rcb-darkGray rounded-lg">
                  <span className="text-gray-400">Season</span>
                  <span className="text-xl font-bold text-rcb-gold">{teamStats.season}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Top Batsmen Chart */}
        {topBatsmen.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Top Batsmen</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={batsmenChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #DA1212',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="runs" fill="#DA1212" name="Runs" />
                <Bar dataKey="strikeRate" fill="#FFD700" name="Strike Rate" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Top Bowlers Chart */}
        {topBowlers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Top Bowlers</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bowlersChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #DA1212',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="wickets" fill="#22c55e" name="Wickets" />
                <Bar dataKey="economy" fill="#3b82f6" name="Economy" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Player Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Batsmen List */}
          {topBatsmen.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Leading Run Scorers</h2>
              <div className="space-y-3">
                {topBatsmen.map((player, index) => (
                  <div key={player._id} className="flex items-center justify-between p-4 bg-rcb-darkGray rounded-lg hover:bg-rcb-red/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-rcb-red rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{player.name}</h3>
                        <p className="text-sm text-gray-400">{player.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-rcb-gold">{player.stats.runs}</div>
                      <div className="text-xs text-gray-400">SR: {player.stats.strikeRate.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Top Bowlers List */}
          {topBowlers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Leading Wicket Takers</h2>
              <div className="space-y-3">
                {topBowlers.map((player, index) => (
                  <div key={player._id} className="flex items-center justify-between p-4 bg-rcb-darkGray rounded-lg hover:bg-rcb-red/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{player.name}</h3>
                        <p className="text-sm text-gray-400">{player.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-500">{player.stats.wickets}</div>
                      <div className="text-xs text-gray-400">Eco: {player.stats.economy.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
