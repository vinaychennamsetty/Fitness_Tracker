import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <div>
      {/* ✅ Tailwind Test Banner */}
      <div className="bg-green-500 text-white text-center p-4 rounded-lg mb-4">
        🚀 Tailwind CSS is working with existing styles!
      </div>

      {/* ✅ Existing Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
