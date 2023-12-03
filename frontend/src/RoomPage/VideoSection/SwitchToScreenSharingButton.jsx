import { useState } from "react";
import switchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";

const constrains = {
  audio: false,
  video: true,
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
        setScreenStream(stream);
        setSharingActive(true);
      }
    } else {
      setSharingActive(false);
      screenStream.getTracks().forEach((stream) => stream.stop());
      setScreenStream(null);
    }
    // setSharingActive(!setSharingActive);
  }
  return (<>
    <div className="video_button_container">
      <img className="video_button_image" src={switchImg} onClick={change_screen_sharing_state} />
    </div>
    <div>
      {sharingActive && <LocalScreenSharingPreview stream={screenStream} />}
    </div>
  </>
  );
};

export default SwitchToScreenSharingButton;