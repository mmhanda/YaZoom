const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? "Host meeting" : "Join meeting";

  return <p className={`join-room-title ${isRoomHost ? 'host' : 'join'}`}>{titleText}</p>;
};

export default JoinRoomTitle;
