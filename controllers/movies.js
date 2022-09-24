const Movie = require('../models/movie');

const ErrorBadRequest = require('../errors/errorBadRequest');

const ErrorNotFound = require('../errors/errorNotFound');

const Forbidden = require('../errors/Forbidden');

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Movie.findById({ _id: id })
    .orFail(() => {
      throw new ErrorNotFound(`Карточка с id ${id} не найдена!`);
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new Forbidden('Отказано в удалении. Пользователь не является владельцом карточки');
      }
      return Movie.findByIdAndRemove(movie._id);
    })
    .then((movie) => res.send({ message: 'Успешно удалена карточка:', data: movie }))
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
  
};

module.exports.createMovie = (req, res, next) => {
  const {
    text,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    text,
    owner: ownerId,
  })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};
