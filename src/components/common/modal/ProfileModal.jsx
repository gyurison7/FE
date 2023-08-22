import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { selectedProfileState } from '../../../recoil/Atom';

export default function ProfileModal({ isOpen, closeModal }) {
  const selectedProfile = useRecoilValue(selectedProfileState);
  if (!selectedProfile) {
    return null;
  }
  return (
    <>
      <Modal open={isOpen} footer={null} width={350} onCancel={closeModal}>
        <div>{selectedProfile.nickname}</div>
        <img src={selectedProfile.profileUrl} alt='' />
      </Modal>
    </>
  );
}
ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
