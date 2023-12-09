import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setActiveConversations } from '../../store/actions';

const SingleParticipant = (props) => {
  const { identity, LastItem, setActionConversation, socketId, participant } = props;

  const handelOpenChatBox = () => {
    if (participant.socketId !== socketId && participant.socketId !== undefined) {
      setActionConversation(participant);
    }
    else setActionConversation(null);
  }
  return <>
    <p onClick={handelOpenChatBox} className="participants_paragraph"> {identity} </p>
    {!LastItem && <span className="participants_separator_line" ></span>}
  </>
}

const Participants = ({ app, setActionConversation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(app.participants)) {
      setData(app.participants);
    }
  }, [app.participants]);

  return (
    <div className="participants_container">
      {data.map((participant, index) => (
        <SingleParticipant
          key={participant.identity}
          LastItem={data.length === index + 1}
          participant={participant}
          identity={participant.identity}
          setActionConversation={setActionConversation}
          socketId={app.socketId}
        />
      ))}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setActionConversation: (activeConversations) => dispatch(setActiveConversations(activeConversations)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);