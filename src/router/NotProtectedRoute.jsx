import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function NotProtectedRoute() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginCheck = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/auth/login', {
          withCredentials: true,
        });
        if(response.data.success) {
          navigate('/groupmain');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loginCheck();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}

export default NotProtectedRoute;
