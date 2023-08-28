import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx';

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const response = await api.get('/userInfo', {
          withCredentials: true,
        });
        const userId = response.data.userInfoData.userId;
        if (!userId) {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    checkUserId();
  }),
    [navigate];

  return <Outlet />;
}

export default ProtectedRoute;


// import { useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import secureLocalStorage from 'react-secure-storage';

// function ProtectedRoute() {
//   const navigate = useNavigate();
//   const userId = secureLocalStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId) navigate('/login');
//   }, [userId, navigate]);

//   return userId ? <Outlet /> : null;
// }

// export default ProtectedRoute;