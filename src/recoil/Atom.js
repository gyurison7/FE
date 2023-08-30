import { atom } from 'recoil';

export const selectedProfileState = atom({
  key: 'selectedProfileState',
  default: null,
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});
export const DropdownState = atom({
  key: 'DropdownState',
  default: false,
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
