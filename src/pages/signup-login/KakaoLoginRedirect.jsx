import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoLoginRedirect = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    // useEffect(() => {
    //     axios.post(`http://localhost:3001/kakaoLogin?code=${code}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         //localStorage.setItem("token", res.data.token);
    //         navigate('/groupmain');
    //     });
    // }, []);

    useEffect(() => {
        const kakaoLogin = async () => {
            const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URI}?code=${code}`,
                {},
                { withCredentials: true }
            );
            console.log(response.data);
            navigate('/groupmain');
        }
        kakaoLogin();
    }, []);


    // return <div>로그인 중입니다.</div>
}

export default KakaoLoginRedirect;