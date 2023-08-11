import React from 'react';
import { styled } from 'styled-components';
import MyPageHeader from '../../layout/header/MyPageHeader.js';
import Footer from '../../layout/footer/Footer.js';

const MyPage = () => {
  return (
    <>
      <MyPageHeader />
      <HeaderContainer>
        <ProfileContainer>
          <img src={`${process.env.PUBLIC_URL}assets/image/user.png`} alt='user' />
          <NicknameContainer>
            <span>김밍글</span>
            <img
              src={`${process.env.PUBLIC_URL}assets/svgs/pencil.svg`}
              alt='닉네임 바꾸기'
            />
          </NicknameContainer>
        </ProfileContainer>
        <ButtonContainer>
          <button className='passwordChange'>비밀번호 변경</button>
          <button className='memberOut'>회원탈퇴</button>
        </ButtonContainer>
      </HeaderContainer>
      <Footer />
    </>
  );
};

export default MyPage;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  margin-top: 8vh;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  margin-bottom: 37vh;
  @media (max-height: 750px) {
    margin-bottom: 30vh;
  }
  @media (max-height: 670px) {
    margin-bottom: 25vh;
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
  padding: 0.375rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  button {
    background: transparent;
    border: none;
    font-family: Apple SD Gothic Neo;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .passwordChange {
    border-bottom: 1px solid #4c4c4c;
    color: #4c4c4c;
    font-size: 1rem;
  }
  .memberOut {
    color: #b9b9b9;
    font-size: 0.875rem;
  }
`;
