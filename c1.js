var Client = require('./client/instance');

var client = new Client("c1", "c2", {
  address: "127.0.0.1",
  port: 41234,
});

client.data.on('message', function(data, rinfo) {
  console.log("MESSAGE", data);
});

client.listenAndServe(41235).then(function(client) {
  var address = client.address();
  console.log("client listening " + address.address + ":" + address.port);
}, function(err) {
  console.log("client error:\n" +  err.stack);
});
