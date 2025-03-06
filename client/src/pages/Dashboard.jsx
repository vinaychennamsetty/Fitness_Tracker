import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [deletedWorkout, setDeletedWorkout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Fetch Workouts
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(res.data);
    } catch (error) {
      console.error("❌ Error fetching workouts:", error);
    }
  };

  // Add Workout
  const handleAddWorkout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/workouts",
        { type, duration, caloriesBurned },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWorkouts([...workouts, res.data]);
      setType("");
      setDuration("");
      setCaloriesBurned("");
    } catch (error) {
      console.error("❌ Error adding workout:", error.response?.data?.message || error.message);
    }
  };

  // Delete Workout with Undo
  const handleDeleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const workoutToDelete = workouts.find((workout) => workout._id === id);
      setDeletedWorkout(workoutToDelete);

      setWorkouts(workouts.filter((workout) => workout._id !== id));

      await axios.delete(`http://localhost:5000/api/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTimeout(() => setDeletedWorkout(null), 5000);
    } catch (error) {
      console.error("❌ Error deleting workout:", error.response?.data?.message || error.message);
    }
  };

  // Undo Delete Workout
  const handleUndoDelete = async () => {
    if (deletedWorkout) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:5000/api/workouts",
          {
            type: deletedWorkout.type,
            duration: deletedWorkout.duration,
            caloriesBurned: deletedWorkout.caloriesBurned,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setWorkouts([...workouts, res.data]);
        setDeletedWorkout(null);
      } catch (error) {
        console.error("❌ Error restoring workout:", error.response?.data?.message || error.message);
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold">🏋️‍♂️ Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Container - Full Width & Full Height*/}
      <div className="flex w-full h-full p-6">
        {/* Left Sidebar - Add Workout */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Workout</h2>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Workout Type (e.g. Running)"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Duration (in minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Calories Burned"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleAddWorkout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Workout
            </button>
          </div>
        </div>

        {/* Workout List & Chart */}
        <div className="flex-1 flex flex-col space-y-6 px-6">
          {/* Workout List */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Your Workouts</h2>
            {workouts.length === 0 ? (
              <p className="text-gray-500">No workouts yet. Add one!</p>
            ) : (
              <ul className="space-y-2">
                {workouts.map((workout) => (
                  <li key={workout._id} className="flex justify-between p-2 border-b">
                    {`${workout.type} - ${workout.duration} min - ${workout.caloriesBurned} cal`}
                    <button
                      onClick={() => handleDeleteWorkout(workout._id)}
                      className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Undo Delete Button */}
            {deletedWorkout && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleUndoDelete}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Undo Delete
                </button>
              </div>
            )}
          </div>

          {/* Workout Chart - Take Full Width */}
          {workouts.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
              <h2 className="text-xl font-semibold mb-4">Workout Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={workouts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="duration" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
