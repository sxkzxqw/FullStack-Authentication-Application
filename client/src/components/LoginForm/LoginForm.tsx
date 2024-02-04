import React, { FC, useContext, useState } from 'react';
import { Context } from '../../app/main';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../app/router/router';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await store.login(email, password);
      if (store.isAuth) {
        navigate(Paths.ACCOUNT);
      }
    } catch (error) {
      alert("Error (look network)");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' autoComplete='on' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type='submit' onClick={handleSubmit}>Sign In</button>
    </form>
  );
};

export default observer(LoginForm);