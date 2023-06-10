const jwt = require('jsonwebtoken');
const AuthenticationError = require('../utils/errors/AuthenticationError');

module.exports = (req, res, next) => {
  if (req.headers?.authorization?.includes('Bearer')) {
    const token = req.headers?.authorization?.split('Bearer ')?.[1] || '';
    try {
      res.locals.currentUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError('Unauthorized');
    }
  }
  next();
};
