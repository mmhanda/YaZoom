import { useNavigate } from "react-router-dom";

const Button = ({ buttonText, cancelButton = false, onClickHandler }) => {
  const button_class = cancelButton ? "join_room_cancel_button" : "join_room_success_button";
  return <button onClick={onClickHandler} className={button_class} >
    {buttonText}
  </button>
}


const JoinRoomButtons = ({ handelJoinRoom, isRoomHost }) => {
  const successButtonText = isRoomHost ? "Host" : "Join";

  const navigate = useNavigate();
  const pushToIntroductionPage = () => {
    navigate('/');
  }
  return (
    <div className="join_room_buttons_container">
      <Button buttonText={successButtonText} onClickHandler={handelJoinRoom} />
      <Button buttonText={"Cancel"} cancelButton onClickHandler={pushToIntroductionPage} />
    </div>
  );
};

export default JoinRoomButtons;