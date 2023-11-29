import "./RoomPage.css";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import VideoSection from "./VideoSection/VideoSection";

const RoomPage = () => {
  console.log("pushToJoinRoomPageAsHost");

  return (
    <div className="room_container">
      <ParticipantsSection />
      <ChatSection />
      <VideoSection />
      RoomPage
    </div>
  );
};

export default RoomPage;