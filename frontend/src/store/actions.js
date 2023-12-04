const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  SET_MESSAGES: "SET_MESSAGES",
};

export const setIsRoomHost = (isRoomHost) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    isRoomHost,
  };
};

export const setConnectOnlyWithAudio = (OnlyWithAudio) => {
  return {
    type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
    OnlyWithAudio,
  };
};

export const setIdentity = (identity) => {
  return {
    type: Actions.SET_IDENTITY,
    identity,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: Actions.SET_ROOM_ID,
    roomId,
  };
};

export const setOverLay = (overlayState) => {
  return {
    type: Actions.SET_SHOW_OVERLAY,
    overlayState,
  };
};

export const setParticipants = (connectedUser) => {
  return {
    type: Actions.SET_PARTICIPANTS,
    connectedUser,
  };
};

export const setMessages = (messages) => {
  return {
    type: Actions.SET_MESSAGES,
    messages,
  };
};

export default Actions;
