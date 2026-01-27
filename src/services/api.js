import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const getMyProfile = () => api.get('/profile/me');
export const updateProfile = (profileData) => api.post('/profile/update', profileData);
export const searchProfiles = (query) => api.get(`/profile/search?query=${query}`);
export const createBooking = (bookingData) => api.post('/booking/create', bookingData);
export const getMyBookings = () => api.get('/booking/my-bookings');

export default api;
