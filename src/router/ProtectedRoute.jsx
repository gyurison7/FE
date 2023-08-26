import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function ProtectedRoute() {
  const navigate = useNavigate();
  const userId = secureLocalStorage.getItem('userId');

  useEffect(() => {
    if (!userId) navigate('/login');
  }, [userId, navigate]);

  return userId ? <Outlet /> : null;
}

export default ProtectedRoute;