import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginCheck = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/auth/login', {
          withCredentials: true,
        });
        if(!response.data.success) {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
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

export default ProtectedRoute;