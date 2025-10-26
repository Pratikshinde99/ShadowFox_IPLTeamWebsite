import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { getComparisonData } from '../services/api';

const Comparison = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparisonData();
  }, []);

  const fetchComparisonData = async () => {
    try {
      const response = await getComparisonData();
      if (response.success) {
        setTeamsData(response.data);
      }
    } catch (error) {
      console.error('Error fetching comparison data:', error);
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

  const rcbData = teamsData.find(team => team.team === 'RCB');
  const rcbRank = teamsData.findIndex(team => team.team === 'RCB') + 1;

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
            IPL 2025 Comparison
          </h1>
          <p className="text-xl text-gray-400">
            RCB vs Other Teams Performance Analysis
          </p>
        </motion.div>

        {/* RCB Highlight Card */}
        {rcbData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-8 mb-12 border-2 border-rcb-red"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-rcb-red rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold">RCB</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Royal Challengers Bengaluru</h2>
                  <p className="text-rcb-gold text-lg">Current Position: #{rcbRank}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rcb-gold">{rcbData.matches}</div>
                  <div className="text-xs text-gray-400">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{rcbData.wins}</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rcb-gold">{rcbData.points}</div>
                  <div className="text-xs text-gray-400">Points</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${rcbData.nrr >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {rcbData.nrr >= 0 ? '+' : ''}{rcbData.nrr}
                  </div>
                  <div className="text-xs text-gray-400">NRR</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Points Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6 mb-12 overflow-x-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="text-rcb-gold" />
            Points Table
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-rcb-red/20">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Pos</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Team</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">M</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">W</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">L</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">Pts</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">NRR</th>
              </tr>
            </thead>
            <tbody>
              {teamsData.map((team, index) => (
                <tr 
                  key={team.team}
                  className={`border-b border-rcb-red/10 hover:bg-rcb-red/5 transition-colors ${
                    team.team === 'RCB' ? 'bg-rcb-red/10' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index < 4 ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${team.team === 'RCB' ? 'text-rcb-gold' : 'text-white'}`}>
                      {team.team}
                    </span>
                  </td>
                  <td className="text-center py-4 px-4 text-gray-300">{team.matches}</td>
                  <td className="text-center py-4 px-4 text-green-500 font-semibold">{team.wins}</td>
                  <td className="text-center py-4 px-4 text-red-500 font-semibold">{team.losses}</td>
                  <td className="text-center py-4 px-4 text-rcb-gold font-bold">{team.points}</td>
                  <td className={`text-center py-4 px-4 font-semibold ${
                    team.nrr >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {team.nrr >= 0 ? '+' : ''}{team.nrr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Points Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="text-rcb-gold" />
              Points Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="team" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #DA1212',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="points" 
                  fill="#DA1212"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Win/Loss Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-500" />
              Wins Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="team" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #DA1212',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="wins" fill="#22c55e" name="Wins" radius={[8, 8, 0, 0]} />
                <Bar dataKey="losses" fill="#ef4444" name="Losses" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Net Run Rate Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Net Run Rate Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teamsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="team" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #DA1212',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="nrr" 
                stroke="#FFD700" 
                strokeWidth={3}
                dot={{ fill: '#FFD700', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-xl p-8 mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-rcb-darkGray rounded-lg p-6">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-white mb-2">League Position</h3>
              <p className="text-gray-400">
                RCB is currently at position <span className="text-rcb-gold font-bold">#{rcbRank}</span> in the points table
              </p>
            </div>
            <div className="bg-rcb-darkGray rounded-lg p-6">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">Performance</h3>
              <p className="text-gray-400">
                {rcbData && rcbData.wins > rcbData.losses 
                  ? 'Strong performance with more wins than losses'
                  : 'Room for improvement in upcoming matches'}
              </p>
            </div>
            <div className="bg-rcb-darkGray rounded-lg p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">Playoff Chances</h3>
              <p className="text-gray-400">
                {rcbRank <= 4 
                  ? 'Currently in playoff position! Keep it up!'
                  : 'Need to win more matches to secure playoff spot'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Comparison;
