import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonOff from "../../resources/images/cameraOff.svg";
import { useState } from "react";
import * as WebRTCHandler from "../../utils/WebRTCHandler";

const CameraButton = () => {

  const [isCamera, setIsCamera] = useState(false);

  const onclickHandler = () => {
    WebRTCHandler.toggleCamera(isCamera);
    setIsCamera(!isCamera);
  }
  return (
    <div className='video_button_container'>
      <img src={isCamera ? CameraButtonOff : CameraButtonImg}
        className="video_button_image"
        onClick={onclickHandler} />
    </div>
  );
};

export default CameraButton;