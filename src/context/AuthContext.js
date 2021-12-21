import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

import { fetchWithoutToken, fetchWithToken } from '../services/fetch';
import types from '../types/types';

import { ChatContext } from './chat/ChatContext';

const { LOG_OUT } = types;

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const res = await fetchWithoutToken('auth/login', { email, password }, 'POST');

    const { ok, token } = res;
    if (ok) {
      localStorage.setItem('token', token);
      const { user } = res;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }

    return ok;
  };

  const register = async (name, email, password) => {
    const res = await fetchWithoutToken('auth/new', { email, password, name }, 'POST');

    const { ok, token, msg } = res;
    if (ok) {
      localStorage.setItem('token', token);
      const { user } = res;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      return true;
    }

    return msg;
  };

  const verifyToken = useCallback(async () => {
    const tokenLocal = localStorage.getItem('token');

    if (!tokenLocal) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }

    const res = await fetchWithToken('auth/renew');
    const { ok, token } = res;
    if (ok) {
      localStorage.setItem('token', token);
      const { user } = res;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      return true;
    }
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });

    return false;
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({
      checking: false,
      logged: false,
    });
    dispatch({ type: LOG_OUT });
  };
  return (

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      auth, login, register, verifyToken, logOut,
    }}
    >
      {children}
    </AuthContext.Provider>

  );
};

export { AuthContext, AuthProvider };
