import React from 'react';
import { styled } from 'styled-components';
import Header from '../../components/common/header/Header.jsx';
import Footer from '../../layout/footer/Footer.js';

const Notice = () => {
  return (
    <Wrapper>
      <Header title='알림' />
      <Navbar>
        <button>새로운 알림</button>
        <button>지난 알림</button>
      </Navbar>
      <NoticeContainer>
        <div>
          <p>앨범 `찐친즈모임`에 초대되셨습니다.</p>
          <p>날짜</p>
        </div>
      </NoticeContainer>
      <Foot>
        <Footer />
      </Foot>
    </Wrapper>
  );
};

export default Notice;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Navbar = styled.div`
  display: inline-flex;
  padding: 6px 4px;
  justify-content: center;
  align-items: center;
  gap: 17px;
  margin: 30px 0 0 24px;

  button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-weight: 600;
  }
`;

const NoticeContainer = styled.div`
  margin: 18px 0 0 24px;
`;

const Foot = styled.div`
  position: fixed;
  bottom: 0;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
