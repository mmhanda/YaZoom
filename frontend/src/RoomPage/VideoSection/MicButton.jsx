import MicButtonImg from "../../resources/images/micOff.svg";
import MicButtonOff from "../../resources/images/mic.svg";
import { useState } from "react";

const MicButton = () => {

  const [isMicMuted, setIsMicMuted] = useState(false);

  const onclickHandler = () => {
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