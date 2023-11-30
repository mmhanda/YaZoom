import { useState } from "react";
import JoinRoomInput from "./JoinRoomInput";
import { useSelector } from "react-redux";
import OnlyWithAudioCheckBox from "./OnlyWithAudioCheckBox";
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from "../store/actions";
import { connect } from "react-redux";
import ErrorMsg from "./ErrorMsg";
import JoinRoomButtons from "./JoinRoomButtons";
import { getRoomExist } from "../utils/api";
import { useNavigate } from "react-router-dom";

const getRoomExists = async (roomId) => {
  return await getRoomExist(roomId);
}

const JoinRoomContent = (props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [Error, setError] = useState("");
  const { isRoomHost, connectOnlyWithAudio } = useSelector(
    (state) => state.app
  );
  const { setConnectOnlyWithAudio, setIdentity, setRoomId } = props;
  const navigate = useNavigate();

  const join_room = async () => {
    const response = await getRoomExists(roomIdValue);
    const { roomExists, full } = response;
    setFull(full);

    setRoomId(roomIdValue);
    if (roomExists) {
      if (full) {
        setError("Meeting is Full!, try again later");
      } else {
        navigate('/room');
      }
    } else {
      setError("Meeting Not Found");
    }
  }
  const create_room = () => {
    if (nameValue)
      navigate('/room');
    else
      setError("Name Required");
  }

  const handelJoinRoom = async () => {
    setIdentity(nameValue);
    if (isRoomHost) {
      create_room();
    } else {
      if (nameValue && roomIdValue)
        await join_room();
      else
        setError("All the Fields Required");
    }
  }

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
      <ErrorMsg ErrorMsg={Error} />
      <JoinRoomButtons handelJoinRoom={handelJoinRoom} isRoomHost={isRoomHost} />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIdentity: (identity) => dispatch(setIdentity(identity)),
    setRoomId: (roomId) => dispatch(setRoomId(roomId)),
    setConnectOnlyWithAudio: (OnlyWithAudio) => dispatch(setConnectOnlyWithAudio(OnlyWithAudio)),
  };
};

export default connect(
  null,
  mapActionsToProps,
)(JoinRoomContent);
