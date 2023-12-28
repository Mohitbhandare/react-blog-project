import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authServices from './appwrite/auth';
import { Header, Footer } from './components/index';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>TODO:{/* <OutLet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
