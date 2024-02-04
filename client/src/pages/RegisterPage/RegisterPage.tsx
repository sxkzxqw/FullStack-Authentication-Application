import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { Paths } from '../../app/router/router';

const RegisterPage = () => {
  return (
    <div className="container">
      <h1 className='title'>Register Page</h1>
      <RegisterForm />

      <div className='form-link'>
        <p>Already have an account?</p>
        <Link to={Paths.LOGIN}>Sign In</Link>
      </div>
    </div>
  );
};

export default RegisterPage;