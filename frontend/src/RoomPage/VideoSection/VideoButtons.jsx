import MicButton from './MicButton';
import CameraButton from './CameraButton';
import LeaveRoomButton from './LeaveRoomButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import { connect } from "react-redux";

const VideoButtons = (props) => {
  return (
    <div className='video_buttons_container'>
      <MicButton />
      {!props.app.connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!props.app.connectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(VideoButtons);