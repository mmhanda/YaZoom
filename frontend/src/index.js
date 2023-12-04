import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import {
  createBrowserRouter, createRoutesFromElements,
  RouterProvider, Route
} from "react-router-dom";
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import RoomPage from './RoomPage/RoomPage';
import IntroductionPage from './IntroductionPage/IntroductionPage';
import ReactDOM from 'react-dom/client';
import "./index.css";
import "./RoomPage/RoomPage.css";

(window).process = {
  env: { DEBUG: undefined },
  nextTick: function () {
    return null;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<IntroductionPage />} />
      <Route path='/join-room' element={<JoinRoomPage />} />
      <Route path='/room' element={<RoomPage />} />
    </Route>
  ))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);