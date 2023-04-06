const express = require('express');
const app = express(),
      port = process.env.PORT || 3080;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  transports: ['websocket']
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

twitchClient.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  // Echo message to clients that care about this channel
  io.to(channel).emit('chat message', {...tags, 'channel': channel, 'message': message})
});

twitchClient.connect().catch((error) => {
  console.error(error);
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

app.use((req, res, next) => {
  const corsWhitelist = [
      'http://localhost',
      'https://twirch-production.up.railway.app'
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  next();
});

app.use(express.static(process.cwd()+'/twirch/dist/twirch/'));

app.get('/*', (req, res) => {
  res.sendFile(process.cwd()+'/twirch/dist/twirch/index.html');
});

server.listen(port, () => {
  console.log('listening on *:3080');
});
