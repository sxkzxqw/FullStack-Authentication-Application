import { observer } from "mobx-react-lite";
import { Context } from "../../app/main";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../app/router/router";

const RegisterForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await store.register(email, password);
      if (store.isAuth) {
        navigate(Paths.ACCOUNT);
      }
    } catch (error) {
      alert("error (look network)")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' autoComplete='on' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type='submit' onClick={handleSubmit}>Sign Up</button>
    </form>
  );
};

export default observer(RegisterForm);