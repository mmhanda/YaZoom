import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from "./MessagesContainer";
import NewMessage from "./NewMessage/NewMessage";

const DirectChat = ({ activeConversation, directChatHistory }) => {
  return (
    <div className='direct_chat_container'>
      <DirectChatHeader activeConversations={activeConversation} />
      <MessagesContainer messages={directChatHistory} />
      <NewMessage />
    </div>
  );
};

export default DirectChat;