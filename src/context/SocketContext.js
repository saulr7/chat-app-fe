import React, { createContext, useContext, useEffect } from 'react';

import useSocket from '../hooks/useSocket';
import { scrollToBottomAnimated } from '../services/scrollToBottom';
import types from '../types/types';

import { AuthContext } from './AuthContext';
import { ChatContext } from './chat/ChatContext';

const { USER_LOADED, NEW_MESSAGE } = types;

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const {
    socket, online, connectSocket, disconnectSocket,
  } = useSocket(process.env.REACT_APP_SOCKET_URL);
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth]);

  useEffect(() => {
    socket?.on('list-users', (users) => {
      dispatch({ type: USER_LOADED, payload: users });
    });
    return () => socket?.off('list-users');
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('personal-message', (msg) => {
      dispatch({ type: NEW_MESSAGE, payload: msg });
      scrollToBottomAnimated('messages');
    });
    return () => socket?.off('personal-message');
  }, [socket, dispatch]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket, online }}>
      { children }
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
