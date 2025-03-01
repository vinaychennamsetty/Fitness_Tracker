const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.id; // Ensure user ID is attached
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = protect;
