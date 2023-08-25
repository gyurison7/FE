import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function NotProtectedRoute() {
  const navigate = useNavigate();
  const userId = secureLocalStorage.getItem('userId');

  useEffect(() => {
    if (userId) navigate('/groupmain');
  }, [userId, navigate]);

  return userId ? null : <Outlet />;
}

export default NotProtectedRoute;
