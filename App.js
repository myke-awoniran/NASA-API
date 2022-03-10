const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const api = require('./src/routes/api/api');
const AppError = require('./src/utils/AppError');
const errHandler = require('./src/controllers/errController');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

app.use('/v1/home', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to NASA API by Micheal Awoniran',
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', api);

app.use('*', (req, res, next) => {
  return next(
    new AppError(`can't find this ${req.originalUrl} on this server`, 404)
  );
});

app.use(errHandler);
module.exports = app;
