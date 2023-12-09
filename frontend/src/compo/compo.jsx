import { useState, useRef } from "react";
import profileButton from "./profileButton.svg";
import privateChatButton from "./privateChatButton.svg";
import gameButton from "./gameButton.svg";
import muteButton from "./muteButton.svg";
import kickButton from "./kickButton.svg";
import banButton from "./banButton.svg";
import downFlesh from "./downFlesh.svg";
import copyUserId from "./copyUserId.svg";
import oalaoui from "./oalaoui.jpg";
import lock from "./lock.svg";

const USERNAME = 'OALAOUI';
const USERId = '122165';
const ISAMDIN = true;

const ShowUserDetails = () => {

  const [copyMessageVisible, setCopyMessageVisible] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(USERId);
    console.log("Copied!");

    setCopyMessageVisible(true);

    setTimeout(() => {
      setCopyMessageVisible(false);
    }, 2000);
  }

  const handelAdminFunc = (command) => {
    console.log(command);
  }

  const handelUserEngagement = (type) => {
    console.log(type);
  }

  return (
    <div className='w-screen h-screen container mx-auto bg-blue-600 flex justify-center items-center'>
      <div className='w-[316px] h-[317px] bg-400 flex items-end relative'>
        <div className="absolute w-[61px] h-[61px] rounded-ful z-10 top-0 left-[42%]">
          <img src={oalaoui} alt="User Avatar" className="absolute rounded-full" />
          <div className="absolute w-[14px] h-[15px] bg-[#55CF62] bottom-0 left-11 rounded-full"></div>
        </div>
        <div className="absolute left-[162px] transform -translate-x-1/2 top-20 -translate-y-1/2 z-20">
          <p className="text-white uppercase text-center font-bold text-base leading-4  ">{USERNAME}</p>
        </div>

        <div className="h-[20px] w-[60px] absolute left-[162px] justify-center items-center transform -translate-x-1/2 top-24 -translate-y-1/2 flex z-20">
          <p className="absolute text-[#A6A1B6] uppercase left-0 font-bold text-sm leading-4">{USERId}</p>
          <img src={copyUserId} alt="Copy User ID" className="absolute right-0 cursor-pointer" onClick={handleCopyClick} />
          {copyMessageVisible && (
            <div className="absolute text-white text-xs bg-slate-500 px-1 h-[18px] w-[50px] rounded-sm top-[20px] left-[90%] transform -translate-x-1/2">
              Copied!
            </div>
          )}
        </div>

        <div className="w-[316px] h-[284.8px] bg-black relative overflow-hidden rounded-[18px]">
          <div className="absolute bg-[#483285] w-full h-full rounded-r-full rounded-b-full blur-xl -left-24 -top-24 opacity-80 "></div>
          <div className="absolute bg-[#BE195D] h-[40px] w-[40px] rounded-xl left-[90px] top-24 items-center justify-center flex cursor-pointer" onClick={() => handelUserEngagement("profile")}>
            <img src={profileButton} alt="Profile Button" className="h-[27px] w-[24px]" />
          </div>
          <div className="absolute bg-[#2c4fce] h-[40px] w-[40px] rounded-xl left-1/2 transform -translate-x-1/2 top-24 items-center justify-center flex cursor-pointer" onClick={() => handelUserEngagement('chat')}>
            <img src={privateChatButton} alt="Private Chat Button" className="h-[19px] w-[19px]" />
          </div>
          <div className="absolute bg-[#4F466E] h-[40px] w-[40px] rounded-xl right-[90px] top-24 items-center justify-center flex cursor-pointer" onClick={() => handelUserEngagement('game')}>
            <img src={gameButton} alt="Game Button" className="h-[18px] w-[23px]" />
          </div>
        </div>

        {ISAMDIN &&
          <div>
            <div className="absolute h-[27px] w-[138px] bg-[#3B2A3D] left-[88.3px] rounded-[16.5px] items-center justify-center flex top-[185px]">
              <p className="text-white text-opacity-80 text-sm font-medium leading-4 z-10">ADMIN ROLES</p>
              <div className="absolute h-[1px] w-[275px] bg-[#3B2A3D]"></div>
            </div>

            <div className="absolute bg-[#48475A] h-[33px] w-[71px] rounded-2xl left-[30px] top-56 bg-opacity-95 items-center justify-center flex cursor-pointer" onClick={() => handelAdminFunc('ban')}>
              <img src={banButton} alt="Ban Button" className="absolute left-2" />
              <p className="absolute text-white font-medium text-xs leading-4 right-4">BAN</p>
            </div>
            <div className="absolute bg-[#48475A] h-[33px] w-[71px] rounded-2xl left-1/2 transform -translate-x-1/2 top-56 bg-opacity-95 items-center justify-center flex cursor-pointer" onClick={() => handelAdminFunc('mute')}>
              <img src={muteButton} alt="Mute Button" className="absolute left-2" />
              <p className="absolute text-white font-medium text-xs leading-4 right-3">MUTE</p>
            </div>
            <div className="absolute bg-[#48475A] h-[33px] w-[71px] rounded-2xl right-[30px] top-56 bg-opacity-95 items-center justify-center flex cursor-pointer" onClick={() => handelAdminFunc('kick')}>
              <img src={kickButton} alt="Kick Button" className="absolute left-2" />
              <p className="absolute text-white font-medium text-xs leading-4 right-4">KICK</p>
            </div>

            <p className="absolute text-white font-normal text-base leading-5 left-[100px] bottom-5">VIEW PROFILE</p>
            <img src={downFlesh} alt="Down Flesh" className="absolute left-[146px] bottom-2" />
          </div>}
      </div>
    </div>
  );
};

// export default ShowUserDetails;


const RoomPasswordForm = () => {
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(passwordRef.current.value);
  };

  return (
    <div className='w-screen h-screen container mx-auto bg-blue-600 flex justify-center items-center relative'>
      <div className="relative flex w-[606px] h-[350px] bg-[#3E394D] rounded-[23px]">
        <p className="absolute text-white font-bold text-2xl uppercase left-[22.5%] py-4">Room Password Required</p>
        <div className="absolute text-center text-white opacity-75 px-14 py-4 my-1 translate-y-9">To join this room and start chatting, please enter the room password below. The password ensures a secure and private conversation within the room.</div>
        <form onSubmit={submitHandler}>
          <img src={lock} className="absolute left-[105px] top-[165px]" />
          <input
            ref={passwordRef}
            type="password"
            className="absolute rounded-[11px] h-[58px] w-[439px] bg-[#00000033] translate-x-20 translate-y-36 p-1 m-1 text-left"
            title="PASSWORD"
            placeholder="PASSWORD"
            style={{ paddingLeft: '55px' }}
          />
          <button type="submit" className="absolute rounded-[11px] h-[58px] w-[439px] bg-[#A970E3] font-bold text-white text-opacity-90 translate-x-20 translate-y-60 p-1 m-1">JOIN NOW</button>
        </form>
      </div>
    </div>
  );
};

export default RoomPasswordForm;
