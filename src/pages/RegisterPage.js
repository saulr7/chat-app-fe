import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { AlertError } from '../services/alerts';

const RegisterPage = () => {
  const [form, setForm] = useState({ email: 'test', password: '123', name: '' });
  const { register } = useContext(AuthContext);

  const onChange = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (form.rememberme) {
      localStorage.setItem('email', form.email);
    } else {
      localStorage.removeItem('email');
    }

    const { name, email, password } = form;
    const ok = await register(name, email, password);

    if (ok !== true) {
      AlertError('Error', ok || 'Something went wrong');
    }
  };

  const isOk = () => {
    const { name, email, password } = form;
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      return true;
    }

    return false;
  };

  return (

    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">
        Create Account
      </span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <span className="focus-input100" />
      </div>

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
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!isOk()}
        >
          Create account
        </button>
      </div>

    </form>
  );
};

export default RegisterPage;
