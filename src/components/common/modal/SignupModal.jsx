import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../button/Button.jsx';
import CommonModal from './CommonModal.jsx';

const SignupModal = () => {
  const navigate = useNavigate();

  return (
    <CommonModal
      img={'check'}
      title={'회원가입 완료'}
      description={'지금 바로 우리들의 추억을\n만들어보세요!'}
      button={
        <ButtonContainer>
          <Button
            onClick={() => navigate('/userprofile')}
            size='large'
            background='#5873FE'
            color='#FFF'
          >
            확인
          </Button>
        </ButtonContainer>
      }
      height={'436px'}
      padding={'69px 21px 32px'}
      firstGap={'28px'}
      secondGap={'38px'}
    ></CommonModal>
  );
};

export default SignupModal;

const ButtonContainer = styled.div`
  width: 100%;
  button {
    width: 100%;
    font-weight: 700;
  }
`;