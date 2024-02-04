import { Link } from 'react-router-dom';
import { Paths } from '../../app/router/router';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <div className="container">
      <h1 className='title'>Login Page</h1>
      <LoginForm />

      <div className='form-link'>
        <p>Dont have an account?</p>
        <Link to={Paths.REGISTER}>Sign Up</Link>
      </div>
    </div>
  )
};

export default LoginPage;