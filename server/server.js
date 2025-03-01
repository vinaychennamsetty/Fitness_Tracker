require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes'); // Import authentication routes

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api/auth', require('./routes/authRoutes'));


// Define Routes
app.use('/api/auth', authRoutes); // Use authentication routes

app.use('/api/workouts', require('./routes/workoutRoutes'));


app.get('/', (req, res) => {
    res.send('Fitness Tracker API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
