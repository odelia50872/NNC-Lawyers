const verifySelfOrAdmin = (req, res, next) => {
    const requestedId = parseInt(req.params.id || req.params.clientId);
    const { id: tokenId, role } = req.user;

    if (!requestedId) return res.status(400).json({ error: 'MISSING_ID' });

    if (role === 'admin') return next(); 

    if (requestedId !== tokenId)
        return res.status(403).json({ error: 'No permission to access this resource' });

    next();
};

module.exports = { verifySelfOrAdmin };

