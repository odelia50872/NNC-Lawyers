const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token)
        return res.status(401).json({ error: 'NO_TOKEN' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'FORBIDDEN' });
    next();
};

module.exports = { verifyToken, verifyAdmin };
