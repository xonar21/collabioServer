require('dotenv').config();

const express = require('express');

const { errors } = require('celebrate');

const helmet = require('helmet');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

//const auth = require('./middlewares/auth');

const errHandler = require('./middlewares/errHandler');

const routes = require('./routes');

const cors = require('./middlewares/cors');

const limiter = require('./middlewares/limiter');

//const { registerValid, loginValid } = require('./middlewares/validation');

//const { login, createUser } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/loger');
const { db } = require('./models/user');

const { PORT = 4000 } = process.env;

const { DATA_BASE, NODE_ENV } = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

//app.post('/signup', registerValid, createUser);

//app.post('/signin', loginValid, login);
// mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });
app.use(routes);

app.use(errorLogger);
//app.use(auth);

app.use(errors());

app.use(errHandler);

app.listen(PORT);
