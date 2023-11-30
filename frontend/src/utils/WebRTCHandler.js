import store from "../store/store";
import { setOverLay } from "../store/actions";

const defaultConstrains = {
  audio: true,
  video: true,
}

let localStream;

const showLocalStream = () => {

}

export const getLocalPrevAndInitRoomConnection = async (isRoomHots, identity, roomId = null) => {
  navigator.mediaDevices.getUserMedia(defaultConstrains).then(stream => {
    localStream = stream;
    showLocalStream(localStream);
    store.dispatch(setOverLay(false));
  }).catch(error => {
    console.log(error);
  })
}