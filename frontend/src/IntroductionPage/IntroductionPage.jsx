import logo from "../resources/images/logo.png";
import ConnectingButtons from "./ConnectingButtons";
import "./IntroductionPage.css";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import { useEffect } from "react";

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  }, [setIsRoomHostAction]);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img src={logo} className="introduction_page_image" alt="logo" />
        <ConnectingButtons />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapActionsToProps)(IntroductionPage);
