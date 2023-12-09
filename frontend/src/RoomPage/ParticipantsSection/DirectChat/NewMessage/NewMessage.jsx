import { useState } from "react";
import SendMsgButton from "../../../../resources/images/sendMessageButton.svg";
import * as wss from '../../../../utils/wss';

const NewMessage = ({ activeConversation, identity }) => {

  const [message, setMessage] = useState('');
  const handelTextChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMsg = () => {
    if (message.length > 0 && message.replace(/\s/g, '').length) {
      wss.sendPrivateMessage({
        receiverSocketId: activeConversation.socketId,
        identity: identity,
        messageContent: message,
      })
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
    <div className="new_message_container new_message_direct_border">
      <input className="new_message_input"
        value={message}
        onChange={handelTextChange}
        placeholder="Message"
        onKeyDown={handelKeyPressed} />
      <img className="new_message_button"
        src={SendMsgButton}
        onClick={sendMsg} alt="new_message" />
    </div>
  );
};

export default NewMessage;