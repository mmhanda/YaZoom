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
  const { setConnectOnlyWithAudio } = props;
  const navigate = useNavigate();

  const join_room = async () => {
    const response = await getRoomExists(roomIdValue);
    console.log(response);
    const { roomExists, full } = response;

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
    navigate('/room');
  }

  const handelJoinRoom = async () => {
    if (isRoomHost) {
      create_room();
    } else {
      await join_room();
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

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudio: (OnlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(OnlyWithAudio)),
    setIdentityAction: (identity) => {
      dispatch(setIdentity(identity));
    },
    setRoomIdAction: (roomId) => {
      dispatch(setRoomId(roomId));
    }
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinRoomContent);
