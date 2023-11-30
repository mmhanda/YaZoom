import io from "socket.io-client"
import { setRoomId, setParticipants } from "../store/actions";
import store from "../store/store";

const SERVER = "http://localhost:5002";

let socket = null;

export const connectWithSocketIoServer = async () => {
  socket = io(SERVER);
  socket.on("connect", () => { });
}

export const createRoom = async (identity) => {
  const data = {
    identity,
  }
  socket.emit('create-room', data);
  socket.on('room-id', (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  })
  socket.on('room-update', (data) => {
    console.log("room-update");
    const { connectedUser } = data;
    console.log(connectedUser);
    store.dispatch(setParticipants(connectedUser));
  });
}

export const joinRoom = (identity, roomId) => {
  const data = {
    identity,
    roomId,
  }
  socket.emit('join-room', data);
}