import MicButtonImg from "../../resources/images/micOff.svg";
import MicButtonOff from "../../resources/images/mic.svg";
import { useState } from "react";
import * as WebRTCHandler from "../../utils/WebRTCHandler";

const MicButton = () => {

  const [isMicMuted, setIsMicMuted] = useState(true);

  const onclickHandler = () => {
    WebRTCHandler.toggleMic(!isMicMuted);
    setIsMicMuted(!isMicMuted);
  }
  return (
    <div className='video_button_container'>
      <img src={isMicMuted ? MicButtonOff : MicButtonImg}
        className="video_button_image"
        onClick={onclickHandler} />
    </div>
  );
};

export default MicButton;