import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { AlertError } from '../services/alerts';

const LoginPage = () => {
  const [form, setForm] = useState({ email: 'test', password: '123', rememberme: false });
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const remembermeEmail = localStorage.getItem('email');

    if (remembermeEmail) {
      setForm((prevForm) => ({ ...prevForm, email: remembermeEmail, rememberme: true }));
    }
  }, []);

  const onChange = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const toggleCheck = () => {
    setForm({ ...form, rememberme: !form.rememberme });
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (form.rememberme) {
      localStorage.setItem('email', form.email);
    } else {
      localStorage.removeItem('email');
    }

    const { email, password } = form;
    const ok = await login(email, password);

    if (!ok) {
      AlertError('Error', 'Something went wrong');
    }
  };

  const isOk = () => {
    if (form.email.length > 0 && form.password.length > 0) {
      return true;
    }

    return false;
  };

  return (
    <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
      <span className="login100-form-title mb-3 font-weight-bold">Login</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100" />
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100" />
      </div>

      <div className="row mb-3">
        <div className="col" onClick={() => toggleCheck()} aria-hidden="true">
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <span className="label-checkbox100">Remember me</span>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Create account?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!isOk()}
        >
          Login

        </button>
      </div>
    </form>
  );
};

export default LoginPage;
