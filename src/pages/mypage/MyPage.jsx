import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import Footer from '../../layout/footer/Footer.js';
import Header from '../../components/common/header/Header.jsx';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header title='마이페이지' />
      <MypageContainer>
        <ProfileContainer>
          <img src={`${process.env.PUBLIC_URL}assets/image/user.png`} alt='user' />
          <NicknameContainer>
            <span>김밍글</span>
            <img
              src={`${process.env.PUBLIC_URL}assets/svgs/pencil.svg`}
              alt='닉네임 바꾸기'
            />
          </NicknameContainer>
          <span>memorymingle</span>
        </ProfileContainer>
        <ButtonContainer>
          <button className='passwordChange' onClick={() => navigate('/pwchange')}>비밀번호 변경</button>
          <div>
            <button className='memberOut'>회원탈퇴</button>
            <span>|</span>
            <button className='logout'>로그아웃</button>
          </div>
        </ButtonContainer>
      </MypageContainer>
      <Footer />
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const MypageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  margin-top: 15vh;

  span {
    color: #959595;
    font-family: Apple SD Gothic Neo;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;

  span {
    color: #4c4c4c;
    font-family: Apple SD Gothic Neo;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  img {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  margin-top: 24vh;

  button {
    background: transparent;
    border: none;
    font-family: Apple SD Gothic Neo;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  div {
    display: flex;
    gap: 2vw;
    span {
      color: #b9b9b9;
    }
  }

  .passwordChange {
    border-bottom: 1px solid #4c4c4c;
    color: #4c4c4c;
    font-size: 1rem;
  }
  .memberOut, .logout {
    color: #b9b9b9;
    font-size: 0.875rem;
  }
`;
