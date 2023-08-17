import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  onChangePasswordHandler,
  passwordCheckHandler,
} from '../../utils/passwordValidation.js';
import { changePassword } from '../../api/auth.js';
import Header from '../../components/common/header/Header.jsx';
import Input from '../../components/common/input/Input.jsx';
import Button from '../../components/common/button/Button.jsx';

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [oldPasswordError, setOldPasswordError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmError, setConfirmError] = useState();

  const navigate = useNavigate();

  const onChangeOldPasswordHandler = (e) => {
    const value = e.target.value;
    setOldPassword(value);
    oldPasswordCheckHandler(value);
  };

  const oldPasswordCheckHandler = (oldPassword) => {
    if (oldPassword === '') {
      setOldPasswordError('현재 비밀번호를 입력해주세요.');
      return false;
    } else {
      setOldPasswordError('');
      return true;
    }
  };

  const passwordChangeUtil = (e) =>
    onChangePasswordHandler(
      e,
      password,
      confirm,
      setPassword,
      setConfirm,
      setPasswordError,
      setConfirmError
    );

  const passwordSubmitHandler = async (e) => {
    e.preventDefault();

    if (!oldPasswordCheckHandler(oldPassword)) return;

    if (!passwordCheckHandler(password, confirm, setPasswordError, setConfirmError))
      return;

    if (oldPassword === password) {
      alert('새로운 비밀번호는 기존 비밀번호와 다르게 설정해주세요!');
      return;
    }

    try {
      const responseData = await changePassword(oldPassword, password, confirm);
      if (responseData) {
        alert('비밀번호이 변경이 완료되었습니다!');
        navigate('/mypage');
      } else {
        alert('비밀번호 변경에 실패했습니다. 확인 후 다시 입력해주세요.');
      }
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다. 확인 후 다시 입력해주세요.');
      console.error(error);
    }
  };

  return (
    <>
      <Header title={'비밀번호 변경'} />
      <Wrapper>
        <Form onSubmit={passwordSubmitHandler}>
          <InputWrapper>
            <InputContainer>
              <label htmlFor='oldPassword'>현재 비밀번호</label>
              <Input
                onChange={onChangeOldPasswordHandler}
                type='password'
                id='oldPassword'
                name='oldPassword'
                value={oldPassword}
                placeholder='현재 비밀번호 입력'
                theme='underLine'
                maxLength={16}
              />
              {oldPasswordError && <small>{oldPasswordError}</small>}
            </InputContainer>
            <InputContainer>
              <label htmlFor='password'>새 비밀번호</label>
              <Input
                onChange={passwordChangeUtil}
                type='password'
                id='password'
                name='password'
                value={password}
                placeholder='새 비밀번호 입력'
                theme='underLine'
                maxLength={16}
              />
              {passwordError && <small>{passwordError}</small>}
            </InputContainer>
            <InputContainer>
              <label htmlFor='confirm'>새 비밀번호 확인</label>
              <Input
                onChange={passwordChangeUtil}
                type='password'
                id='confirm'
                name='confirm'
                value={confirm}
                placeholder='새 비밀번호 확인'
                theme='underLine'
                maxLength={16}
              />
              {confirmError && <small>{confirmError}</small>}
            </InputContainer>
          </InputWrapper>
          <ButtonContainer>
            <Button type='submit' size='large' background='#5873FE' color='#FFF'>
              변경하기
            </Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </>
  );
};

export default PasswordChange;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12vh;
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
`;

const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;

  label {
    width: 90%;
    align-self: flex-start;
    text-align: left;
    color: #5873fe;
    font-size: 16px;
    font-weight: 700;
  }

  small {
    width: 90%;
    align-self: flex-start;
    text-align: left;
    font-size: 13px;
    color: #ff7e62;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 428px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -25vh;
  @media (max-height: 750px) {
    bottom: -17vh;
  }

  button {
    font-weight: 700;
  }
`;
