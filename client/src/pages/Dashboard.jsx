import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWorkouts, addWorkout, deleteWorkout } from '../api/workoutApi';
import WorkoutChart from '../components/WorkoutChart';

function Dashboard() {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect if not logged in
        } else {
            loadWorkouts(token);
        }
    }, [navigate]);

    const loadWorkouts = async (token) => {
        try {
            const data = await fetchWorkouts(token);
            setWorkouts(data);
        } catch (err) {
            setError(err);
        }
    };

    const handleAddWorkout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await addWorkout(token, { type, duration, caloriesBurned });
            setType('');
            setDuration('');
            setCaloriesBurned('');
            loadWorkouts(token); // Reload workouts after adding
        } catch (err) {
            setError(err);
        }
    };

    const handleDeleteWorkout = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await deleteWorkout(token, id);
            setWorkouts(workouts.filter(workout => workout._id !== id)); // Remove from UI
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-blue-600">🏋️‍♂️ Fitness Dashboard</h1>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                {/* Workout Chart */}
                <div className="mt-6">
                    {workouts.length> 0 && <WorkoutChart workouts={workouts} />}
                </div>

                {/* Add Workout Form */}
                <h2 className="text-xl font-semibold mt-6">➕ Add a Workout</h2>
                <form className="mt-4 space-y-4" onSubmit={handleAddWorkout}>
                    <input 
                        type="text" 
                        placeholder="Workout Type (e.g., Running, Yoga)" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                        required 
                    />
                    <input 
                        type="number" 
                        placeholder="Duration (min)" 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                        required 
                    />
                    <input 
                        type="number" 
                        placeholder="Calories Burned" 
                        value={caloriesBurned} 
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                        required 
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                        Add Workout
                    </button>
                </form>

                {/* Workout List */}
                <h2 className="text-xl font-semibold mt-6">📋 Your Workouts</h2>
                <ul className="mt-4 space-y-3">
                    {workouts.length > 0 ? (
                        workouts.map(workout => (
                            <li key={workout._id} className="p-4 bg-gray-200 rounded-lg flex justify-between items-center shadow">
                                <span className="text-lg font-medium">{workout.type} - {workout.duration} mins - {workout.caloriesBurned} cal</span>
                                <button 
                                    onClick={() => handleDeleteWorkout(workout._id)} 
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    🗑 Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 mt-3">No workouts added yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;