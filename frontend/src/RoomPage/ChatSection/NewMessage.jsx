import { useState } from "react";
import SendMsgButton from "../../resources/images/sendMessageButton.svg"
import * as WebRTCHandler from "../../utils/WebRTCHandler";

const NewMessage = () => {

  const [message, setMessage] = useState('');
  const handelTextChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMsg = () => {
    if (message.length > 0 && message.replace(/\s/g, '').length) {
      // console.log("Send!");
      WebRTCHandler.sendMessageUsingDataChannel(message);
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