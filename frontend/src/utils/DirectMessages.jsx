import store from "../store/store";
import { setDirectChat } from "../store/actions";

const appendMsgToHistory = (socketId, data) => {
  const chatHistory_ = [...store.getState().app.directChatHistory];

  const userChatHistory = chatHistory_.find((h) => h.socketId === socketId);

  if (userChatHistory) {
    const directMessage = {
      isAuthor: data.isAuthor,
      messageContent: data.messageContent,
      identity: data.identity,
    }

    const newUserChatHistory = {
      ...userChatHistory,
      chatHistory: [...userChatHistory.chatHistory, directMessage],
    }

    const newHistory = [
      ...chatHistory_.filter(h => h.socketId !== socketId),
      newUserChatHistory
    ];
    store.dispatch(setDirectChat(newHistory));
  } else {
    const newChatHistory = {
      socketId,
      chatHistory: [{
        isAuthor: data.isAuthor,
        messageContent: data.messageContent,
        identity: data.identity,
      }]
    };

    const newHistory = [...chatHistory_, newChatHistory];
    store.dispatch(setDirectChat(newHistory));
  }
}

export const appendToChatHistory = (data) => {
  const { authorSocketId, receiverSocketId, isAuthor } = data;
  if (isAuthor) {
    appendMsgToHistory(receiverSocketId, data);
  } else {
    appendMsgToHistory(authorSocketId, data);
  }
}