import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from "./MessagesContainer";
import NewMessage from "./NewMessage/NewMessage";
import ConversationNotChosen from './ConversationNotChosen';
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const getDirectChatHistory = (directChatHistory, socketId) => {
  if (!directChatHistory || !socketId) {
    return [];
  }

  const history = directChatHistory.find(h => h.socketId === socketId);

  return history ? history.chatHistory : [];
}

const DirectChat = (props) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(getDirectChatHistory(props.app.directChatHistory,
      props.app.activeConversations ?
        props.app.activeConversations.socketId : null));
  }, [props.app.directChatHistory, props.app.activeConversations]);

  return (
    <div className='direct_chat_container'>
      <DirectChatHeader activeConversations={props.app.activeConversations} />
      <MessagesContainer messages={messages} />
      <NewMessage activeConversation={props.app.activeConversations}
        identity={props.app.identity} />
      {!props.app.activeConversations && <ConversationNotChosen />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(DirectChat);