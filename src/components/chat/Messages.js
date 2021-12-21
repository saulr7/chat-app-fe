import React, { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';

import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import SendMessage from './SendMessage';

const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth: { uid } } = useContext(AuthContext);
  const { messages } = chatState;

  return (
    <div className="mesgs">

      <div className="msg_history" id="messages">

        {messages.map((msg) => {
          if (msg.to === uid) {
            return <IncomingMessage key={msg.uid} msg={msg} />;
          }
          return <OutgoingMessage key={msg.uid} msg={msg} />;
        })}

      </div>

      <SendMessage />

    </div>
  );
};

export default Messages;
