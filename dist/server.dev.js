"use strict";

var http = require('http');

var app = require('./app');

var dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});
var server = http.createServer(app);

var _require = require('./src/model/planets'),
    getPlanets = _require.getPlanets;

var port = process.env.PORT || 8000;

function startServer() {
  return regeneratorRuntime.async(function startServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getPlanets());

        case 2:
          server.listen(port, function () {
            console.log("App running on port ".concat(port));
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

startServer();