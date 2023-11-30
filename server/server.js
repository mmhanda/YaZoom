const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');

const PORT = process.env.PORT || 5002;
const app = express();

const server = http.createServer(app);

app.use(cors()); // no specified port the cors middleware allow every one to connect it just for security reason

let connectedUsers = [];
let rooms = [];

app.get('/api/room-exists/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find(room => room.id === roomId);

  if (room) {
    if (room.connectedUsers.length > 3) {
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

const handleCreateNewRoom = (data, socketId) => {
  const { identity } = data;
  const roomId = uuidv4();

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socketId.id,
    roomId,
  }

  connectedUsers = [...connectedUsers, newUser];

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  }

  socketId.join(roomId);
  rooms = [...rooms, newRoom];
  socketId.emit('room-id', { roomId });
}

const handelJoinRoom = (data, socketId) => {
  const { identity, roomId } = data;

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socketId.id,
    roomId,
  }

  const room = rooms.find(room => room.id == roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];
  socketId.join(room.id);
  connectedUsers = [...connectedUsers, newUser];
  io.to(room.id).emit('room-update', { connectedUsers: room.connectedUsers });
}

const handelDisconnect = (socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);

    room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
    socket.leave(user.roomId);
    if (room.connectedUsers.length > 0)
      io.to(room.id).emit('room-update', { connectedUsers: room.connectedUsers });
    else
      rooms = rooms.filter((r) => r.id !== user.roomId);
  }
}

io.on("connection", (socket) => {
  socket.on('create-room', (data) => {
    handleCreateNewRoom(data, socket);
  })
  socket.on('join-room', (data) => {
    handelJoinRoom(data, socket);
  })
  socket.on("disconnect", () => {
    handelDisconnect(socket);
  })
})

server.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});