import socketIoClient from 'socket.io-client';
import { useSetRecoilState } from 'recoil';
import { isConnectSocketState, noticeCountState, noticeListState } from '../recoil/Atom.js';
import { useEffect } from 'react';
import { fetchNotification } from '../api/noticeApi.js';
import { useToast } from './useToast.jsx';

export function useSocketManager() {
  const setIsConnectSocketState = useSetRecoilState(isConnectSocketState);
  const setNoticeList = useSetRecoilState(noticeListState);
  const setNoticeCount = useSetRecoilState(noticeCountState);
  const { showToast } = useToast();

  function getLoginUserId() {
    return localStorage.getItem('userId');
  }

  const getNotice = async () => {
    if (!getLoginUserId()) return;

    try {
      const responseData = await fetchNotification();
      if (responseData.success) {
        setNoticeList(responseData.data); // 전체 알림 데이터
        const newData = responseData.data.filter(
          (notice) => notice['Participants.status'] === 0
        );
        setNoticeCount(newData.length); // 새로운 알림 데이터 개수
      }
    } catch (error) {
      console.error(error);
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
        showToast(`앨범 ${data.groupName}에 초대되셨습니다.`);
        getNotice();
      }
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

  return { initializeSocket };
}
