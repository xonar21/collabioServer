const { celebrate, Joi, Segments } = require('celebrate');

const userValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    type: Joi.string().min(2).max(30),
  }),
});

const movieValid = celebrate({
  body: Joi.object().keys({
    text: Joi.string().required().min(1).max(10000),
  }),
});

const parameterIdValid = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().length(24),
  }),
});

module.exports = {
  movieValid,
  parameterIdValid,
  userValid,
};
