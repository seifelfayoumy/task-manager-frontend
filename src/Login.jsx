import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import validator from 'validator';
import { login, signup } from './services/userService';

function Login() {

  const [isAuth, onSignup, onLogin] = useOutletContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [])

  const submitForm = async () => {
    setIsLoading(true);
    if (isValidForm()) {
      const formObject = {
        email,
        password
      }
      const result = await login(formObject);
      if (result !== 400) {
        const user = result;
        onLogin(user);
        return setIsLoading(false);
      }
      setIsLoading(false);
      setIsError(true);
    }
  }

  const checkPassword = () => {
    return validator.isStrongPassword(password);
  }

  const checkEmail = () => {
    return validator.isEmail(email);
  }

  const isValidForm = () => {
    return validator.isStrongPassword(password) && validator.isEmail(email);

  }

  if (!isLoading) {
    return (
      <div className='col-sm-6 col-12 mx-auto d-flex flex-column align-items-center mt-5'>
        <h3>
          Log in
        </h3>
        <Form className='mt-3 w-100'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} className={!checkEmail() ? 'text-danger' : ''} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} className={!checkPassword() ? 'text-danger' : ''} />
          </Form.Group>

          <Button variant="primary" onClick={submitForm} className={!isValidForm() ? 'disabled' : ''}>
            LOGIN
          </Button>
        </Form>
        {isError ? (
          <>
            <h3 className='text-danger'>
              wrong email or password
            </h3>
          </>
        ) :
          <>
          </>}

        <div className='w-100 mt-5'>
          <div className='fs-4'>
            don't have an account?
          </div>
          <Link to={'/signup'}>
            <Button variant="primary" onClick={submitForm}>
              Signup
            </Button>
          </Link>

        </div>

      </div>
    );
  }

}

export default Login;