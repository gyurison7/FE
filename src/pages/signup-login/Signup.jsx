import React, { useState } from 'react';
import { styled } from 'styled-components';
import { signup } from '../../api/auth'
import { useNavigate } from 'react-router-dom';
import SignupPageHeader from '../../layout/header/SignupPageHeader';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const navigate = useNavigate();

  const onChangeIdHandelr = (e) => {
    setId(e.target.value);
    setIdError('');
  }

  const onChangePasswordHandelr = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  }

  const onChangeConfirmHandelr = (e) => {
    setConfirm(e.target.value);
    setConfirmError('');
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    const idCheck = /^[a-z\d]{5,10}$/;
    const passwordCheck = /^[a-z\d!@*&-_]{4,16}$/; // TODO : 테스트용으로 길이 4로 조정 테스트 완료 후 수정 예정
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      return;
    } else if (!idCheck.test(id)) {
      setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
      return;
    }
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    } else if (!passwordCheck.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return;
    }
    if (confirm !== password) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const responseData = await signup(id, password, confirm);
      if (responseData) {
        alert('회원가입 완료');
        navigate('/login');
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <SignupPageHeader />
      <form onSubmit={signupHandler}>
        <InputContainer>
          <input
            onChange={onChangeIdHandelr}
            name='id'
            type="text"
            value={id}
            placeholder='아이디 입력' />
          {idError && <small>{idError}</small>}
        </InputContainer>
        <InputContainer>
          <input
            onChange={onChangePasswordHandelr}
            name='password'
            type="password"
            value={password}
            placeholder='비밀번호 입력' />
          {passwordError && <small>{passwordError}</small>}
          <input
            onChange={onChangeConfirmHandelr}
            name='confirm'
            type="password"
            value={confirm}
            placeholder='비밀번호 확인' />
          {confirmError && <small>{confirmError}</small>}
        </InputContainer>
        <ButtonContainer>
          <button type='submit'>가입하기</button>
        </ButtonContainer>
      </form>
    </Wrapper>
  )
}

export default Signup;

const Wrapper = styled.div`
  position: relative;
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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 4rem;
  margin-bottom: 4rem;

  input {
    width: 21.375rem;
    height: 3.5625rem;
    flex-shrink: 0;
    border-radius: 1.78125rem;
    border: 1px solid #E8E8E8;
    padding: 0 1.25rem;
  }

  small {
    width: 85%;
    font-size: 0.8rem;
    color: red;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

