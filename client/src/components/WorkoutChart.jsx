import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WorkoutChart = ({ workouts }) => {
  const chartData = workouts.map((workout, index) => ({
    name: `Day ${index + 1}`,
    Duration: workout.duration,
    Calories: workout.caloriesBurned,
  }));

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-center text-blue-600">📊 Workout Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Duration" stroke="#1E90FF" strokeWidth={3} />
          <Line type="monotone" dataKey="Calories" stroke="#FF4500" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutChart;
