const DirectChatHeader = ({ activeConversations }) => {
  return (
    <div className='direct_chat_header'>
      <p className='direct_chat_header_paragraph'>
        {activeConversations ? activeConversations?.identity : ''}
      </p>
    </div>
  );
};

export default DirectChatHeader;