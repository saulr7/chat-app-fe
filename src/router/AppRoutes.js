import React, { useContext, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';

import AuthRouter from './AuthRouter';

const AppRoutes = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, []);

  if (auth.checking) {
    return <h1>Loading</h1>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="auth/*" element={!auth.logged ? <AuthRouter /> : <Navigate to="/" />} />
          <Route path="/" element={auth.logged ? <ChatPage /> : <Navigate to="auth/login" />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>

  );
};

export default AppRoutes;
