import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, TrendingUp, Target, Award } from 'lucide-react';
import { getMatchDetails } from '../services/api';

const Scorecard = ({ match, isOpen, onClose }) => {
  const [detailedMatch, setDetailedMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && match && match.matchId) {
      setLoading(true);
      setError(null); // Reset error state
      
      getMatchDetails(match.matchId)
        .then(response => {
          if (response.success) {
            setDetailedMatch(response.data);
          } else {
            setError('Failed to load match details');
          }
        })
        .catch(err => {
          console.error('Error fetching match details:', err);
          setError('Error loading match details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, match]);

  if (!match) return null;

  // Use detailed match data if available, otherwise use the basic match data
  const currentMatch = detailedMatch || match;

  // Get detailed scorecard data from match object
  const getDetailedScorecard = () => {
    // Process batting data to handle notOut field
    const processBattingData = (battingData) => {
      if (!battingData || !Array.isArray(battingData)) return [];
      return battingData.map(batsman => {
        // Handle notOut status correctly
        const out = batsman.notOut ? 'not out' : (batsman.out || 'unknown');
        // Ensure strikeRate is a number before formatting
        const strikeRate = typeof batsman.strikeRate === 'number' ? 
          batsman.strikeRate.toFixed(2) : '0.00';
        
        return {
          ...batsman,
          out,
          strikeRate
        };
      });
    };

    // Create extras object with defaults
    const createExtras = (extrasData) => {
      return {
        wides: extrasData?.wides || 0,
        noBalls: extrasData?.noBalls || 0,
        legByes: extrasData?.legByes || 0,
        byes: extrasData?.byes || 0,
        total: extrasData?.total || 0
      };
    };

    // Process bowling data to handle economy
    const processBowlingData = (bowlingData) => {
      if (!bowlingData || !Array.isArray(bowlingData)) return [];
      return bowlingData.map(bowler => {
        // Ensure economy is a number before formatting
        const economy = typeof bowler.economy === 'number' ? 
          bowler.economy.toFixed(2) : '0.00';
        
        return {
          ...bowler,
          economy
        };
      });
    };

    return {
      tossWinner: currentMatch.tossWinner || 'Unknown',
      tossDecision: currentMatch.tossDecision || 'Unknown',
      playerOfMatch: currentMatch.playerOfMatch || 'TBA',
      umpires: currentMatch.umpires || [],
      thirdUmpire: currentMatch.thirdUmpire || 'TBA',
      matchReferee: currentMatch.matchReferee || 'TBA',
      innings: [
        {
          team: 'RCB',
          batting: processBattingData(currentMatch.rcbBatting || []),
          bowling: processBowlingData(currentMatch.opponentBowling || []),
          total: currentMatch.ourScore || { runs: 0, wickets: 0, overs: '0.0' },
          extras: createExtras(currentMatch.rcbExtras)
        },
        {
          team: currentMatch.opponent || 'Opponent',
          batting: processBattingData(currentMatch.opponentBatting || []),
          bowling: processBowlingData(currentMatch.rcbBowling || []),
          total: currentMatch.theirScore || { runs: 0, wickets: 0, overs: '0.0' },
          extras: createExtras(currentMatch.opponentExtras)
        }
      ]
    };
  };

  const scorecard = getDetailedScorecard();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Scorecard Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="h-full bg-gradient-to-br from-rcb-black via-rcb-red/10 to-rcb-black border-2 border-rcb-red/30 rounded-2xl shadow-2xl flex flex-col">


              {/* Header */}
              <div className="bg-rcb-red/20 border-b-2 border-rcb-gold/30 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">
                      RCB vs {match.opponent}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <span>Match #{match.matchNumber}</span>
                      <span>•</span>
                      <span>{new Date(match.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                      <span>•</span>
                      <span>{match.venue}</span>
                    </div>
                    
                    {/* Toss Info */}
                    <div className="mt-3 text-sm text-rcb-gold">
                      <span className="font-semibold">Toss:</span> {scorecard.tossWinner} won and chose to {scorecard.tossDecision}
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-rcb-red/30 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>

                {/* Match Result */}
                {match.result && (
                  <div className="mt-4 p-4 bg-rcb-gold/20 border border-rcb-gold/30 rounded-lg">
                    <div className="flex items-center gap-2 text-rcb-gold">
                      <Trophy size={20} />
                      <span className="font-bold text-lg">{match.result.summary || match.result}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="loading-spinner"></div>
                    <p className="ml-3 text-white">Loading detailed scorecard...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-400 text-xl mb-4">{error}</p>
                    <p className="text-gray-400">Unable to load detailed match data. Please try again later.</p>
                  </div>
                ) : (
                  <>
                    {/* Innings */}
                    {scorecard.innings.map((innings, inningsIndex) => (


                  <div key={inningsIndex} className="space-y-4">
                    {/* Innings Header */}
                    <div className="flex items-center justify-between bg-rcb-red/20 p-4 rounded-lg border border-rcb-red/30">
                      <h3 className="text-2xl font-bold text-white">{innings.team}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-black text-rcb-gold">
                          {innings.total.runs}/{innings.total.wickets}
                        </div>
                        <div className="text-sm text-gray-400">
                          ({innings.total.overs} overs)
                        </div>
                      </div>
                    </div>

                    {/* Batting Card */}
                    <div className="bg-rcb-lightGray/50 rounded-lg overflow-hidden border border-rcb-red/20">
                      <div className="bg-rcb-red/30 px-4 py-3 border-b border-rcb-red/30">
                        <h4 className="font-bold text-white">Batting</h4>
                      </div>
                      
                      {/* Desktop Table */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-rcb-black/50">
                            <tr className="text-gray-400 text-left">
                              <th className="px-4 py-3 font-semibold">Batsman</th>
                              <th className="px-4 py-3 font-semibold text-center">R</th>
                              <th className="px-4 py-3 font-semibold text-center">B</th>
                              <th className="px-4 py-3 font-semibold text-center">4s</th>
                              <th className="px-4 py-3 font-semibold text-center">6s</th>
                              <th className="px-4 py-3 font-semibold text-center">SR</th>
                              <th className="px-4 py-3 font-semibold">Dismissal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {innings.batting.map((batsman, idx) => (
                              <tr key={idx} className="border-t border-rcb-red/10 hover:bg-rcb-red/10 transition-colors">
                                <td className="px-4 py-3 font-semibold text-white">{batsman.name}</td>
                                <td className="px-4 py-3 text-center text-rcb-gold font-bold">{batsman.runs}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{batsman.balls}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{batsman.fours}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{batsman.sixes}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{typeof batsman.strikeRate === 'number' ? batsman.strikeRate.toFixed(2) : '0.00'}</td>
                                <td className="px-4 py-3 text-gray-400 text-sm">{batsman.out}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Cards */}
                      <div className="md:hidden divide-y divide-rcb-red/10">
                        {innings.batting.map((batsman, idx) => (
                          <div key={idx} className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold text-white">{batsman.name}</div>
                                <div className="text-xs text-gray-400 mt-1">{batsman.out}</div>
                              </div>
                              <div className="text-2xl font-bold text-rcb-gold">{batsman.runs}</div>
                            </div>
                            <div className="flex gap-4 text-xs text-gray-400">
                              <span>{batsman.balls}b</span>
                              <span>{batsman.fours}×4</span>
                              <span>{batsman.sixes}×6</span>
                              <span>SR: {typeof batsman.strikeRate === 'number' ? batsman.strikeRate.toFixed(2) : '0.00'}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Extras */}
                      <div className="px-4 py-3 bg-rcb-black/30 border-t border-rcb-red/20 text-sm">
                        <span className="text-gray-400">Extras: </span>
                        <span className="text-white font-semibold">{innings.extras?.total || 0}</span>
                        <span className="text-gray-500 ml-2">
                          (wd {innings.extras?.wides || 0}, nb {innings.extras?.noBalls || 0}, lb {innings.extras?.legByes || 0}, b {innings.extras?.byes || 0})
                        </span>
                      </div>
                    </div>

                    {/* Bowling Card */}
                    <div className="bg-rcb-lightGray/50 rounded-lg overflow-hidden border border-rcb-red/20">
                      <div className="bg-rcb-red/30 px-4 py-3 border-b border-rcb-red/30">
                        <h4 className="font-bold text-white">Bowling</h4>
                      </div>
                      
                      {/* Desktop Table */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-rcb-black/50">
                            <tr className="text-gray-400 text-left">
                              <th className="px-4 py-3 font-semibold">Bowler</th>
                              <th className="px-4 py-3 font-semibold text-center">O</th>
                              <th className="px-4 py-3 font-semibold text-center">M</th>
                              <th className="px-4 py-3 font-semibold text-center">R</th>
                              <th className="px-4 py-3 font-semibold text-center">W</th>
                              <th className="px-4 py-3 font-semibold text-center">Econ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {innings.bowling.map((bowler, idx) => (
                              <tr key={idx} className="border-t border-rcb-red/10 hover:bg-rcb-red/10 transition-colors">
                                <td className="px-4 py-3 font-semibold text-white">{bowler.name}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{bowler.overs}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{bowler.maidens}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{bowler.runs}</td>
                                <td className="px-4 py-3 text-center text-rcb-gold font-bold">{bowler.wickets}</td>
                                <td className="px-4 py-3 text-center text-gray-300">{typeof bowler.economy === 'number' ? bowler.economy.toFixed(2) : '0.00'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Cards */}
                      <div className="md:hidden divide-y divide-rcb-red/10">
                        {innings.bowling.map((bowler, idx) => (
                          <div key={idx} className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-semibold text-white">{bowler.name}</div>
                              <div className="text-lg font-bold text-rcb-gold">{bowler.wickets}W</div>
                            </div>
                            <div className="flex gap-4 text-xs text-gray-400">
                              <span>{bowler.overs}O</span>
                              <span>{bowler.maidens}M</span>
                              <span>{bowler.runs}R</span>
                              <span>Econ: {typeof bowler.economy === 'number' ? bowler.economy.toFixed(2) : '0.00'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Match Officials & Player of the Match */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Player of the Match */}
                  <div className="bg-rcb-gold/20 border border-rcb-gold/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={20} className="text-rcb-gold" />
                      <h4 className="font-bold text-white">Player of the Match</h4>
                    </div>
                    <p className="text-2xl font-black text-rcb-gold">{scorecard.playerOfMatch}</p>
                  </div>

                  {/* Match Officials */}
                  <div className="bg-rcb-lightGray/50 border border-rcb-red/20 rounded-lg p-4">
                    <h4 className="font-bold text-white mb-3">Match Officials</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div><span className="text-gray-500">Umpires:</span> {scorecard.umpires && scorecard.umpires.length ? scorecard.umpires.join(', ') : 'TBA'}</div>
                      <div><span className="text-gray-500">Third Umpire:</span> {scorecard.thirdUmpire || 'TBA'}</div>
                      <div><span className="text-gray-500">Match Referee:</span> {scorecard.matchReferee || 'TBA'}</div>
                    </div>
                  </div>
                </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Scorecard;
