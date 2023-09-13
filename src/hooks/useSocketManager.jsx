import socketIoClient from 'socket.io-client';
import { useSetRecoilState } from 'recoil';
import { isConnectSocketState } from '../recoil/Atom.js';
import { useToast } from './useToast.jsx';

export function useSocketManager() {
  const setIsConnectSocketState = useSetRecoilState(isConnectSocketState);
  const { showToast } = useToast();

  function getLoginUserId() {
    return localStorage.getItem('userId');
  }

  function initializeSocket() {
    const ENDPOINT = 'https://api.memorymingle.shop';
    const socket = socketIoClient(ENDPOINT, {
      withCredentials: true,
    });

    const newUserAddedHandler = (data) => {
      if (getLoginUserId()) {
        showToast(`${data.groupName}에 초대되셨습니다.`);
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
