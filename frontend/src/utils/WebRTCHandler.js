import store from "../store/store";
import { setOverLay } from "../store/actions";
import * as wss from "./wss";
import Peer from "simple-peer";

const defaultConstrains = {
  audio: true,
  video: true,
}

let localStream;

const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById('videos_portal');
  videosContainer.classList.add('videos_portal_styles');
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video_track_container');
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };
  
  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
}

const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById('videos_portal');
  const videoContainer = document.createElement('div');
  videoContainer.id = connUserSocketId;
  videoContainer.classList.add('video_track_container');
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };
  
  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
}

export const getLocalPrevAndInitRoomConnection = async (isRoomHots, identity, roomId = null) => {
  await navigator.mediaDevices.getUserMedia(defaultConstrains).then(stream => {
    localStream = stream;
    showLocalVideoPreview(localStream);
    store.dispatch(setOverLay(false));
    try {
      isRoomHots ? wss.createRoom(identity) : wss.joinRoom(identity, roomId);
    } catch (error) {

    }
  }).catch(error => {
    console.log(error);
  })
}

let peers = {};
let streams = [];

const getConfigurations = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  }
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  console.log("prepareNewPeerConnection");
  const configuration = getConfigurations();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  })

  peers[connUserSocketId].on('signal', (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (stream) => {
    console.log("new Stream");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handelSignalingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal);
  // console.log(peers[data.connUserSocketId]);
};