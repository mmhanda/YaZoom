import React from "react";

const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="join-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const JoinRoomInput = (props) => {
  const { roomIdValue, nameValue, setNameValue, setRoomIdValue, isRoomHost } =
    props;

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value);
  };

  const handleRoomNameValueChange = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <div className="join-room-inputs-container">
      {!isRoomHost && (
        <Input
          placeholder="Enter Meeting ID"
          value={roomIdValue}
          onChange={handleRoomIdValueChange}
        />
      )}
      <Input
        placeholder="Enter Your Name"
        value={nameValue}
        onChange={handleRoomNameValueChange}
      />
    </div>
  );
};

export default JoinRoomInput;
