import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';
import { useRecoilState } from 'recoil';
import { userIdState } from '../recoil/Atom.js';

function ProtectedRoute() {
  const [userId, setUserId] = useRecoilState(userIdState);
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
