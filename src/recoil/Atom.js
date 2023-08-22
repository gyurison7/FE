import { atom } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: null,
});

export const selectedProfileState = atom({
  key: 'selectedProfileState',
  default: null,
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});
