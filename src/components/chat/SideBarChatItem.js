import React, { useContext } from 'react';

import { ChatContext } from '../../context/chat/ChatContext';
import { fetchWithToken } from '../../services/fetch';
import { scrollToBottom } from '../../services/scrollToBottom';
import types from '../../types/types';

const { ACTIVE_CHAT, LOAD_MESSAGE } = types;

const SideBarChatItem = ({ user }) => {
  const { chatState, dispatch } = useContext(ChatContext);

  const { chatActive } = chatState;

  const selectChat = async () => {
    const { uid } = user;
    dispatch({ type: ACTIVE_CHAT, payload: uid });
    const data = await fetchWithToken(`message/${uid}`);
    dispatch({ type: LOAD_MESSAGE, payload: data.messages });
    scrollToBottom('messages');
  };

  return (
    <div
      className={`chat_list  ${chatActive === user.uid && 'active_chat'}`}
      onClick={selectChat}
      aria-hidden="true"
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarChatItem;
