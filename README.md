# Hole Punching technique

Just an example about P2P using the hole punching technique over UDP/IP

## Start the server

```js
node server.js
```

## Start clients

```sh
# start a client
node client.js 1.1.1.1 41234 client1 client2

# start another client
node client.js 1.1.1.1 41234 client2 client1
```

## The output

After few seconds you should see something:

```sh
MESSAGE { type: 'data', body: 'OK' } { address: '2.2.2.2',
  family: 'IPv4',
  port: 41235,
  size: 27 }
```
