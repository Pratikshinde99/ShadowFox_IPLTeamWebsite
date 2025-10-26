import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { getPlayers } from '../services/api';

const Squad = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const roles = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'];

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await getPlayers();
      if (response.success) {
        setPlayers(response.data);
        setFilteredPlayers(response.data);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = players;

    // Filter by role
    if (selectedRole !== 'All') {
      filtered = filtered.filter(player => player.role === selectedRole);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPlayers(filtered);
  }, [selectedRole, searchTerm, players]);

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
            RCB Squad 2025
          </h1>
          <p className="text-xl text-gray-400">
            Meet the warriors who will bring the cup home!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red appearance-none cursor-pointer"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <span>Showing {filteredPlayers.length} of {players.length} players</span>
            {(selectedRole !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedRole('All');
                  setSearchTerm('');
                }}
                className="text-rcb-gold hover:text-rcb-gold/80"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Players Grid */}
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No players found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/player/${player._id}`)}
                className="group cursor-pointer"
              >
                <div className="relative h-full bg-gradient-to-br from-rcb-black via-rcb-red/10 to-rcb-black border-2 border-rcb-red/30 rounded-xl overflow-hidden group-hover:border-rcb-gold transition-all duration-300 shadow-2xl">
                  {/* Diagonal Red Stripe */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rcb-red/20 transform rotate-45 translate-x-16 -translate-y-16"></div>
                  
                  {/* Jersey Number Background */}
                  <div className="absolute top-2 right-2 text-7xl font-black text-rcb-red/10 leading-none">
                    {player.jerseyNumber || '00'}
                  </div>

                  {/* Captain Badge */}
                  {player.name === 'Rajat Patidar' && (
                    <div className="absolute top-3 left-3 bg-rcb-gold text-rcb-black px-3 py-1 rounded-full text-xs font-black z-20 animate-pulse">
                      CAPTAIN
                    </div>
                  )}

                  {/* The King Badge for Virat Kohli */}
                  {player.name === 'Virat Kohli' && (
                    <div className="absolute top-3 left-3 bg-rcb-gold text-rcb-black px-3 py-1 rounded-full text-xs font-black z-20 animate-pulse">
                      THE KING
                    </div>
                  )}

                  {/* Player Image */}
                  <div className="relative h-72 bg-black flex items-end justify-center overflow-hidden">
                    {player.photo ? (
                      <img 
                        src={player.photo} 
                        alt={player.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 mix-blend-lighten"
                        style={{ backgroundColor: '#000000' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML += '<div class="text-6xl mb-8">👤</div>';
                        }}
                      />
                    ) : (
                      <div className="text-6xl mb-8">👤</div>
                    )}
                    
                    {/* Jersey Number Badge */}
                    {player.jerseyNumber && (
                      <div className="absolute top-3 right-3 bg-rcb-red border-2 border-rcb-gold w-14 h-14 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-lg">
                        {player.jerseyNumber}
                      </div>
                    )}
                    
                    {/* Bottom Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rcb-black to-transparent"></div>
                  </div>

                  {/* Player Info */}
                  <div className="relative z-10 p-5 bg-gradient-to-b from-rcb-black/80 to-rcb-black">
                    {/* Name */}
                    <h3 className="text-2xl font-black text-white mb-1 group-hover:text-rcb-gold transition-colors">
                      {player.name}
                    </h3>
                    
                    {/* Role Badge */}
                    <div className="inline-block bg-rcb-red px-3 py-1 rounded-full text-xs font-bold text-white mb-3">
                      {player.role.toUpperCase()}
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-4">
                      {player.nationality} • {player.battingStyle}
                      {player.bowlingStyle !== 'N/A' && ` • ${player.bowlingStyle}`}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t-2 border-rcb-red/30">
                      <div className="text-center">
                        <div className="text-2xl font-black text-rcb-gold">{player.stats.matches}</div>
                        <div className="text-xs text-gray-500 font-semibold">MATCHES</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-rcb-gold">
                          {player.role === 'Bowler' ? player.stats.wickets : player.stats.runs}
                        </div>
                        <div className="text-xs text-gray-500 font-semibold">
                          {player.role === 'Bowler' ? 'WICKETS' : 'RUNS'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-rcb-gold">
                          {player.role === 'Bowler' 
                            ? player.stats.economy.toFixed(2) 
                            : player.stats.strikeRate.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500 font-semibold">
                          {player.role === 'Bowler' ? 'ECONOMY' : 'SR'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect - Red Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rcb-red/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Squad;
