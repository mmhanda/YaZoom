import Actions from "./actions";

const initialState = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: '',
  showOverlay: true,
  participants: [],
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost,
      };
    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.OnlyWithAudio,
      };
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      }
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      }
    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.overlayState,
      }
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.connectedUser,
      }
    case Actions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      }
    default:
      return state;
  }
};

export default reducer;