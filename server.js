// run `node index.js` in the terminal

const express = require('express');
const app = express(),
      port = process.env.PORT || 3080;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const tmi = require('tmi.js');

const twitchClient = new tmi.Client({
  options: {
    skipMembership: true,
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
});

twitchClient.connect().catch((error) => {
  console.error(error);
});

app.use(express.static(process.cwd()+"/app/dist/twirch/"));
app.get('/', (req, res) => {
  res.sendFile(process.cwd()+"/app/dist/twirch/index.html");
});

twitchClient.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  // Echo message to clients that care about this channel
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

server.listen(port, () => {
  console.log('listening on *:3080');
});
