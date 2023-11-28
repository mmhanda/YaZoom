import { useEffect, useState } from "react";
import "./JoinRoomPage.css";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction } = props;
  const search = useLocation().search;
  let [isRoomHost, setIsRoomHost] = useState(false)

  useEffect(() => {
    setIsRoomHost(new URLSearchParams(search).get("host"));
    if (isRoomHost) {
      setIsRoomHostAction(true);
    } else {
      setIsRoomHostAction(false);
    }
  }, [setIsRoomHostAction, search]);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
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
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
