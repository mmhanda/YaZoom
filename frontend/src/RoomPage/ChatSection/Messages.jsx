import { useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../../store/store";

const Message = ({ author, content, sameAuthor, messageCreatedByMe }) => {
  const alignClass = messageCreatedByMe ? "message_align_right" : "message_align_left";
  const contentStyles = messageCreatedByMe ? "message_right_styles" : "message_left_styles";
  const authorText = sameAuthor ? 'You' : author;

  return <div className={`message_container ${alignClass}`}>
    {!sameAuthor && <p className="message_title">{authorText}</p>}
    <p className={`message_content ${contentStyles}`}>{content}</p>
  </div>
}

export const Messages = ({ app }) => {

  const [messages_, setMessages_] = useState([]);
  const { messages } = app;
  useEffect(() => {
    setMessages_(messages);
  }, [app.messages]);

  return (
    <div className="messages_container">
      {messages_.map((message, index) => {
        const sameAuthor = index > 0 && message.identity === messages[index - 1].identity;
        return (
          <Message key={`${message.content}${index}`}
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe} /> // this prop is for the left or right section
        )
      })}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Messages);