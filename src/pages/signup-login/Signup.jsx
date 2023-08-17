import React, { useState } from 'react';
import { styled } from 'styled-components';
import { signup, idDuplicateCheck } from '../../api/auth';
import SignupModal from '../../components/common/modal/SignupModal.jsx';
import Input from '../../components/common/input/Input.jsx';
import Header from '../../components/common/header/Header.jsx';
import Button from '../../components/common/button/Button.jsx';
import {
  onChangePasswordHandler,
  passwordCheckHandler,
} from '../../utils/passwordValidation';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사를 했는지 안했는지
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    idCheckHandler(idValue);
  };

  const passwordChangeUtil = (e) => onChangePasswordHandler(e, password, confirm, setPassword, setConfirm, setPasswordError, setConfirmError);

  const idCheckHandler = async (id) => {
    const idRegex = /^[a-zA-Z\d]{5,20}$/;
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      setIsIdAvailable(false);
      return false;
    } else if (!idRegex.test(id)) {
      setIdError('아이디는 5~20자의 영문, 숫자만 사용 가능합니다.');
      setIsIdAvailable(false);
      return false;
    }
    try {
      const responseData = await idDuplicateCheck(id);
      if (responseData) {
        setIdError('사용 가능한 아이디입니다.');
        setIsIdCheck(true);
        setIsIdAvailable(true);
        return true;
      } else {
        setIdError('이미 사용중인 아이디입니다.');
        setIsIdAvailable(false);
        return false;
      }
    } catch (error) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(error);
      return false;
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    //setOpenModal(true); // TODO : 테스트 완료 후 삭제하기
    const idCheckresult = await idCheckHandler(id);
    if (idCheckresult) setIdError('');
    else return;
    if (!isIdCheck || !isIdAvailable) {
      alert('아이디 중복 검사를 해주세요.');
      return;
    }

    if (!passwordCheckHandler(password, confirm, setPasswordError, setConfirmError)) return;

    try {
      const responseData = await signup(id, password, confirm);
      if (responseData) {
        localStorage.setItem('loginId', id);
        setOpenModal(true);
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <>
      <Header title='회원가입' />
      <Wrapper>
        <Form onSubmit={signupHandler}>
          <InputWrapper>
            <InputContainer>
              <label htmlFor='id'>아이디</label>
              <Input
                onChange={onChangeIdHandler}
                type='text'
                id='id'
                name='id'
                value={id}
                placeholder='아이디 입력'
                theme='underLine'
                maxLength={20}
              />
              {idError && (
                <small className={isIdAvailable ? 'idAvailable' : ''}>
                  {idError}
                </small>
              )}
            </InputContainer>
            <InputContainer>
              <label htmlFor='id'>비밀번호</label>
              <Input
                onChange={passwordChangeUtil}
                type='password'
                id='password'
                name='password'
                value={password}
                placeholder='비밀번호 입력'
                theme='underLine'
                maxLength={16}
              />
              {passwordError && <small>{passwordError}</small>}
              <Input
                onChange={passwordChangeUtil}
                type='password'
                id='confirm'
                name='confirm'
                value={confirm}
                placeholder='비밀번호 확인'
                theme='underLine'
                maxLength={16}
              />
              {confirmError && <small>{confirmError}</small>}
            </InputContainer>
          </InputWrapper>
          <ButtonContainer>
            <Button type='submit' size='large' background='#5873FE' color='#FFF'>
              가입하기
            </Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
      {openModal && <SignupModal />}
    </>
  );
}

export default Signup;

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
  gap: 8vh;
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
    align-self: flex-start;
    text-align: left;
    font-size: 13px;
    color: #ff7e62;
    font-weight: 600;
  }

  .idAvailable {
    color: #4c4c4c;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 428px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -27vh;
  @media (max-height: 750px) {
    bottom: -17vh;
  }

  button {
    font-weight: 700;
  }
`;
