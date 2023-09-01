import React, { useEffect } from 'react';
import { styled } from 'styled-components';

const KakaoLogin = () => {
  const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error');
    
    if (error === 'KakaoLoginFailed') {
      alert('탈퇴한 회원입니다.');
    }
  }, []);

  const kakaoLoginHandler = () => {
    window.location.href = kakaoURL;
  };

  return (
    <KakaoLoginButtonContainer>
      <button type='button' onClick={kakaoLoginHandler}>
        <img
          src={`${process.env.PUBLIC_URL}assets/image/kakao_login.png`}
          alt='kakao_login'
        />
      </button>
    </KakaoLoginButtonContainer>
  );
};

export default KakaoLogin;

const KakaoLoginButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: -15vh;

  button {
    display: flex;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    img {
      width: 90%;
    }
  }
`;