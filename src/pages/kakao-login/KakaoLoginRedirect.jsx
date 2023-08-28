import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLoginRedirect = () => {
  //const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToGroupMain = async () => {
        try {
            await navigate('/groupmain');
            console.log("Navigation completed");
        } catch (error) {
            console.log("Navigation error:", error);
        }
    }

    redirectToGroupMain();
}, []);

};

export default KakaoLoginRedirect;
