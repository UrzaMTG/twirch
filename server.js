// run `node index.js` in the terminal

const express = require('express');
const app = express(),
      port = process.env.PORT || 3080;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${port}`,
  },
});

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

twitchClient.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  // Echo message to clients that care about this channel
  io.to(channel).emit("chat message", tags, message)
});

twitchClient.connect().catch((error) => {
  console.error(error);
});

io.on('connection', (socket) => {
  socket.on('join channels', (channels) => {
    console.log(`socket ${socket.id} joined channels: ` + channels);
  });
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`Room ${room} was created`);
});

io.of("/").adapter.on("delete-room", (room) => {
  console.log(`Room ${room} was deleted`);
});

app.use(express.static(process.cwd()+"/app/dist/twirch/"));
app.get('/', (req, res) => {
  res.sendFile(process.cwd()+"/app/dist/twirch/index.html");
});

server.listen(port, () => {
  console.log('listening on *:3080');
});
