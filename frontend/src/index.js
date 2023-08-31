import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { createBrowserRouter, createRoutesFromElements,
      RouterProvider, Route } from "react-router-dom";
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import RoomPage from './RoomPage/RoomPage';
import IntroductionPage from './IntroductionPage/IntroductionPage';
import ReactDOM from 'react-dom/client';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' index={true} element={<IntroductionPage />} />
      <Route path='/join-room' element={<JoinRoomPage />} />
      <Route path='/join-room?host=true' element={<RoomPage />} />
    </Route>
  ))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);