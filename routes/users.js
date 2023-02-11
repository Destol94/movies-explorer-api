const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateProfile } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string(),
  }),
}), updateProfile);

module.exports = router;
