import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const SinglePart = (props) => {
  const { identity, LastItem, participants } = props;

  return <>
    <p className="participants_paragraph"> {identity} </p>
    {!LastItem && <span className="participants_separator_line" ></span>}
  </>
}

const Participants = ({ app }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([app]);
  }, [app]);

  return (
    <div className="participants_container">
      {data.map((participant, index) => (
        <SinglePart
          key={participant.identity}
          LastItem={data.length === index + 1}
          participant={participant}
          identity={participant.identity}
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

export default connect(mapStoreStateToProps)(Participants);