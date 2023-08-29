import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const KakaoLoginRedirect = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/auth/login/kakao/callback`,
          { code },
          { withCredentials: true }
        );
        if (response.data) {
          console.log(response.data);
          secureLocalStorage.setItem('userId', response.data.userId);
          navigate('/groupmain');
        }
      } catch (error) {
        console.error(error);
      }
    };
    kakaoLogin();
  }, [code]);
};

export default KakaoLoginRedirect;
