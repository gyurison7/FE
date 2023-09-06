import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import Header from '../../components/common/header/Header.jsx';
import Footer from '../../layout/footer/Footer.js';
import socketIoClient from 'socket.io-client';
import axios from 'axios';

const Notice = () => {
  const userId = localStorage.getItem('userId');
  console.log(userId);

  useEffect(() => {
    const socket = socketIoClient('https://api.memorymingle.shop');
    
    socket.emit('register', userId);

    socket.on('newUserAdded', (data) => {
      console.log('New user added:', data.userId);
      // 여기서 알림 기능을 구현할 수 있습니다.
    });

    // 컴포넌트가 unmount 될 때 소켓 연결 종료
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const buttonClickHandler = async () => {
    const groupId = 1;
    try {
      const response = await axios.post(
        `https://api.memorymingle.shop/group/${groupId}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Header title='알림' />
      <Navbar>
        <button>새로운 알림</button>
        <button>지난 알림</button>
      </Navbar>
      <NoticeContainer>
        <button onClick={buttonClickHandler}>알림 테스트</button>
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
