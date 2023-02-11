const bcrypt = require('bcrypt');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const Unauthorized = require('../errors/Unauthorized');
const User = require('../models/user');
const { generateToken } = require('../utils/token');

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new DocumentNotFoundError('Ошибка получения пользователя');
    }
    return res.status(200).json({ email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const id = req.user._id;
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new DocumentNotFoundError('Ошибка обновления');
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const body = { ...req.body };
  const { email, name, password } = body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hash });
    return res.status(201).json({ _id: user._id });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Unauthorized('Неверный пользователь или пароль');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = generateToken({ _id: user._id });
      return res.status(200).cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }).json({ token });
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    return res.status(200).clearCookie('jwt').json({ message: 'Выход выполнен' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  updateProfile,
  createUser,
  login,
  logout,
};
