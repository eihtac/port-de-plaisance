const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.session.token;

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