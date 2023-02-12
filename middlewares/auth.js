const Unauthorized = require('../errors/Unauthorized');
const { checkToken } = require('../utils/token');

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  req.user = checkToken(token);
  if (req.user) {
    return next();
  }
  throw new Unauthorized('Доступ запрещён');
};

module.exports = checkAuth;
