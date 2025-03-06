import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Fitness Tracker</h1>
      <p className="text-lg text-gray-600 mb-6">
        Track your workouts and stay fit.
      </p>
      <div className="space-x-4">
        <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign Up
        </Link>
        <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
