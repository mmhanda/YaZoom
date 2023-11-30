import store from "../store/store";
import { setOverLay } from "../store/actions";
import * as wss from "./wss";
import Peer from "simple-peer"

const defaultConstrains = {
  audio: true,
  video: true,
}

let localStream;

const showLocalStream = () => { }

let peers = {};
let streams = {};

const getConfigurations = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      }
    ]
  }
}

const addStream = (stream, ConnUserSocketId) => {

}

export const prepareNewConnection = (ConnUserSocketId, isInitiator) => {
  const configurations = getConfigurations();

  peers[ConnUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configurations,
    stream: localStream,
  });

  peers[ConnUserSocketId].on('signal', (data) => {
    // web rtc offer, web rtc answer (sdp informations), ice candidates
    const signalData = {
      signal: data,
      ConnUserSocketId: ConnUserSocketId,
    }
    wss.signalPeerData(signalData);
  });
  peers[ConnUserSocketId].on('stream', (stream) => {
    console.log("data streaming");
    addStream(stream, ConnUserSocketId);
    streams = [...streams, stream];
  })
}

export const getLocalPrevAndInitRoomConnection = async (isRoomHots, identity, roomId = null) => {
  await navigator.mediaDevices.getUserMedia(defaultConstrains).then(stream => {
    localStream = stream;
    showLocalStream(localStream);
    store.dispatch(setOverLay(false));
    try {

      isRoomHots ? wss.createRoom(identity) : wss.joinRoom(identity, roomId);
    } catch (error) {

    }
  }).catch(error => {
    console.log(error);
  })
}

export const handelSignalingData = (data) => {
  // in here the signal method it handels the offer and answer from the clients
  peers[data.ConnUserSocketId].signal(data.signal)
}