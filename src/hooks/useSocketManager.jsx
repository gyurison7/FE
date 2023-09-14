import socketIoClient from 'socket.io-client';
import { useSetRecoilState } from 'recoil';
import { isConnectSocketState } from '../recoil/Atom.js';
import { useEffect, useState } from 'react';
import { fetchNotification } from '../api/noticeApi.js';
import { useToast } from './useToast.jsx';

export function useSocketManager() {
  const setIsConnectSocketState = useSetRecoilState(isConnectSocketState);
  const [noticeCount, setNoticeCount] = useState(0);
  const { showToast } = useToast();

  function getLoginUserId() {
    return localStorage.getItem('userId');
  }

  const getNotice = async () => {
    try {
      const responseData = await fetchNotification();
      const newData = responseData.filter(
        (data) => data['Participants.status'] === 0
      );
      setNoticeCount(newData.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  function initializeSocket() {
    const ENDPOINT = 'https://api.memorymingle.shop';
    const socket = socketIoClient(ENDPOINT, {
      withCredentials: true,
    });

    const newUserAddedHandler = (data) => {
      if (getLoginUserId()) {
        showToast(`${data.groupName}에 초대되셨습니다.`);
      }
      getNotice();
    };

    socket.on('connect', () => {
      setIsConnectSocketState(true);
      console.log('연결 상태', socket.connected);
      socket.emit('register', getLoginUserId());
    });

    socket.on('newUserAdded', newUserAddedHandler);

    socket.on('reconnect', () => {
      socket.emit('register', getLoginUserId());
    });

    socket.on('disconnect', () => {
      setIsConnectSocketState(false);
    });

    socket.on('connect_error', (error) => {
      console.log('Connection Error:', error);
    });

    return socket;
  }

  return { initializeSocket, noticeCount };
}
