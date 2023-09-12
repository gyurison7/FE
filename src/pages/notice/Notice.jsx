import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Header from '../../components/common/header/Header.jsx';
import Footer from '../../layout/footer/Footer.js';
import socketIoClient from 'socket.io-client';
import api from '../../api/index.jsx';
import { useToast } from '../../hooks/useToast.jsx';

const Notice = () => {
  const [socketConnection, setSocketConnection] = useState();
  const [activeNav, setActiveNav] = useState('new');
  const loginUserId = localStorage.getItem('userId');

  console.log('loginUserId', loginUserId);

  const { showToast } = useToast();

  useEffect(() => {
    const ENDPOINT = 'https://api.memorymingle.shop';
    //const ENDPOINT = 'http://localhost:4000';

    const socket = socketIoClient(ENDPOINT, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('연결 상태', socket.connected); // 이곳에서 true가 출력되어야 함

      socket.on('connect_error', (error) => {
        console.log('Connection Error:', error);
      });

      socket.emit('register', loginUserId);

      socket.on('newUserAdded', (data) => {
        console.log('이벤트 발생');
        console.log(data);
        const thumbnailUrl = data.thumbnailUrl;
        const groupName = data.groupName;
        const groupId = data.groupId;
        const userId = data.userId;

        console.log(
          `유처 추가 확인:${userId} ${thumbnailUrl},${groupId}번 ${groupName}에 초대되셨습니다.`
        );
        showToast(`${groupName}에 초대되셨습니다.`);
        // 여기서 알림 기능을 구현할 수 있습니다.
        // const sendNotification = async () => {
        //   try {
        //     const response = await api.post('/notification', {
        //       thumbnailUrl,
        //       message: `${groupName}에 초대되셨습니다.`,
        //       groupId,
        //       userId,
        //     });
        //     console.log(response);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };
        // sendNotification();
      });

      setSocketConnection(socket);
    });

    // 컴포넌트가 unmount 될 때 소켓 연결 종료
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [loginUserId]);

  const noticeClickHandler = (name) => {
    setActiveNav(name);
  };

  const buttonClickHandler = async () => {
    const groupId = 2;
    try {
      const response = await api.post(
        `/group/${groupId}`,
        { userId: 15, thumbnailUrl: '11', groupName: '테스트' },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectSocket = () => {
    if (socketConnection) {
      socketConnection.disconnect();
      setSocketConnection(null); // 상태를 null로 설정하여 연결을 끊었다는 것을 표시
    }
  };

  return (
    <Wrapper>
      <Header title='알림' />
      <Navbar>
        <button
          className={activeNav === 'new' ? 'active' : ''}
          onClick={() => noticeClickHandler('new')}
        >
          새로운 알림
        </button>
        <button
          className={activeNav === 'past' ? 'active' : ''}
          onClick={() => noticeClickHandler('past')}
        >
          지난 알림
        </button>
      </Navbar>
      <NoticeContainer>
        <button onClick={buttonClickHandler}>알림 테스트</button>
        <button onClick={disconnectSocket}>연결 끊기</button>
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
    color: #c2c2c2;
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-weight: 600;
  }

  .active {
    color: #5873fe;
    padding: 6px 4px;
    border-bottom: 1px solid #5873fe;
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
