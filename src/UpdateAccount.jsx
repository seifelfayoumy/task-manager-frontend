import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import validator from 'validator';
import { deleteAccount, login, signup, updateAccount } from './services/userService';

function UpdateAccount() {

  const [isAuth, onSignup, onLogin, tasks, onNewTask, firstName, lastName, email, onUpdateAccount] = useOutletContext();

  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate('/signup');
    }
  }, []);

  const submitForm = async () => {
    setIsLoading(true);
    if (isValidForm()) {
      let formObject = {
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName
      }
      if (newPassword !== '') {
        formObject = { ...formObject, password: newPassword }
      }

      const result = await updateAccount(formObject);
      if (result !== 400 && result !== 401) {
        return onUpdateAccount();
      }
      setIsLoading(false);
      setIsError(true);
    }
  }

  const deleteAcc = async () => {
    setIsLoading(true);
    const result = await deleteAccount();
    if (result !== 400 && result !== 401) {
      return onUpdateAccount();
    }
    setIsLoading(false);
    setIsError(true);
  }

  const checkPassword = () => {
    if (newPassword === '') {
      return true;
    } else {
      return validator.isStrongPassword(newPassword);
    }

  }

  const checkEmail = () => {
    return validator.isEmail(newEmail);
  }

  const isValidForm = () => {
    return checkPassword(newPassword) && validator.isEmail(newEmail);

  }

  if (!isLoading) {
    return (
      <div className='col-sm-6 col-12 mx-auto d-flex flex-column align-items-center mt-5'>
        <h3>
          Update Account
        </h3>
        <Form className='mt-3 w-100'>
          <Form.Group className="mb-3" >
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" onChange={(e) => setNewFirstName(e.target.value)} value={newFirstName} />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" onChange={(e) => setNewLastName(e.target.value)} value={newLastName} />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => setNewEmail(e.target.value)} className={!checkEmail() ? 'text-danger' : ''} value={newEmail} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)} className={!checkPassword() ? 'text-danger' : ''} />
          </Form.Group>

          <Button variant="primary" onClick={submitForm} className={!isValidForm() ? 'disabled' : ''}>
            UPDATE
          </Button>
        </Form>
        {isError ? (
          <>
            <h3 className='text-danger'>
              something went wrong, try again
            </h3>
          </>
        ) :
          <>
          </>}

        <div className='w-100 mt-5'>
          <Link to={'/signup'}>
            <Button variant="danger" onClick={deleteAcc}>
              DELETE ACCOUNT
            </Button>
          </Link>

        </div>

      </div>
    );
  } else {
    return (
      <Spinner animation="border mt-4 mb-2 ms-5" role="status">
      </Spinner>
    )
  }

}

export default UpdateAccount;