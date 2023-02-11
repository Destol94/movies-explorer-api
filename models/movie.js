const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = require('mongoose/lib/types');

const cardScheme = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Введите URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Введите URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Введите URL',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[А-Яа-яеЁ.!?:; ]*/.test(v);
      },
      message: 'Название фильма должно содержать русский алфавит, знаки препинания и пробелы',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[A-Za-z.!?:; ]*/.test(v);
      },
      message: 'Название фильма должно содержать англисйкий алфавит, знаки препинания и пробелы',
    },
  },
});

module.exports = mongoose.model('movie', cardScheme);
