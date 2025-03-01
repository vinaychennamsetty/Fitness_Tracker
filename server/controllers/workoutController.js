const Workout = require('../models/Workout');

const addWorkout = async (req, res) => {
    try {
        const { type, duration, caloriesBurned } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const workout = new Workout({
            user: req.user,
            type,
            duration,
            caloriesBurned
        });

        await workout.save();
        res.status(201).json({ message: 'Workout added successfully', workout });
    } catch (error) {
        console.error('Add Workout Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user }).sort({ date: -1 });
        res.json(workouts);
    } catch (error) {
        console.error('Get Workouts Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        if (workout.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        //  Fix: Use deleteOne instead of remove()
        await Workout.deleteOne({ _id: req.params.id });

        res.json({ message: 'Workout removed' });
    } catch (error) {
        console.error('Delete Workout Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addWorkout, getWorkouts, deleteWorkout };
