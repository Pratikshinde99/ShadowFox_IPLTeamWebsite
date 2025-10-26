import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { getPolls, votePoll } from '../services/api';

const FanZone = () => {
  const [polls, setPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([
    { name: 'Rajesh Kumar', comment: 'Ee Sala Cup Namde! Let\'s go RCB! 🔥', likes: 45, time: '2 hours ago', liked: false },
    { name: 'Priya Sharma', comment: 'Virat Kohli is the best! Can\'t wait for the next match!', likes: 32, time: '5 hours ago', liked: false },
    { name: 'Arjun Patel', comment: 'Our bowling attack is looking strong this season!', likes: 28, time: '1 day ago', liked: false }
  ]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await getPolls();
      if (response.success) {
        setPolls(response.data);
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    if (votedPolls.has(pollId)) {
      alert('You have already voted on this poll!');
      return;
    }

    try {
      const response = await votePoll(pollId, optionIndex);
      if (response.success) {
        // Update the poll in state
        setPolls(polls.map(poll => 
          poll._id === pollId ? response.data : poll
        ));
        // Mark as voted
        setVotedPolls(new Set([...votedPolls, pollId]));
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  const getPercentage = (votes, total) => {
    if (total === 0) return 0;
    return ((votes / total) * 100).toFixed(1);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) {
      alert('Please write a comment!');
      return;
    }

    const comment = {
      name: userName.trim() || 'RCB Fan',
      comment: newComment,
      likes: 0,
      time: 'Just now',
      liked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    if (updatedComments[index].liked) {
      updatedComments[index].likes -= 1;
      updatedComments[index].liked = false;
    } else {
      updatedComments[index].likes += 1;
      updatedComments[index].liked = true;
    }
    setComments(updatedComments);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent('Ee Sala Cup Namde! Supporting RCB all the way! 🔥🏏 #RCB #PlayBold #IPL2025');
    const url = `https://twitter.com/intent/tweet?text=${text}&url=https://twitter.com/RCBTweets`;
    window.open(url, '_blank');
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have a direct share API, so we open their profile
    window.open('https://www.instagram.com/royalchallengers.bengaluru', '_blank');
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
            Fan Zone
          </h1>
          <p className="text-xl text-gray-400">
            Connect, Vote, and Show Your RCB Spirit!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Polls */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-white mb-6">Active Polls</h2>
            
            {polls.length === 0 ? (
              <div className="glass-effect rounded-xl p-12 text-center">
                <p className="text-xl text-gray-400">No active polls at the moment</p>
              </div>
            ) : (
              polls.map((poll, index) => (
                <motion.div
                  key={poll._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 hover-glow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex-1">{poll.question}</h3>
                    <span className="px-3 py-1 bg-rcb-red/20 text-rcb-gold rounded-full text-sm">
                      {poll.category}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {poll.options.map((option, optionIndex) => {
                      const percentage = getPercentage(option.votes, poll.totalVotes);
                      const hasVoted = votedPolls.has(poll._id);

                      return (
                        <div key={optionIndex}>
                          <button
                            onClick={() => handleVote(poll._id, optionIndex)}
                            disabled={hasVoted}
                            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                              hasVoted
                                ? 'bg-rcb-darkGray cursor-not-allowed'
                                : 'bg-rcb-darkGray hover:bg-rcb-red/20 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white">{option.text}</span>
                              {hasVoted && (
                                <span className="text-rcb-gold font-bold">{percentage}%</span>
                              )}
                            </div>
                            {hasVoted && (
                              <div className="w-full bg-rcb-black/50 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-rcb-gold h-full rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-rcb-red/20">
                    <span className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      {poll.totalVotes} votes
                    </span>
                    {votedPolls.has(poll._id) && (
                      <span className="text-green-500">✓ You voted</span>
                    )}
                  </div>
                </motion.div>
              ))
            )}

            {/* Fan Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageCircle className="text-rcb-gold" />
                Fan Wall
              </h2>
              
              {/* Comment Input */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Your name (optional - defaults to 'RCB Fan')"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 mb-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red"
                />
                <textarea
                  placeholder="Share your thoughts about RCB..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red resize-none"
                  rows="3"
                ></textarea>
                <button onClick={handlePostComment} className="btn-primary mt-3">
                  Post Comment
                </button>
              </div>

              {/* Comments */}
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-rcb-darkGray rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rcb-red rounded-full flex items-center justify-center font-bold">
                          {comment.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{comment.name}</h4>
                          <p className="text-xs text-gray-500">{comment.time}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3 ml-13">{comment.comment}</p>
                    <div className="flex items-center gap-4 ml-13 text-sm">
                      <button 
                        onClick={() => handleLikeComment(index)}
                        className={`flex items-center gap-1 transition-colors ${
                          comment.liked ? 'text-rcb-gold' : 'text-gray-400 hover:text-rcb-gold'
                        }`}
                      >
                        <ThumbsUp size={16} fill={comment.liked ? 'currentColor' : 'none'} />
                        {comment.likes}
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-rcb-gold transition-colors">
                        <MessageCircle size={16} />
                        Reply
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-rcb-gold transition-colors">
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Fan Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                🏆 Top Fans
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Rahul M', points: 1250, rank: 1 },
                  { name: 'Sneha K', points: 1180, rank: 2 },
                  { name: 'Amit S', points: 1050, rank: 3 },
                  { name: 'Divya R', points: 980, rank: 4 },
                  { name: 'Karthik V', points: 920, rank: 5 }
                ].map((fan) => (
                  <div key={fan.rank} className="flex items-center justify-between p-3 bg-rcb-darkGray rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        fan.rank === 1 ? 'bg-yellow-500 text-black' :
                        fan.rank === 2 ? 'bg-gray-400 text-black' :
                        fan.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-rcb-red/20 text-rcb-gold'
                      }`}>
                        {fan.rank}
                      </div>
                      <span className="text-white font-semibold">{fan.name}</span>
                    </div>
                    <span className="text-rcb-gold font-bold">{fan.points}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Community Stats</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-rcb-darkGray rounded-lg">
                  <div className="text-3xl font-bold text-rcb-gold mb-1">12.5K</div>
                  <div className="text-sm text-gray-400">Active Fans</div>
                </div>
                <div className="text-center p-4 bg-rcb-darkGray rounded-lg">
                  <div className="text-3xl font-bold text-rcb-gold mb-1">3.2K</div>
                  <div className="text-sm text-gray-400">Comments Today</div>
                </div>
                <div className="text-center p-4 bg-rcb-darkGray rounded-lg">
                  <div className="text-3xl font-bold text-rcb-gold mb-1">8.7K</div>
                  <div className="text-sm text-gray-400">Poll Votes</div>
                </div>
              </div>
            </motion.div>

            {/* Social Share */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Share Your Support</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Show your RCB pride on social media!
              </p>
              <div className="space-y-2">
                <button 
                  onClick={handleShareTwitter}
                  className="w-full btn-secondary flex items-center justify-center gap-2 hover:bg-rcb-red/30 transition-colors"
                >
                  <Share2 size={16} />
                  Share on Twitter
                </button>
                <button 
                  onClick={handleShareInstagram}
                  className="w-full btn-secondary flex items-center justify-center gap-2 hover:bg-rcb-red/30 transition-colors"
                >
                  <Share2 size={16} />
                  Share on Instagram
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanZone;
