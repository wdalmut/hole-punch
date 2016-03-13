var Client = require('./client/instance');

var client = new Client("c2", "c1", {
  address: "127.0.0.1",
  port: 41234,
});

client.data.on('message', function(data) {
  console.log("MESSAGE", data);
});

client.listenAndServe(41236).then(function(client) {
  var address = client.address();
  console.log("client listening " + address.address + ":" + address.port);
}, function(err) {
  console.log("client error:\n" +  err.stack);
});
