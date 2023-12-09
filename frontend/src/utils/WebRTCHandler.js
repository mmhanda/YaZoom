import store from "../store/store";
import { setOverLay, setMessages } from "../store/actions";
import * as wss from "./wss";
import Peer from "simple-peer";

const defaultConstrains = {
  audio: true,
  video: true, // for full quality
  // video: {
  //   width: "480",
  //   height: "300",
  // },
}

const connectOnlyWithAudioConst = {
  audio: true,
  video: false,
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
  if (store.getState().app.connectOnlyWithAudio) {
    videoContainer.appendChild(getOnlyWithAudioLabel());
  }
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

  videoElement.addEventListener('click', () => {
    if (videoElement.classList.contains('full_screen')) {
      videoElement.classList.remove('full_screen')
    } else {
      videoElement.classList.add('full_screen');
    }
  })

  videoContainer.appendChild(videoElement);

  const participants = store.getState().app.participants;
  const participant = participants.find((p) => p.socketId === connUserSocketId);
  if (participant?.connectOnlyWithAudio) {
    videoContainer.appendChild(getOnlyWithAudioLabel());
  }
  // else videoContainer.style.position = 'static'
  videosContainer.appendChild(videoContainer);
}

const getOnlyWithAudioLabel = () => {
  const labelContainer = document.createElement('div');
  labelContainer.classList.add("label_only_audio_container");
  const label = document.createElement('p');
  label.classList.add('label_only_audio_text');
  label.innerHTML = 'Only Audio';

  labelContainer.appendChild(label);
  return labelContainer;
}

export const getLocalPrevAndInitRoomConnection = async (isRoomHots, identity, roomId = null, connectOnlyWithAudio) => {
  await navigator.mediaDevices.getUserMedia(connectOnlyWithAudio ? connectOnlyWithAudioConst : defaultConstrains).then(stream => {
    localStream = stream;
    showLocalVideoPreview(localStream);
    store.dispatch(setOverLay(false));
    try {
      isRoomHots ? wss.createRoom(identity, connectOnlyWithAudio) : wss.joinRoom(identity, roomId, connectOnlyWithAudio);
    } catch (error) {
      console.log(error);
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
        urls: 'stun:stun.l.google.com:19302',
      }
    ]
  }
};

export const appendNewMessage = (messageData) => {
  // console.log()
  const messages = store.getState().app.messages;
  store.dispatch(setMessages([...messages, messageData]));
}

const messengerChannel = 'messenger';

export const sendMessageUsingDataChannel = (messageContent) => {
  const identity = store.getState().app.identity;

  const message = {
    identity,
    content: messageContent,
    messageCreatedByMe: true,
  }
  appendNewMessage(message);

  const messageData = {
    identity,
    content: messageContent,
    roomId: store.getState().app.roomId,
  }

  wss.socket.emit('global-message', messageData);
}

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfigurations();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
    channelName: messengerChannel,
  });

  const dataChannel = peers[connUserSocketId]._pc.createDataChannel(messengerChannel);

  peers[connUserSocketId].dataChannel = dataChannel;
  dataChannel.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    appendNewMessage(messageData);
  };


  peers[connUserSocketId].on('data', (data) => {
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  });

  peers[connUserSocketId].on('signal', (data) => {
    // sending the offer (spd information will be sent and (ice candidate will be exchanged)) from the initiator AND receiving the offer in here
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (stream) => {
    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  peers[connUserSocketId].on(('error'), (error) => {
    console.log("Peer Connection Error: ", error);
  });

  peers[connUserSocketId].on('close', error => {
    console.log("Peer Connection Closed: ", error);
  });
};

export const handelSignalingData = (data) => {
  // inside signal it checks for offer and answer
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {

  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoElement = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoElement) {
    const tracks = videoElement.srcObject.getTracks(); // get all the videos playing in that id and stop them;
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
    videoContainer.removeChild(videoElement);
    videoContainer.parentNode.removeChild(videoContainer); // remove the video container it self from the videosContainer;
    if (peers[socketId]) { // remove from the connection from the Peers
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
}

export const toggleMic = (MuteUnmute) => {
  localStream.getAudioTracks()[0].enabled = MuteUnmute;
}

export const toggleCamera = (EnableDisable) => {
  localStream.getVideoTracks()[0].enabled = EnableDisable;
}

const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index_ in stream.getTracks()) {
        if (peers[socket_id].streams[0].getTracks()[index].kind
          === stream.getTracks()[index_].kind) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index], // the stream that i want to replace
            stream.getTracks()[index_], // the stream that i want to replace with
            peers[socket_id].streams[0] // this arg in which streams table you want to change
          );
          break;
        }
      }
    }
  }
}

export const toggleScreenShare = (isScreenSharingActive, screenSharingStream = null) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
}