import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function NotProtectedRoute() {
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
          navigate('/groupmain');
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkUserId();
  }),
    [navigate, setUserId];

  return userId ? null : <Outlet />;
}

export default NotProtectedRoute;
