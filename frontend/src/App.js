import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import RoomPage from './RoomPage/RoomPage';
import IntroductionPage from './IntroductionPage/IntroductionPage';

const App = () => {
  return (  
    <Router>
      <Switch>
          <Route path="/join-room">
            <JoinRoomPage />
          </Route>
          <Route path="/room">
            <RoomPage />
          </Route>
          <Route path="/">
            <IntroductionPage />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
