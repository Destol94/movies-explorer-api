const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = require('mongoose/lib/types');

const cardScheme = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Введите URL',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Введите URL',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Введите URL',
    },
  },
  owner: {
    type: ObjectId,
    require: true,
    ref: 'user'
  },
  movieId: {
    type: String,
    require: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /[А-Яа-яеЁ\.\!\?\:\; ]*/.test(v);
      },
      message: 'Название фильма должно содержать русский алфавит, знаки препинания и пробелы',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /[A-Za-z\.\!\?\:\; ]*/.test(v);
      },
      message: 'Название фильма должно содержать англисйкий алфавит, знаки препинания и пробелы',
    },
  },
});

module.exports = mongoose.model('movie', cardScheme);
