const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./utils/corsUtils');
const limiter = require('./utils/limiter');
const CONFIG = require('./utils/config');
const handlerErrors = require('./utils/handlerErrors');
const router = require('./routes');

const { PORT = CONFIG.PORT, MONGO = CONFIG.MONGO } = process.env;

const app = express();

app.use(express.json());

app.use(cors(corsOptions));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  handlerErrors(err, req, res, next);
});

mongoose.set('strictQuery', true);
mongoose.connect(
  MONGO,
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
