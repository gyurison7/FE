import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function ProtectedRoute() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const response = await api.get('/userInfo', {
          withCredentials: true,
        });
        const userId = response.data.userInfoData.userId;
        if (userId) {
          setUserId(userId);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    checkUserId();
  }),
    [navigate, setUserId];

  return userId ? <Outlet /> : null;
}

export default ProtectedRoute;
