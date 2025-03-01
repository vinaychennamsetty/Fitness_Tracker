import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Change if backend is deployed

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Signup failed';
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Login failed';
    }
};
