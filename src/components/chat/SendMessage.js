import React, { useContext, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';
import { SocketContext } from '../../context/SocketContext';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const { chatState } = useContext(ChatContext);
  const { auth: { uid } } = useContext(AuthContext);

  const { chatActive } = chatState;

  const { socket } = useContext(SocketContext);

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (!message) return;

    socket?.emit('send-message', { message, from: uid, to: chatActive });

    setMessage('');
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Message..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
