import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { login } from '../../api/auth';
import Input from '../../components/common/input/Input.jsx';
import KakaoLogin from '../kakao-login/KakaoLogin.jsx';
import Button from '../../components/common/button/Button.jsx';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const onChangeIdHandelr = (e) => {
    setId(e.target.value);
    setIdError('');
  };

  const onChangePasswordHandelr = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      return;
    } else if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const responseData = await login(id, password);
      if (responseData) {
        localStorage.setItem('userId',responseData.userId);
        navigate('/groupmain');
      } else {
        alert('아이디 또는 비밀번호를 다시 확인해주세요.');
      }
    } catch (error) {
      alert('아이디 또는 비밀번호를 다시 확인해주세요.');
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={loginHandler}>
        <LogoImage
          src={`${process.env.PUBLIC_URL}/assets/image/logo.png`}
          alt='logo'
        />
        <InputContainer>
          <Input
            onChange={onChangeIdHandelr}
            type='text'
            id='id'
            name='id'
            value={id}
            placeholder='아이디 입력'
            theme='radius'
          />
          {idError && <small>{idError}</small>}
          <Input
            onChange={onChangePasswordHandelr}
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='비밀번호 입력'
            theme='radius'
          />
          {passwordError && <small>{passwordError}</small>}
        </InputContainer>
        <ButtonContainer>
          <Button type='submit' size='large' background='#FFF' color='#5873FE'>
            로그인
          </Button>
        </ButtonContainer>
        <LinkContainer>
          {/* <LinkStyle to='/'>아이디 찾기</LinkStyle>
          <LinkStyle to='/'>비밀번호 찾기</LinkStyle> */}
          <LinkStyle to='/signup'>회원가입</LinkStyle>
        </LinkContainer>
        <KakaoLogin />
      </form>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(#3D5CFF, #8895F1);
  padding: 24px;
`;

const LogoImage = styled.img`
  width: 52%;
  height: auto;
  position: relative;
  top: 10vh;
  margin: 0 auto;
  display: flex;
  object-fit: cover;
`;

const InputContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16vh;

  small {
    align-self: flex-start;
    text-align: left;
    margin-left: 1vw;
    color: #FF6A6A;
    font-size: 12px;
    font-weight: 400;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: -6vh;

  button {
    font-weight: 700;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: -8.5vh;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  //margin-right: 0.625rem;
  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
`;
