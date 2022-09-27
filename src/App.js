import logo from './logo.svg';
import './App.css';
import { getUser, logout, logoutAll, signup } from './services/userService';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { createBrowserRouter, Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function App() {

  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const context = useOutletContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tasks, setTaks] = useState([]);

  const auth = async () => {
    const data = await getUser();
    if (data !== 401 && data !== 400) {
      setIsLoading(false);

      setIsAuth(true);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setTaks(data.tasks);

      navigate('/home');
      return setIsAuth(true);
    }
    setIsAuth(false);
    navigate('/signup');
    setIsLoading(false);
  }

  useEffect(() => {
    auth();
  }, []);

  const onSignup = (user) => {
    setIsAuth(true);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);

    window.location.reload(false);
  }

  const onLogin = (user) => {
    setIsAuth(true);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setTaks(user.tasks);

    window.location.reload(false);
  }

  const onLogout = async () => {
    setIsLoading(true);
    setIsError(false);
    const result = await logout();
    if (result !== 400 && result !== 401) {
      setIsAuth(false);
      navigate('/signup')
      return setIsLoading(false);
    }
    setIsLoading(false);
    setIsError(true);
  }
  const onLogoutAll = async () => {
    setIsLoading(true);
    setIsError(false);
    const result = await logoutAll();
    if (result !== 400 && result !== 401) {
      setIsAuth(false);
      navigate('/signup')
      return setIsLoading(false);
    }
    setIsLoading(false);
    setIsError(true);
  }

  const onNewTask = async () => {
    auth();
  }

  const onUpdateAccount = async () => {
    window.location.reload(false);
  }

  if (!isLoading) {

    return (
      <div className='container-fluid'>
        <div className='row sticky-top'>
          <div className='col'>
            <h1>
              Task Manager
            </h1>
          </div>
          {
            isAuth ? (
              <>
                <div className='col'>
                  <div className='d-flex justify-content-end me-5'>
                    <div className='text-black fs-3 me-5'>
                      welcome, {firstName}
                    </div>
                    <div>
                      <NavDropdown title="settings" id="basic-nav-dropdown" className='text-black fs-3'>
                        <Link to={'/update-account'}>
                          <NavDropdown.Item href='/update-account'>
                            Update Account
                          </NavDropdown.Item>
                        </Link>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={onLogout}>
                          Logout
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={onLogoutAll}>
                          Logout on all devices
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>

                </div>
              </>
            ) : <>
            </>
          }

        </div>
        <div className='row'>
          <Outlet context={[isAuth, onSignup, onLogin, tasks, onNewTask, firstName, lastName, email, onUpdateAccount]} />
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

export default App;
