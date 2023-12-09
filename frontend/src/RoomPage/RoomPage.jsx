import "./RoomPage.css";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import VideoSection from "./VideoSection/VideoSection";
import RoomLabel from "./RoomLabel";
import { connect } from 'react-redux';
import * as webRTCHandler from "../utils/WebRTCHandler";
import { useEffect } from "react";
import OverLay from "./OverLay";

const RoomPage = (props) => {

  const { roomId, identity, isRoomHost, showOverlay, connectOnlyWithAudio } = props.app;

  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const home_url = window.location.origin;
      window.location.href = home_url;
    } else {
      webRTCHandler.getLocalPrevAndInitRoomConnection(isRoomHost, identity, roomId, connectOnlyWithAudio);
    }
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <OverLay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);