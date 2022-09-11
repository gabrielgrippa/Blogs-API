const jwt = require('jsonwebtoken');

const tokenValidation = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validation = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validation;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { tokenValidation };