const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'});
};

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  }
  catch (err) {
    return false;
  }
};

module.exports = {
  generateToken,
  checkToken,
}