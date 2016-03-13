var Server = require('./server/instance');

var port = process.argv[2] || 41234;

var server = new Server();
server.listenAndServe(port).then(function(server) {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
}, function(err) {
  console.log("server error:\n" +  err.stack);
});
