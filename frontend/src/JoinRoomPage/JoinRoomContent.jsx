import { useState } from "react";
import JoinRoomInput from "./JoinRoomInput";
import { useSelector } from "react-redux";

const JoinRoomContent = () => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const { isRoomHost } = useSelector((state) => state.app);

  return (
    <>
      <JoinRoomInput
        roomIdValue={roomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        setRoomIdValue={setRoomIdValue}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

export default JoinRoomContent;
