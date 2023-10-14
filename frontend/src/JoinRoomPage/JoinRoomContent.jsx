import { useState } from "react";
import JoinRoomInput from "./JoinRoomInput";
import { useSelector } from "react-redux";
import OnlyWithAudioCheckBox from "./OnlyWithAudioCheckBox";
import { setConnectOnlyWithAudio } from "../store/actions";
import { connect } from "react-redux";

const JoinRoomContent = (props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const { isRoomHost, connectOnlyWithAudio } = useSelector(
    (state) => state.app
  );
  const { setConnectOnlyWithAudio } = props;

  return (
    <>
      <JoinRoomInput
        roomIdValue={roomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        setRoomIdValue={setRoomIdValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckBox
        setConnectOnlyWithAudio={setConnectOnlyWithAudio}
        connectOnlyWithAudio={connectOnlyWithAudio}
      />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    // setConnectOnlyWithAudio: (OnlyWithAudio) =>
    //   dispatch(setConnectOnlyWithAudio(OnlyWithAudio)),
  };
};

export default connect(mapActionsToProps)(JoinRoomContent);
