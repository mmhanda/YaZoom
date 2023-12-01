import store from "../store/store";
import { setOverLay } from "../store/actions";
import * as wss from "./wss";
import Peer from "simple-peer"

const defaultConstrains = {
  audio: true,
  video: true,
}

let localStream;

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

const showLocalStream = (stream) => {
  const videosContainer = document.getElementById('videos_portal');
  videosContainer.classList.add('videos_portal_styles');
  const videoContainer = document.getElementById('div');
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => { // manually playing the video just for the old browsers that do not have auto play
    videoElement.play();
  }
  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
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