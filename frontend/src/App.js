import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithSocketIoServer } from "./utils/wss";

const App = () => {
  useEffect(() => {
    try {
      connectWithSocketIoServer();
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
