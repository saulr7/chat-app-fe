import React, { createContext, useReducer } from 'react';

import ChatReducer from './ChatReducer';
import initialState from './InitialState';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(ChatReducer, initialState);

  return (

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>

  );
};

export { ChatContext, ChatProvider };
