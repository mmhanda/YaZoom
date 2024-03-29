import Actions from "./actions";

const initialState = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: '',
  showOverlay: true,
  participants: [],
  messages: [],
  activeConversations: null,
  directChatHistory: [],
  socketId: null,
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
    case Actions.SET_ACTIVE_CONVERSATIONS:
      return {
        ...state,
        activeConversations: action.conversations,
      }
    case Actions.SET_DIRECT_CHAT_HISTORY:
      return {
        ...state,
        directChatHistory: action.directChat,
      }
    case Actions.SET_SOCKET_ID:
      return {
        ...state,
        socketId: action.socketId,
      }
    default:
      return state;
  }
};

export default reducer;