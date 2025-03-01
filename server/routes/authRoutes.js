const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

const protect = require('../middleware/authMiddleware');

router.get('/profile', protect, async (req, res) => {
    res.json({ message: 'Welcome to your profile!', userId: req.user });
});


module.exports = router;
