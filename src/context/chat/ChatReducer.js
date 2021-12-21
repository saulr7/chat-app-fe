import types from '../../types/types';

import initialState from './InitialState';

const {
  USER_LOADED, ACTIVE_CHAT, NEW_MESSAGE, LOAD_MESSAGE, LOG_OUT,
} = types;

const ChatReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state, users: [...payload],
      };
    case ACTIVE_CHAT:
      if (state.chatActive === payload) {
        return state;
      }
      return {
        ...state, chatActive: payload,
      };
    case NEW_MESSAGE:

      if (state.chatActive === payload.from || state.chatActive === payload.to) {
        return {
          ...state, messages: [...state.messages, payload],
        };
      }
      return state;
    case LOAD_MESSAGE:
      return {
        ...state, messages: [...payload],
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default ChatReducer;
