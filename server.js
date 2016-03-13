var Server = require('./server/instance');

var server = new Server();
server.listenAndServe(41234).then(function(server) {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
}, function(err) {
  console.log("server error:\n" +  err.stack);
});
