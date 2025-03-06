const Workout = require("../models/WorkoutModel");

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const addWorkout = async (req, res) => {
    try {
        const { type, duration, caloriesBurned } = req.body;

        if (!type || !duration || !caloriesBurned) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const newWorkout = await Workout.create({
            user: req.user._id,
            type,
            duration,
            caloriesBurned,
        });

        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this workout" });
        }

        await workout.deleteOne();
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getWorkouts, addWorkout, deleteWorkout };
