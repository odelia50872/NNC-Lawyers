const verifySelfOrAdmin = (req, res, next) => {
    const requestedId = parseInt(req.params.id || req.params.clientId);
    const { id: tokenId, role } = req.user;

    if (role === 'admin') return next(); 

    if (requestedId !== tokenId)
        return res.status(403).json({ error: 'אין הרשאה לגשת לנתונים של משתמש אחר' });

    next();
};

module.exports = { verifySelfOrAdmin };

