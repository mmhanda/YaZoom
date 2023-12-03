import { useState } from "react";
import switchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as WebRTCHandler from "../../utils/WebRTCHandler";

const constrains = {
  audio: false,
  // video: true,
  video: {
    width: { ideal: 1920, max: 1920 },
    height: { ideal: 1080, max: 1080 },
  },
};

const SwitchToScreenSharingButton = () => {

  const [sharingActive, setSharingActive] = useState(false);
  const [screenStream, setScreenStream] = useState(null);

  const change_screen_sharing_state = async () => {
    if (!sharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constrains);
      } catch (error) {
        console.log("Error Accessing the Screen: ", error);
      }
      if (stream) {
        WebRTCHandler.toggleScreenShare(sharingActive, stream);
        setScreenStream(stream);
        setSharingActive(true);
      }
    } else {
      WebRTCHandler.toggleScreenShare(sharingActive);
      setSharingActive(false);
      screenStream.getTracks().forEach((stream) => stream.stop());
      setScreenStream(null);
    }
  }
  return (<>
    <div className="video_button_container">
      <img className="video_button_image" src={switchImg} onClick={change_screen_sharing_state} alt="video_button" />
    </div>
    <div>
      {sharingActive && <LocalScreenSharingPreview stream={screenStream} />}
    </div>
  </>
  );
};

export default SwitchToScreenSharingButton;