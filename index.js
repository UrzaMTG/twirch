// run `node index.js` in the terminal

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const tmi = require('tmi.js');

const client = new tmi.Client({
  options: {
    skipMembership: true,
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
});

client.connect().catch((error) => {
  console.error(error);
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  // Echo message to clients that care about this channel
});

/*io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});*/

server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
