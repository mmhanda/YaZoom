const LeaveRoomButton = () => {
  const handelRoomDisconnection = () => {
    const home_url = window.location.origin;
    window.location.href = home_url;
  }
  return (
    <div className='video_button_container'>
      <button className='video_button_end' onClick={handelRoomDisconnection}>Leave Room</button>
    </div>
  );
};

export default LeaveRoomButton;