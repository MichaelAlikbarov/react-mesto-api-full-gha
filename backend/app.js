const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/rateLimit');

const { PORT = 5000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
