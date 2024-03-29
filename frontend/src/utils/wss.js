import io from "socket.io-client"
import { setRoomId, setParticipants, setSocketId } from "../store/actions";
import store from "../store/store";
import * as WebRTCHandler from "./WebRTCHandler";
import { appendToChatHistory } from './DirectMessages';

// const SERVER = "http://localhost:5002";
const SERVER = "http://10.30.177.35:5002";

export let socket = null;

export const connectWithSocketIoServer = async () => {
  socket = io(SERVER);
  socket.on("connect", () => {
    store.dispatch(setSocketId(socket.id));
  });
  socket.on('room-id', (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  })
  socket.on('room-update', (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });
  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    // inform the user which just joined that we are prepared for incoming connection
    socket.emit('conn-init', { connUserSocketId: connUserSocketId });
  });
  socket.on('conn-signal', (data) => {
    WebRTCHandler.handelSignalingData(data);
  });
  socket.on('conn-init', data => {
    const { connUserSocketId } = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });
  socket.on('user-disconnected', (data) => {
    WebRTCHandler.removePeerConnection(data)
  })
  socket.on('direct-message', (data) => {
    appendToChatHistory(data);
  })
  socket.on('global-message', data => {
    WebRTCHandler.appendNewMessage(data);
  })
}

export const createRoom = async (identity, connectOnlyWithAudio) => {
  const data = {
    identity,
    connectOnlyWithAudio,
  }
  store.dispatch(setParticipants([data]));
  socket.emit('create-room', data);
}

export const joinRoom = (identity, roomId, connectOnlyWithAudio) => {
  const data = {
    identity,
    roomId,
    connectOnlyWithAudio,
  }
  socket.emit('join-room', data);
}

export const signalPeerData = (data) => {
  socket.emit('conn-signal', data);
}

export const sendPrivateMessage = (message) => {
  socket.emit('direct-message', message);
}