const DummyParticipants = [
  {
    identity: "jimmy",
  },
  {
    identity: "jimmy1",
  },
  {
    identity: "jimmy2",
  },
  {
    identity: "jimmy3",
  },
  {
    identity: "jimmy4",
  },
  {
    identity: "jimmy5",
  },
];

const SinglePart = (props) => {
  const { identity, LastItem, participants } = props;

  return <>
    <p className="participants_paragraph"> {identity} </p>
    {!LastItem && <span className="participants_separator_line" ></span>}
  </>
}

const Participants = () => {
  return (
    <div className="participants_container">
      {DummyParticipants.map((participant, index) => {
        return (
          <SinglePart key={participant.identity}
            LastItem={DummyParticipants.length === index + 1}
            participant={participant}
            identity={participant.identity} />
        )
      })}
    </div>
  );
};

export default Participants;