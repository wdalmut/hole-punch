var _ = require('underscore');
var Client = require('./client/instance');

var params = _.object(
  ["node", "program", "server", "port", "name", "connect"],
  process.argv
);

var client = new Client(params.name, params.connect, {
  address: params.server,
  port: params.port,
});

client.data.on('message', function(data, rinfo) {
  console.log("MESSAGE", data, rinfo);
});

client.listenAndServe().then(function(client) {
  var address = client.address();
  console.log("client listening " + address.address + ":" + address.port);
}, function(err) {
  console.log("client error:\n" +  err.stack);
});
