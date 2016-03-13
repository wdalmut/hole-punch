var q = require('q');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

module.exports = function(name, other, remote) {
  return {
    "name": name,
    "other": other,
    "brain": {},
    "server": null,
    "remote": remote,
    "intervalId": null,
    "data": new EventEmitter(),
    "error": function(server, d) {
      return function(err) {
        server.close();
        d.reject(err);
      };
    },
    "listening": function(server, d) {
      var that = this;
      return function() {
        d.resolve(server);

        that.intervalId = setInterval(function() {
          var data = JSON.stringify({"name": that.name, "connect": that.other});
          that.server.send(data, 0, data.length, remote.port, remote.address);
        }, 1000);
      };
    },
    "clearInterval": function() {
      clearInterval(this.intervalId);
    },
    "message": function(server) {
      var that = this;
      return function(msg, rinfo) {
        var data = JSON.parse(msg);

        if (data.type) {
          if (data.type == "connect") {
            that.clearInterval();

            that.sendDataTo(data);
          }

          if (data.type == "data") {
            that.data.emit("message", data, rinfo);
          }
        }
      };
    },
    "sendDataTo": function(remote) {
      var that = this;
      setInterval(function() {
        var data = JSON.stringify({
          "type": "data",
          "body": "OK",
        });
        that.server.send(data, 0, data.length, remote.port, remote.address);
      }, 1000);
    },
    "listenAndServe": function(port) {
      var d = q.defer();

      var dgram = require('dgram');
      var server = dgram.createSocket('udp4');

      this.server = server;

      server.on('error', this.error(server, d));
      server.on('listening', this.listening(server, d));
      server.on('message', this.message(this));

      server.bind(port);

      return d.promise;
    },
  };
};
