import React from 'react';

import { Route, Routes } from 'react-router-dom';

import '../css/login-register.css';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AuthRouter = () => (

  <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100 p-t-50 p-b-90">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default AuthRouter;
