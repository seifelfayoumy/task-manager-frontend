import logo from './logo.svg';
import './App.css';
import { getUser, signup } from './services/userService';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {

  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

      return setIsAuth(true);
    }
    setIsLoading(false);
    setIsAuth(false);
  }

  useEffect(() => {
    auth();
  }, []);

  const signup = (user) => {
    setIsAuth(true);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }


  if (!isLoading) {
    if (isAuth) {
      return (
        <div className='container-fluid'>
          <div className='row sticky-top'>
            <div className='col'>
              <h1>
                Task Manager
              </h1>
            </div>
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
          </div>
        </div>
      );
    } else {
      return (
        <div className='container-fluid'>
          <div className='row sticky-top'>
            <div className='col'>
              <h1>
                Task Manager
              </h1>
            </div>
          </div>
          <div className='row'>
            <Signup onSignup={signup} />
          </div>
        </div>
      );
    }
  }
}

export default App;
