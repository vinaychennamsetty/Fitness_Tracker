const express = require("express");
const { getWorkouts, addWorkout, deleteWorkout } = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getWorkouts);
router.post("/", protect, addWorkout);
router.delete("/:id", protect, deleteWorkout);

module.exports = router;
