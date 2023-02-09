const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getSavesMovies, createMovie, deleteMovie } = require('../controllers/movies');


router.get('/', getSavesMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailerLink: Joi.string().uri().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.string().hex().required(),
  })
}), createMovie);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  })
}), deleteMovie);

module.exports = router