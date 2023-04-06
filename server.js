const express = require('express');
const app = express(),
      port = process.env.PORT || 3080;
const cors = require('cors');
app.use(cors());
const http = require('http');
const httpServer = http.createServer(app);

app.use(express.static(process.cwd()+'/twirch/dist/twirch/'));

app.get('/*', (req, res) => {
  res.sendFile(process.cwd()+'/twirch/dist/twirch/index.html');
});

const { Server } = require('socket.io');
const io = new Server(httpServer, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: [
      'https://twirch.io',
      'http://localhost:3080'
    ],
    preflightContinue: true
  }
});

io.on('connect_error', () => {
  // revert to classic upgrade
  socket.io.opts.transports = ['polling', 'websocket'];
});

io.on('connection', (socket) => {
  socket.on('join channels', (channels) => {
    console.debug(`socket ${socket.id} joining channels: ` + channels.toString());
    channels.toString().split(',').forEach(element => {
      socket.join(`#${element}`);
    });
  });
});

io.of('/').adapter.on('create-room', (room) => {
  console.debug(`Room ${room} was created`);
  twitchClient.join(room).catch((error) => { console.error(error); });
});

io.of('/').adapter.on('delete-room', (room) => {
  console.debug(`Room ${room} was deleted`);
  twitchClient.part(room).catch((error) => { console.error(error); });
});

const tmi = require('tmi.js');

const twitchClient = new tmi.Client({
  options: {
    skipMembership: true,
    debug: false,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
});

twitchClient.connect().catch((error) => {
  console.error(error);
});

twitchClient.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  // Echo message to clients that care about this channel
  io.to(channel).emit('chat message', {...tags, 'channel': channel, 'message': message})
});

httpServer.listen(port, () => {
  console.log('listening on *:3080');
});
