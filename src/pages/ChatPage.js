import React, { useContext } from 'react';

import ChatSelect from '../components/chat/ChatSelect';
import InboxPeople from '../components/chat/InboxPeople';
import Messages from '../components/chat/Messages';
import { ChatContext } from '../context/chat/ChatContext';

import '../css/chat.css';

const ChatPage = () => {
  const { chatState } = useContext(ChatContext);

  return (
    <div className="messaging">
      <div className="inbox_msg">

        <InboxPeople />

        {
          (chatState.chatActive ? <Messages /> : <ChatSelect />)
        }

      </div>

    </div>
  );
};

export default ChatPage;
