import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithSocketIoServer } from "./utils/wss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  useEffect(() => {
    connectWithSocketIoServer();
  }, [])
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
