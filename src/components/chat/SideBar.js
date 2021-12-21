import React, { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';

import SideBarChatItem from './SideBarChatItem';

const SideBar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const { users = [] } = chatState;

  return (

    <div className="inbox_chat">

      {users
        .filter(({ uid }) => uid !== auth.uid)
        .map((user) => (
          <SideBarChatItem key={user.uid} user={user} />))}

      <div className="extra_space" />

    </div>
  );
};

export default SideBar;
