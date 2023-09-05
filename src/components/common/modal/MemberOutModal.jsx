import React, { useState } from 'react';
import { styled } from 'styled-components';
import Button from '../button/Button.jsx';
import PropTypes from 'prop-types';

const MemberOutModal = ({ setMemberOutModal, memberOutHandler }) => {
  const [memberOutCheck, setMemberOutCheck] = useState('');

  return (
    <ModalWrapper>
      <ModalBackground></ModalBackground>
      <ModalBody>
        <TitleContainer>
          <img
            src={`${process.env.PUBLIC_URL}assets/svgs/member_out.svg`}
            alt='회원탈퇴'
          />
          <h2>회원 탈퇴</h2>
          <p>
            회원 탈퇴 시 계정 정보 및 추억은
            <br />
            삭제되어 복구가 불가능해요.
          </p>
        </TitleContainer>
        <InputContainer>
          <p className='second'>
            그래도 탈퇴하시려면 &quot;떠날래요&quot;를 입력해주세요.
          </p>
          <input
            onChange={(e) => setMemberOutCheck(e.target.value)}
            type='text'
            name='memberOutCheck'
            value={memberOutCheck}
            placeholder='"떠날래요"를 입력해주세요.'
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            onClick={() => setMemberOutModal(false)}
            size='medium'
            background='#94A3B8'
            color='#FFF'
          >
            취소
          </Button>
          <Button
            onClick={() => memberOutHandler(memberOutCheck)}
            size='medium'
            background='#FF6A6A'
            color='#FFF'
          >
            떠날래요
          </Button>
        </ButtonContainer>
      </ModalBody>
    </ModalWrapper>
  );
};

export default MemberOutModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 428px;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.6;
  background-color: #000000;
  z-index: 1;
`;

const ModalBody = styled.div`
  width: 86.5%;
  height: 436px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 16px 28px 16px;
  border-radius: 28px;
  background: #fff;
  flex-shrink: 0;
  z-index: 2;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 16px;
  color: #4c4c4c;
  line-height: 129.336%;
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
  p {
    font-weight: 500;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4c4c4c;
  gap: 24px;
  margin-bottom: 5vh;
  p {
    font-weight: 600;
  }
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #cecece;
    padding-bottom: 7px;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 22px;
  button {
    font-weight: 700;
  }
`;

MemberOutModal.propTypes = {
  setMemberOutModal: PropTypes.func.isRequired,
  memberOutHandler: PropTypes.func.isRequired,
};
