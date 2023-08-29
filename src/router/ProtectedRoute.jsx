import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await api.get('/auth/login', {
          withCredentials: true,
        });
        if (!response.data.success) {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    loginCheck();
  }, [navigate]);

  return <Outlet />;
}

export default ProtectedRoute;
