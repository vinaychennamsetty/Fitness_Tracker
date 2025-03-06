import axios from 'axios';

const API_URL = 'http://localhost:5000/api/workouts';

export const fetchWorkouts = async (token) => {
  try {
    const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

export const addWorkout = async (token, workout) => {
  try {
    const response = await axios.post(API_URL, workout, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error adding workout:", error.response?.data || error.message);
  }
};

export const deleteWorkout = async (token, id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error("Error deleting workout:", error.response?.data || error.message);
  }
};
