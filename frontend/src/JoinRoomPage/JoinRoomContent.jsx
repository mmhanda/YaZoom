import { useState } from "react";
import JoinRoomInput from "./JoinRoomInput";
import { useSelector } from "react-redux";
import OnlyWithAudioCheckBox from "./OnlyWithAudioCheckBox";
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from "../store/actions";
import { connect } from "react-redux";
import ErrorMsg from "./ErrorMsg";
import JoinRoomButtons from "./JoinRoomButtons";
import { getRoomExist, getRoomParticipants } from "../utils/api";
import { useNavigate } from "react-router-dom";
import store from "../store/store";

const getRoomExists = async (roomId) => {
  return await getRoomExist(roomId);
}

const getRoomParticipants_ = async (roomId) => {
  return await getRoomParticipants(roomId);
}

const JoinRoomContent = (props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [Error, setError] = useState("");
  const { isRoomHost, connectOnlyWithAudio } = useSelector(
    (state) => state.app
  );
  const { setConnectOnlyWithAudio, setRoomId, identity } = props;
  const navigate = useNavigate();

  const join_room = async () => {
    const response = await getRoomExists(roomIdValue, identity);
    const { roomExists, full } = response;

    if (roomExists) {
      const participants = await getRoomParticipants_(roomIdValue);
      const participant = participants.participants.find((participant) => participant.identity === nameValue);
      if (participant) {
        setError("Name Already Taken");
        return;
      }
    }

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
    store.dispatch(setIdentity(nameValue));
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
