import { useState } from "react";
import SendMsgButton from "../../resources/images/sendMessageButton.svg"
import { setMessages } from "../../store/actions";
import store from "../../store/store";

const NewMessage = () => {

  const [message, setMessage] = useState('');
  const handelTextChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMsg = () => {
    if (message.length > 0 && message.replace(/\s/g, '').length) {
      console.log("Send!");
      const message_ = {
        identity: store.getState().app.identity,
        content: message,
        messageCreatedByMe: true,
      }
      const oldMessages = store.getState().app.messages;
      store.dispatch(setMessages([...oldMessages, message_]));
      setMessage('');
    }
  };

  const handelKeyPressed = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMsg();
    }
  };

  return (
    <div className="new_message_container">
      <input className="new_message_input"
        value={message}
        onChange={handelTextChange}
        type="text"
        placeholder="Message"
        onKeyDown={handelKeyPressed} />
      <img className="new_message_button"
        src={SendMsgButton}
        onClick={sendMsg} alt="new_message_button" />
    </div>
  );
};

export default NewMessage;