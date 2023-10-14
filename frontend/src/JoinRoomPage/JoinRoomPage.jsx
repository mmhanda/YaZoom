import { useEffect } from "react";
import "./JoinRoomPage.css";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction } = props;
  const search = useLocation().search;

  useEffect(() => {
    const isHost = new URLSearchParams(search).get("host");
    if (isHost) {
      setIsRoomHostAction(true);
    }
  }, [ setIsRoomHostAction, search ]);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <div>JoinRoomPage</div>
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
