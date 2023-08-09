import React, { useState } from 'react';
import { styled } from 'styled-components';
import { signup } from '../../api/auth'
import SignupPageHeader from '../../layout/header/SignupPageHeader';
import SignupModal from '../../components/SignupModal.jsx';
import Input from '../../components/common/input/Input.jsx';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [openModal, setOpenModal] = useState(false);

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
        setOpenModal(true);
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  }

  return (
    <>
      <SignupPageHeader />
      <Wrapper>
        <form onSubmit={signupHandler}>
          <InputContainer>
            <label htmlFor='id'>아이디</label>
            <Input
              onChange={onChangeIdHandelr}
              type="text"
              id='id'
              name='id'
              value={id}
              placeholder='아이디 입력'
              theme='underLine'
            />
            {idError && <small>{idError}</small>}
          </InputContainer>
          <InputContainer>
            <label htmlFor='id'>비밀번호</label>
            <Input
              onChange={onChangePasswordHandelr}
              type="password"
              id='password'
              name='password'
              value={password}
              placeholder='비밀번호 입력'
              theme='underLine'
            />
            {passwordError && <small>{passwordError}</small>}
            <Input
              onChange={onChangeConfirmHandelr}
              type="password"
              name='confirm'
              value={confirm}
              placeholder='비밀번호 확인'
              theme='underLine'
            />
            {confirmError && <small>{confirmError}</small>}
          </InputContainer>
          <ButtonContainer>
            <button type='submit'>가입하기</button>
          </ButtonContainer>
        </form>
        {setOpenModal ? openModal && (<SignupModal />) : null}
      </Wrapper>
    </>
  )
}

export default Signup;

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  //border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media (max-height: 670px) {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  label {
    align-self: flex-start;
    text-align: left;
    margin-left: 5vw;
    color: #5873FE;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  small {
    align-self: flex-start;
    text-align: left;
    margin-left: 5vw;
    margin-right: 5vw;
    font-size: 0.8rem;
    color: #FF7E62;
    font-family: Apple SD Gothic Neo;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: pre-line;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 28vh;
  @media (max-height: 750px) {
    margin-top: 17vh;
  }
  @media (max-height: 670px) {
    margin-top: 13vh;
  }
  button {
    width: 21.375rem;
    height: 3.5625rem;
    flex-shrink: 0;
    border: none;
    border-radius: 1.78125rem;
    background: #5873FE;
    color: #FFF;
    text-align: center;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

