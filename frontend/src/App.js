import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithSocketIoServer } from "./utils/wss";

const App = () => {
  useEffect(() => {
    connectWithSocketIoServer();
  }, [])
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
