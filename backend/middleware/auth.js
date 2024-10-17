const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.role = decoded.role;

      if (roles.length && !roles.includes(req.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch (err) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  };
};

module.exports = authMiddleware;
