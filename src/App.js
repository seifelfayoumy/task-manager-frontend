import logo from './logo.svg';
import './App.css';
import { getUser, signup } from './services/userService';

function App() {
  const test = async () => {
    const user = await getUser();
  }
  test()


  return (
    <div className='text-white mt-5'>haloo</div>
  );
}

export default App;
