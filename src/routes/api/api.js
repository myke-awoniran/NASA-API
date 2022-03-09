const api = require('express').Router();
const launchRoutes = require('../launchRoutes');
const planetRoutes = require('../planetRouter');

api.use('/planets', planetRoutes);
api.use('/launches', launchRoutes);
module.exports = api;
