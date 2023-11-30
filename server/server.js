const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');

const PORT = process.env.PORT || 5002;
const app = express();

const server = http.createServer(app);

app.use(cors()); // no specified port the cors middleware allow every one to connect it just for security reason

const connectedUser = [];
const rooms = [];

app.get('/api/room-exists/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find(room => room.id === roomId);

  if (room) {
    if (room.connectedUser.length > 3) {
      return res.json({ roomExists: true, full: true })
    } else {
      return res.json({ roomExists: true, full: false })
    }
  } else {
    return res.json({ roomExists: false });
  }
})

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET'],
  }
});

const handleCreateNewRoom = (data, clientId) => {
  const { identity } = data;
  const roomId = uuidv4();
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: clientId,
    roomId,
  }
  connectedUser.push(newUser);

  // let tab.push
  const newRoom = {
    id: roomId,
    connectedUser: [newUser],
  }

  io.to(clientId).emit('room-id', { roomId });
  io.sockets.sockets.get(clientId).join(roomId);
  rooms.push(newRoom);
  io.to(roomId).emit('room-update', { connectedUser: newRoom.connectedUser });
}

const handelJoinRoom = (data, clientId) => {
  const { identity, roomId } = data;
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: clientId,
    roomId,
  }

  const room = rooms.find(room => room.id === roomId);
  if (room) {
    room.connectedUser.push(newUser);
    io.sockets.sockets.get(clientId).join(roomId);
    console.log(room.connectedUser);
    io.to(roomId).emit('room-update', { connectedUser: room.connectedUser });
  }
}

io.on("connection", (socket) => {
  socket.on('create-room', (data) => {
    handleCreateNewRoom(data, socket.id);
  })
  socket.on('join-room', (data) => {
    handelJoinRoom(data, socket.id);
  })
})

server.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});