var lib = {
  hipchat: require('/Users/ptte/Projects/node-hipchat'),
  hapi: require('hapi'),
};

//
// Hook controller
// Expects a config object with at least a hipchat.token
//
var Hook = module.exports = function Hook(config) {
  this.options = null;
  this.Hipchat = new lib.hipchat({token: config.hipchat.token});
};

// Hook.prototype.listen = function (request, reply) {

// };

Hook.prototype.create = function (request, reply) {
  var options = {
    room: request.params.room,
    event: request.payload.event,
    pattern: request.payload.pattern || null,
    name: request.payload.name || null,
    callback_url: 'http://requestb.in/19jbcqh1',
  };

  this.Hipchat.createWebHook(options, function (error, response) {
    if (error) {
      // Our attempt failed for some reason
      var hapi_error = lib.hapi.error.badRequest('Hipchat did not like us');
      hapi_error.output.statusCode = response.statusCode;
      hapi_error.output.payload.hipchat = response;
      return reply(hapi_error);
    }

    reply({
      message: 'creation successful',
      hipchat: response
    });
  });
};
