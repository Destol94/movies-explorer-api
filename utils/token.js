const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, process.env.NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, process.env.NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return false;
  }
}

module.exports = {
  generateToken,
  checkToken,
};
