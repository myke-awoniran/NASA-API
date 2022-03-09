"use strict";

var express = require('express');

var path = require('path');

var cors = require('cors');

var morgan = require('morgan');

var planetRoutes = require('./src/routes/planetRouter');

var launchRoutes = require('./src/routes/launchRoutes');

var app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use('/home', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to NASA API by Micheal Awoniran'
  });
});
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/planets', planetRoutes);
app.use('/launches', launchRoutes);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
module.exports = app;