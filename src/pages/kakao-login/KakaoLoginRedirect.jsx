import { useEffect } from "react";
import axios from "axios";

const KakaoLoginRedirect = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const kakaoLogin = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URI}?code=${code}`,
                    { withCredentials: true }
                );
                console.log("response", response);
            } catch (error) {
                console.error(error);
            }
        }
        kakaoLogin();
    }, [code]);
}

export default KakaoLoginRedirect;