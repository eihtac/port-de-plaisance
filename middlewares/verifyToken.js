const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer')
        ? authHeader.split(' ')[1]
        : req.session.token;
        
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé' });
    } 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide' });
    }
};

module.exports = verifyToken;