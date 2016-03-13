var q = require('q');
var _ = require('underscore');

module.exports = function() {
  return {
    "brain": {},
    "server": null,
    "error": function(d) {
      return function(err) {
        server.close();
        d.reject(err);
      };
    },
    "listening": function(server, d) {
      return function() {
        d.resolve(server);
      };
    },
    "message": function(server) {
      return function(msg, rinfo) {
        var data = JSON.parse(msg);

        if (data.name) {
          data.address = rinfo.address;
          data.port = rinfo.port;

          server.brain[data.name] = data;
        }

        if (data.connect) {
          if (server.brain[data.connect]) {
            var helper = _.pick(server.brain[data.connect], "address", "port", "name");
            helper.type = "connect";
            var message = JSON.stringify(helper);
            server.server.send(message, 0, message.length, data.port, data.address);
          }
        }
      };
    },
    "listenAndServe": function(port) {
      var d = q.defer();

      var dgram = require('dgram');
      var server = dgram.createSocket('udp4');

      this.server = server;

      server.on('error', this.error(d));
      server.on('listening', this.listening(server, d));
      server.on('message', this.message(this));

      server.bind(port);

      return d.promise;
    },
  };
};
