const messages = [
  {
    identity: "John Doe",
    content: "Hello there!",
    messageCreatedByMe: true,
  },
  {
    identity: "John Doe",
    content: "Hi John!",
    messageCreatedByMe: true,
  },
  {
    identity: "John Doe",
    content: "How are you?",
    messageCreatedByMe: true,
  },
  {
    identity: "Alice Smith",
    content: "I'm good, thanks!",
    messageCreatedByMe: false,
  },
  {
    identity: "John Doe",
    content: "Glad to hear that!",
    messageCreatedByMe: true,
  },
  {
    identity: "Alice Smith",
    content: "What about you?",
    messageCreatedByMe: false,
  },
  {
    identity: "John Doe",
    content: "I'm doing well too.",
    messageCreatedByMe: true,
  },
  {
    identity: "Alice Smith",
    content: "That's great!",
    messageCreatedByMe: false,
  },
  {
    identity: "John Doe",
    content: "Any plans for the weekend?",
    messageCreatedByMe: true,
  },
  {
    identity: "Alice Smith",
    content: "Not yet, what about you?",
    messageCreatedByMe: false,
  },
];

const Message = ({ author, content, sameAuthor, messageCreatedByMe }) => {
  const alignClass = messageCreatedByMe ? "message_align_right" : "message_align_left";
  const contentStyles = messageCreatedByMe ? "message_right_styles" : "message_left_styles";
  const authorText = sameAuthor ? 'You' : author;

  return <div className={`message_container ${alignClass}`}>
    {!sameAuthor && <p className="message_title">{authorText}</p>}
    <p className={`message_content ${contentStyles}`}>{content}</p>
  </div>
}

export const Messages = () => {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
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

export default Messages;