const express = require('express');
const { addWorkout, getWorkouts, deleteWorkout } = require('../controllers/workoutController'); // ✅ Ensure correct import
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addWorkout);  // ✅ Correct function reference
router.get('/', protect, getWorkouts);     // ✅ Correct function reference
router.delete('/:id', protect, deleteWorkout); // ✅ Correct function reference

module.exports = router;
