import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function NotProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await api.get('/auth/login', {
          withCredentials: true,
        });
        if (response.data.success) {
          navigate('/groupmain');
        }
      } catch (error) {
        console.error(error);
      }
    };
    loginCheck();
  }, [navigate]);

  return <Outlet />;
}

export default NotProtectedRoute;
