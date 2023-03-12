const handlerErrors = (err, req, res) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Такой пользователь уже есть' });
  }
  if (!err.statusCode) {
    return res.status(500).json({ message: ' На сервере произошла ошибка' });
  }
  return res.status(err.statusCode).json({ message: err.message });
};

module.exports = handlerErrors;
