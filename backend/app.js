require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/rateLimit');

const { NODE_ENV, PORT, DB_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

console.log(mongoose.Error);

app.use(requestLogger);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server started successfully');
});
