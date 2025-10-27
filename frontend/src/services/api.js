import axios from 'axios';

// Import seed data for fallback
import mergedMatchesData from '../data/mergedMatchesData.json';
import playerData from '../data/playerData.json';
import iconicMomentsData from '../data/iconicMomentsData.json';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Players API
export const getPlayers = async (role = '', season = '2025') => {
  try {
    const response = await api.get('/players', { params: { role, season } });
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

export const getPlayer = async (id) => {
  try {
    const response = await api.get(`/players/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player:', error);
    throw error;
  }
};

// Matches API
export const getMatches = async (status = '', season = '2025') => {
  try {
    const response = await api.get('/matches', { params: { status, season } });
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

// Get match details by matchId with fallback to local data
export const getMatchDetails = async (matchId) => {
  try {
    const response = await api.get(`/matches/matchId/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details from API, using local data:', error);
    
    // Use merged match data for fallback
    const allMatches = mergedMatchesData;
    
    // Find match by ID or matchId
    const match = allMatches.find(m => 
      (m._id === matchId || m.matchId === matchId)
    );
    
    if (match) {
      console.log('Found match in local data:', match.matchNumber);
      return { success: true, data: match };
    } else {
      console.error('Match not found in local data for ID:', matchId);
      throw new Error('Match not found in local data');
    }
  }
};

export const getUpcomingMatches = async () => {
  try {
    const response = await api.get('/matches/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

export const getLiveMatches = async () => {
  try {
    const response = await api.get('/matches/live');
    return response.data;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

export const getCompletedMatches = async () => {
  try {
    const response = await api.get('/matches/completed');
    return response.data;
  } catch (error) {
    console.error('Error fetching completed matches:', error);
    throw error;
  }
};

// Statistics API
export const getTeamStats = async (season = '2025') => {
  try {
    const response = await api.get('/stats/team', { params: { season } });
    return response.data;
  } catch (error) {
    console.error('Error fetching team stats:', error);
    throw error;
  }
};

export const getTopBatsmen = async (season = '2025', limit = 5) => {
  try {
    const response = await api.get('/stats/batsmen', { params: { season, limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top batsmen:', error);
    throw error;
  }
};

export const getTopBowlers = async (season = '2025', limit = 5) => {
  try {
    const response = await api.get('/stats/bowlers', { params: { season, limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top bowlers:', error);
    throw error;
  }
};

export const getComparisonData = async () => {
  try {
    const response = await api.get('/stats/comparison');
    return response.data;
  } catch (error) {
    console.error('Error fetching comparison data:', error);
    throw error;
  }
};

// Polls API
export const getPolls = async () => {
  try {
    const response = await api.get('/polls');
    return response.data;
  } catch (error) {
    console.error('Error fetching polls:', error);
    throw error;
  }
};

export const votePoll = async (pollId, optionIndex) => {
  try {
    const response = await api.post(`/polls/${pollId}/vote`, { optionIndex });
    return response.data;
  } catch (error) {
    console.error('Error voting on poll:', error);
    throw error;
  }
};

// News API
export const getNews = async () => {
  try {
    const response = await api.get('/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Iconic Moments API
export const getIconicMoments = async (category = '', season = '', featured = false) => {
  try {
    const params = {};
    if (category) params.category = category;
    if (season) params.season = season;
    if (featured) params.featured = 'true';
    
    const response = await api.get('/iconic-moments', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching iconic moments:', error);
    throw error;
  }
};

// Feedback API
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export default api;
