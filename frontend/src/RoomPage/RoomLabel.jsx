import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomLabel = ({ roomId }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomId);
    toast.success('Meeting ID copied!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      style: {
        backgroundColor: "#007BFF",
        color: "#FFFFFF",
      },
    });
  };

  return (
    <div className='room_label'>
      <p className='room_label_paragraph cursor-pointer' onClick={handleCopyClick}>
        <span style={{ color: '#FF4500' }}>Meeting ID:</span> {roomId}
      </p>
    </div>
  );
};

export default RoomLabel;
