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

io.on("connection", (socket) => {
  socket.on('create-room', (data) => {
    console.error("data ", data);
  })
})

server.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});