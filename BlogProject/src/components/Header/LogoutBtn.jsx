import { useDispatch } from 'react-redux';
import authServices, { AuthServices } from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authServices.logout().then();
  };
  return <div></div>;
};

export default LogoutBtn;
