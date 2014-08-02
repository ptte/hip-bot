/* jslint node: true */
'use strict';

var lib = {
  hapi: require('hapi'),
  joi: require('joi'),
  hook: require('./lib/hook.js'),
  config: require('./config.json'),
};

var controllers = {
  hook: new lib.hook(lib.config),
};

module.exports = function Routes() {
  //
  // ## API Routes
  // See documentation in readme
  //
  var routes = [
    {
      method: 'POST',
      path: '/hook/{room}/create',
      config: {
        handler: function (request, reply) {
          controllers.hook.create(request, reply);
        },
        validate: {
          params: {
            room: [lib.joi.string(), lib.joi.number()]
          },
          payload: {
            event: lib.joi.string().required(),
            pattern: lib.joi.string().optional(),
            name: lib.joi.string().optional(),
          }
        },
      }
    },
    {
      method: 'POST',
      path: '/hook/listen',
      config: {
        handler: function (request, reply) {
          controllers.hook.listen(request, reply);
        },
      }
    },
  ];

  return routes;
};
