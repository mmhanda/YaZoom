import io from "socket.io-client"
import { setRoomId } from "../store/actions";
import store from "../store/store";

const SERVER = "http://localhost:5002";

let socket = null;

export const connectWithSocketIoServer = () => {
  socket = io(SERVER);
  socket.on("connect", () => { });
}

export const createRoom = (identity) => {
  const data = {
    identity,
  }
  socket.emit('create-room', data);
  socket.on('room-id', (data) => {
    const { roomId } = data;
    console.log("roomId ", roomId);
    store.dispatch(setRoomId(roomId));
  })
}

export const joinRoom = (identity, roomId) => {
  const data = {
    identity,
    roomId,
  }
  socket.emit('join-room', data);
}