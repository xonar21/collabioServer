const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  console.log(err)
  const message = status === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(status).send({ message });
  next();
};

module.exports = errorHandler;
