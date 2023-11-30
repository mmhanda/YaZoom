import { useState } from "react";
import switchImg from "../../resources/images/switchToScreenSharing.svg";

const SwitchToScreenSharingButton = () => {

  const [sharingActive, setSharingActive] = useState(false);

  const change_screen_sharing_state = () => {
    setSharingActive(!setSharingActive);
  }
  return (
    <div className="video_button_container">
      <img className="video_button_image" src={switchImg} onClick={change_screen_sharing_state} />
    </div>
  );
};

export default SwitchToScreenSharingButton;