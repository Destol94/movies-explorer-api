const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, logout } = require('../controllers/users');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const checkAuth = require('../middlewares/auth');
const routerUser = require('./users');
const routerMovies = require('./movies');

router.use('/users', checkAuth, routerUser);
router.use('/movies', checkAuth, routerMovies);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signout', checkAuth, logout);

router.use('*', checkAuth, () => {
  throw new DocumentNotFoundError('Страница не найдена');
});

module.exports = router;
