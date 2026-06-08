const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token)
        return res.status(401).json({ error: 'אין הרשאה — נדרשת התחברות' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: 'טוקן לא תקין או פג תוקף' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'אין הרשאת אדמין' });
    next();
};

module.exports = { verifyToken, verifyAdmin };
