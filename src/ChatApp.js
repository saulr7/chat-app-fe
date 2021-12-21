import React from 'react';

import moment from 'moment';
import 'moment/locale/es';

import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/chat/ChatContext';
import { SocketProvider } from './context/SocketContext';
import AppRoutes from './router/AppRoutes';

moment.locale('es');

const ChatApp = () => (
  <ChatProvider>
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  </ChatProvider>
);

export default ChatApp;
