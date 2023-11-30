import "./RoomPage.css";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import VideoSection from "./VideoSection/VideoSection";
import RoomLabel from "./RoomLabel";
import { connect } from 'react-redux';
import * as webRTCHandler from "../utils/WebRTCHandler";
import { useEffect } from "react";

const RoomPage = ({ roomId, identity, isRoomHost }) => {

  useEffect(() => {
    webRTCHandler.getLocalPrevAndInitRoomConnection(isRoomHost, identity, roomId);
  }, [])

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStoreStateToProps)(RoomPage);