import { useRef, useEffect } from "react";

const SingleMessage = ({ messageContent, isAuthor }) => {
  const messageStyling = isAuthor ? 'author_direct_message' : 'receiver_direct_message';
  const containerStyling = isAuthor ? 'direct_message_container_author' : 'direct_message_container_receiver';

  return (
    <div className={containerStyling}>
      <p className={messageStyling}>
        {messageContent}
      </p>
    </div>
  );
};

const MessagesContainer = ({ messages }) => {

  const scrollDown = useRef();

  useEffect(() => {
    scrollDown.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="direct_messages_container">
      {messages?.map((message) => {
        return <SingleMessage messageContent={message.messageContent}
          isAuthor={message.isAuthor}
          key={`${message.messageContent}-${message.identity}`} />
      })}
      <div ref={scrollDown}></div>
    </div>
  );
};

export default MessagesContainer;