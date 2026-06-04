const verifySelfOrAdmin = (req, res, next) => {
    const requestedId = parseInt(req.params.id || req.params.clientId);
    const { id: tokenId, role } = req.user; // מגיע מ-verifyToken

    if (role === 'admin') return next(); // אדמין יכול לגשת לכולם

    if (requestedId !== tokenId)
        return res.status(403).json({ error: 'אין הרשאה לגשת לנתונים של משתמש אחר' });

    next();
};

module.exports = { verifySelfOrAdmin };
