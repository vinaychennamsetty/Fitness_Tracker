import axios from 'axios';

const API_URL = 'http://localhost:5000/api/workouts';

export const fetchWorkouts = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch workouts';
    }
};

export const addWorkout = async (token, workoutData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, workoutData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to add workout';
    }
};

export const deleteWorkout = async (token, workoutId) => {
    try {
        const response = await axios.delete(`${API_URL}/${workoutId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete workout';
    }
};
