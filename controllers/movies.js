const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

const getSavesMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const searchRes = await Movie.findOne({ ...req.body, owner: req.user._id });
    if (!searchRes) {
      const movie = await Movie.create({ ...req.body, owner: req.user._id });
      return res.status(200).json(movie);
    }
    throw new DocumentNotFoundError('Фильм уже добавлен в сохранённые');
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new DocumentNotFoundError('Фильм не найден или уже удалён');
    }
    if ((req.user._id === String(movie.owner._id))) {
      await Movie.findByIdAndDelete(id);
      return res.status(200).json(movie);
    }
    throw new ForbiddenError('Ошибка удаления фильма');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSavesMovies,
  createMovie,
  deleteMovie,
};
