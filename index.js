/* jslint node: true */
'use strict';

var lib = {
  hapi: require('hapi'),
  async: require('async'),
  _: require('lodash'),
  config: require('./config.json'),
  routes: require('./routes.js')(),
};

var server = new lib.hapi.Server(
  lib.config.interface,
  lib.config.port
);

server.route(lib.routes);

server.start(function () {
  console.log("Server listening on " + lib.config.port);
});
