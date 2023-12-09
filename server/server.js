const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');
const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

const server = http.createServer(app);

app.use(cors()); // no specified port the cors middleware allow every one to connect it just for security reason

let connectedUsers = [];
let rooms = [];

app.get('/api/room-exists/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find(room => room.id === roomId);

  if (room) {
    if (room.connectedUsers.length > 9) {
      return res.json({ roomExists: true, full: true })
    } else {
      return res.json({ roomExists: true, full: false })
    }
  } else {
    return res.json({ roomExists: false });
  }
})

app.get('/api/room-participants/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find(room => room.id === roomId);
  return res.json({ participants: room.connectedUsers });
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET'],
  }
});

const handleCreateNewRoom = (data, socket) => {
  const { identity, connectOnlyWithAudio } = data;
  const roomId = uuidv4();

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    connectOnlyWithAudio,
  }

  connectedUsers = [...connectedUsers, newUser];

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  }

  socket.join(roomId);
  rooms = [...rooms, newRoom];
  socket.emit('room-id', { roomId });
}

const handelJoinRoom = (data, socket) => {
  const { identity, roomId, connectOnlyWithAudio } = data;

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    connectOnlyWithAudio,
  }

  const room = rooms.find(room => room.id == roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];
  socket.join(room.id);
  connectedUsers = [...connectedUsers, newUser];
  room.connectedUsers.forEach(user => {
    if (user.socketId !== socket.id) {
      const data = { connUserSocketId: socket.id }
      io.to(user.socketId).emit("conn-prepare", data);
    }
  });

  io.to(room.id).emit('room-update', { connectedUsers: room.connectedUsers });
}

const handelDisconnect = (socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);

    room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
    socket.leave(user.roomId);
    if (room.connectedUsers.length > 0) {
      io.to(room.id).emit('user-disconnected', { socketId: socket.id });
      io.to(room.id).emit('room-update', { connectedUsers: room.connectedUsers });
    }
    else
      rooms = rooms.filter((r) => r.id !== user.roomId);
  }
}

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;
  const signalData = { signal, connUserSocketId: socket.id }
  io.to(connUserSocketId).emit('conn-signal', signalData);
}

const initializeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  io.to(connUserSocketId).emit('conn-init', initData);
}

const handelDirectMessage = (data, socket) => {
  if (connectedUsers.find(connUser => connUser.socketId === data.receiverSocketId)) {
    const receiverData = {
      authorSocketId: socket.id,
      messageContent: data.messageContent,
      isAuthor: false,
      identity: data.identity,
    }
    io.to(data.receiverSocketId).emit('direct-message', receiverData);
    const authorData = {
      receiverSocketId: data.receiverSocketId,
      messageContent: data.messageContent,
      isAuthor: true,
      identity: data.identity,
    }
    socket.emit('direct-message', authorData);
  }
}

const handleGlobalMsgs = (data, socket) => {
  const { identity, roomId, content } = data;
  io.to(roomId).except(socket.id).emit("global-message", { identity, content });
}

io.on("connection", (socket) => {
  socket.on('create-room', (data) => {
    handleCreateNewRoom(data, socket);
  });
  socket.on('join-room', (data) => {
    handelJoinRoom(data, socket);
  });
  socket.on("disconnect", () => {
    handelDisconnect(socket);
  });
  socket.on('conn-signal', (data) => {
    signalingHandler(data, socket);
  });
  socket.on("conn-init", data => {
    initializeConnectionHandler(data, socket);
  });
  socket.on("direct-message", (data) => {
    handelDirectMessage(data, socket);
  })
  socket.on('global-message', data => {
    handleGlobalMsgs(data, socket);
  })
})

server.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});