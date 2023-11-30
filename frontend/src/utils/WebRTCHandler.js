import store from "../store/store";
import { setOverLay } from "../store/actions";
import * as wss from "./wss";

const defaultConstrains = {
  audio: true,
  video: true,
}

let localStream;

const showLocalStream = () => {

}

export const getLocalPrevAndInitRoomConnection = async (isRoomHots, identity, roomId = null) => {
  await navigator.mediaDevices.getUserMedia(defaultConstrains).then(stream => {
    localStream = stream;
    showLocalStream(localStream);
    store.dispatch(setOverLay(false));
    isRoomHots ? wss.createRoom(identity) : wss.joinRoom(identity, roomId);
  }).catch(error => {
    console.log(error);
  })
}