import logo from './logo.svg';
import './App.css';
import { getUser, signup } from './services/userService';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { createBrowserRouter, Outlet, useNavigate, useOutletContext } from 'react-router-dom';

function App() {

  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const context = useOutletContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tasks, setTaks] = useState([]);

  const auth = async () => {
    const data = await getUser();
    if (data !== 401) {
      setIsLoading(false);

      setIsAuth(true);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setTaks(data.tasks);

      navigate('/home')
      return setIsAuth(true);
    }
    navigate('/signup')
    setIsLoading(false);
    setIsAuth(false);
  }

  useEffect(() => {
    auth();
  }, []);

  const onSignup = (user) => {
    setIsAuth(true);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);

    navigate('/home');
  }

  const onLogin = (user) => {
    setIsAuth(true);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setTaks(user.tasks);

    navigate('/home');
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
                        <NavDropdown.Item href="#action/3.2">
                          Change email
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Change first name
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Change last name
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Change password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Logout
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">
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
          <Outlet context={[isAuth, onSignup, onLogin, tasks]}/>
        </div>
      </div>
    );

  }
}

export default App;
