import io from "socket.io-client"
import { setRoomId, setParticipants } from "../store/actions";
import store from "../store/store";
import * as WebRTCHandler from "./WebRTCHandler";

const SERVER = "http://localhost:5002";

let socket = null;

export const connectWithSocketIoServer = async () => {
  socket = io(SERVER);

  socket.on("connect", () => { });

  socket.on('room-id', (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  })
  socket.on('room-update', (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });
  socket.on('conn-prepare', (data) => {
    const { ConnUserSocketId } = data;
    WebRTCHandler.prepareNewConnection(ConnUserSocketId, false);
    socket.emit('conn-init', { ConnUserSocketId: ConnUserSocketId });
  });
  socket.on("conn-signal", (data) => {
    WebRTCHandler.handelSignalingData(data);
  })
  socket.on('conn-init', (data) => {
    WebRTCHandler.prepareNewConnection(data.ConnUserSocketId, true);
  })
}

export const createRoom = async (identity) => {
  const data = {
    identity,
  }
  socket.emit('create-room', data);
}

export const joinRoom = (identity, roomId) => {
  const data = {
    identity,
    roomId,
  }
  socket.emit('join-room', data);
}

export const signalPeerData = (data) => {
  socket.emit('conn-signal', data);
}