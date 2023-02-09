const Movie = require("../models/movie")

const getSavesMovies = async (req, res, next) => {
  try {
    const movies = Movie.find({});
    return res.status(200).json(movies);
  }
  catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const body = req.body;
  try {
    const movie = Movie.create({ body });
    return res.status(200).json(movie);
  }
  catch (err) {
    next(err);
  }
}

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = Movie.findByIdAndDelete({ id });
    return res.status(200).json(movie);
  }
  catch (err) {
    next(err);
  }
}

module.exports = {
  getSavesMovies,
  createMovie,
  deleteMovie,
}