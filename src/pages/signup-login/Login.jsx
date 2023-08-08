import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { login } from '../../api/auth';
import Input from '../../components/common/input/Input.jsx';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const onChangeIdHandelr = (e) => {
    setId(e.target.value);
    setIdError('');
  }

  const onChangePasswordHandelr = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  }

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
        alert('로그인 성공');
        navigate('/groupmain');
      } else {
        alert('아이디 또는 비밀번호를 다시 확인해주세요.');
      }
    } catch (error) {
      alert('아이디 또는 비밀번호를 다시 확인해주세요.');
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <form onSubmit={loginHandler}>
        <ImageStyle src={`${process.env.PUBLIC_URL}/assets/image/logo.png`} alt='logo' />
        <InputContainer>
          <Input
            onChange={onChangeIdHandelr}
            name='id'
            type='text'
            value={id}
            placeholder='아이디 입력'
            theme='radius' />
          {idError && <small>{idError}</small>}
          <Input
            onChange={onChangePasswordHandelr}
            name='password'
            type='password'
            value={password}
            placeholder='비밀번호 입력'
            theme='radius' />
          {passwordError && <small>{passwordError}</small>}
        </InputContainer>
        <ButtonContainer>
          <button type='submit'>로그인</button>
        </ButtonContainer>
        <LinkContainer>
          {/* <LinkStyle to='/'>아이디 찾기</LinkStyle>
          <LinkStyle to='/'>비밀번호 찾기</LinkStyle> */}
          <LinkStyle to='/signup'>회원가입</LinkStyle>
        </LinkContainer>
        <KakaoLoginButton>
          <img src={`${process.env.PUBLIC_URL}assets/image/kakao_login.png`} alt='kakao_login' />
        </KakaoLoginButton>
      </form>
    </Wrapper>
  )
}

export default Login;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 52.75rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageStyle = styled.img`
  margin: 0 auto;
  display: block;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 4rem;
  margin-bottom: 4rem;

  small {
    width: 85%;
    font-size: 0.8rem;
    color: #FF7E62;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
    margin-left: 1rem;
  }
`;

const ButtonContainer = styled.div`
  button {
    width: 21.375rem;
    height: 3.5625rem;
    flex-shrink: 0;
    border: none;
    border-radius: 1.78125rem;
    background: #959595;
    color: white;
    cursor: pointer;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  margin-top: 1rem;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  margin-right: 0.625rem;
  color: #535353;
  text-align: center;
  font-family: Apple SD Gothic Neo;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const KakaoLoginButton = styled.div`
  margin-top: 4rem;
  cursor: pointer;
`;
