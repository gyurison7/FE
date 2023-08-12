import React from 'react';
import { styled } from 'styled-components';

const KakaoLogin = () => {
    const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    const kakaoLoginHandler = () => {
        window.location.href = kakaoURL;
    }

    return (
        <KakaoLoginButtonContainer>
            <button type='button' onClick={kakaoLoginHandler}>
                <img src={`${process.env.PUBLIC_URL}assets/image/kakao_login.png`} alt='kakao_login' />
            </button>
        </KakaoLoginButtonContainer>
    )
}

export default KakaoLogin;

const KakaoLoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  @media (max-height: 750px) {
    margin-top: 2rem;
  }
  button {
    background: transparent;
    border: none;
  }
  img {
    width: 90%
  }
`;