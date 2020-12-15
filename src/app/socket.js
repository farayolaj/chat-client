import React, { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { newLatestMessage } from '../features/messagesSlice';
import { sendMessage as chatSendMessage, reloadChat } from '../features/currentChatSlice';
import { logInInit, logInFail, logInSuccess, logOut as userLogOut } from '../features/authSlice';

export const WebSocketContext = createContext(null);

// TODO: adjust socket.io-cient retry option
const WebSocketContextProvider = ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const logIn = authInfo => {
    logOut();
    dispatch(logInInit());
    socket.connect();
    if (authInfo) return authenticate(authInfo);
    const token = localStorage.getItem('token');
    if (token) return authenticate({ token });
  }

  const logOut = () => {
    if (socket.connected) socket.disconnect();
    dispatch(userLogOut());
  }

  const sendMessage = msg => {
    socket.send(msg);
    dispatch(chatSendMessage(msg));
  }

  const authenticate = userDetail => {
    socket.emit('authentication', userDetail);
  }

  if (!socket) {
    socket = io('http://localhost:5000', {
      autoConnect: false
    });

    socket.on('connect', () => {
      console.log('connected');
    });
    
    socket.on('authenticated', res => {
      console.log('Authenticated', res);
      const user = { username: res.username, displayname: res.displayname}
      localStorage.setItem('token', res.token);

      if (!user.username) dispatch(logInFail());

      dispatch(logInSuccess(user))
    });
    
    socket.on('unauthorized', reason => {
      console.log(reason);
      dispatch(logInFail(reason.message))
    });
    
    socket.on('disconnect', () => {
      dispatch(userLogOut())
      console.log('disconnected');
    })
    
    socket.on('message', message => {
      console.log(message);
      message.isNew = true;
      dispatch(newLatestMessage(message));
      dispatch(reloadChat());
    });

    ws = {
      socket,
      sendMessage,
      logIn,
      logOut
    };
  }

  // try to connect to server on startup
  window.addEventListener('load', () => logIn());

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketContextProvider;