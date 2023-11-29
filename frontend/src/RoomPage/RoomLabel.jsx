import React from 'react';

const RoomLabel = ({ roomId }) => {
  console.log(roomId);
  return (
    <div className='room_label'>
      <p className='room_label_paragraph'>ID: {roomId}</p>
    </div>
  );
};

export default RoomLabel;