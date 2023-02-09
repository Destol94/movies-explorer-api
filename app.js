const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerUser = require('./routes/users');
const routerMovies = require('./routes/movies');
const corsOptions = require('./utils/corsUtils');
const { createUser, login } = require('./controllers/users');
const DocumentNotFoundError = require('./errors/DocumentNotFoundError');
const checkAuth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63e5376df720aeefa5b2e587',
  };
  next();
});
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(cookieParser());

app.use('/users', checkAuth, routerUser);
app.use('/movies', checkAuth, routerMovies);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  })
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}), login);

app.use('*', () => {
  throw new DocumentNotFoundError('Страница не найдена');
});

app.use(errorLogger);
app.use(errors());

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb://127.0.0.1:27017/bitfilmsdb',
  {
    useNewUrlParser: true,
  },
  () => {
    app.listen(PORT, () => {
      console.log(`Приложение слушает порт ${PORT}`);
    });
  },
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));