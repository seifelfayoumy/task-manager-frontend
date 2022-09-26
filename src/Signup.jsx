import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import validator from 'validator';
import { signup } from './services/userService';

function Signup() {

  const [isAuth, onSignup] = useOutletContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
        firstName,
        lastName,
        email,
        password
      }
      const result = await signup(formObject);
      if (result !== 400) {
        const user = result;
        onSignup(user);
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
          Sign Up
        </h3>
        <Form className='mt-3'>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} className={!checkEmail() ? 'text-danger' : ''} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} className={!checkPassword() ? 'text-danger' : ''} />
            <Form.Text className="text-muted">
              Passwords must be at leat 8 characters long, 1 lowercase, 1 uppercase, 1 number and 1 symbol.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={submitForm} className={!isValidForm() ? 'disabled' : ''}>
            SIGN UP
          </Button>
        </Form>
        {isError ? (
          <>
            <h3 className='text-danger'>
              user with this email already exists.
            </h3>
          </>
        ) :
          <>
          </>}


        <div className='w-100 mt-5'>
          <div className='fs-4'>
            have an account?
          </div>
          <Link to={'/login'}>
            <Button variant="primary" onClick={submitForm}>
              Login
            </Button>
          </Link>

        </div>

      </div>
    );
  }

}

export default Signup;