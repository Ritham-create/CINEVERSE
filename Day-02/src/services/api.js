import axios from 'axios';

/**
 * API Service Layer — Axios Configuration
 * 
 * This module demonstrates how to set up Axios for API-ready frontend.
 * In Day 02, we use mock/simulated responses. In a real app, the
 * BASE_URL would point to your backend server.
 * 
 * Key Concepts Demonstrated:
 * - Axios instance creation with base config
 * - Request interceptors (attach JWT token)
 * - Response interceptors (handle errors globally)
 * - API-ready service functions
 */

const BASE_URL = 'https://api.cineverse.example.com/v1'; // Placeholder API URL

// Create Axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor — Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cv_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor — Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expired or invalid — redirect to login
          localStorage.removeItem('cv_token');
          localStorage.removeItem('cv_user');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API Service Functions
 * 
 * These functions are API-ready — when a backend is available,
 * simply remove the mock implementations and the real API calls
 * will work with the Axios instance above.
 */

// Movies
export const movieService = {
  getTrending: () => api.get('/movies/trending'),
  getPopular: () => api.get('/movies/popular'),
  getByGenre: (genre) => api.get(`/movies/genre/${genre}`),
  getById: (id) => api.get(`/movies/${id}`),
  search: (query) => api.get(`/movies/search?q=${query}`),
};

// Auth
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (data) => api.post('/auth/signup', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/auth/profile'),
};

// User
export const userService = {
  getMyList: () => api.get('/user/list'),
  addToList: (movieId) => api.post(`/user/list/${movieId}`),
  removeFromList: (movieId) => api.delete(`/user/list/${movieId}`),
  getProfiles: () => api.get('/user/profiles'),
};

export default api;
