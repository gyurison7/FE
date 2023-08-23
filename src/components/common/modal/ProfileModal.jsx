import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { selectedProfileState } from '../../../recoil/Atom';
import { styled } from 'styled-components';

export default function ProfileModal({ isOpen, closeModal }) {
  const selectedProfile = useRecoilValue(selectedProfileState);
  if (!selectedProfile) {
    return null;
  }

  return (
    <>
      <StyledModal
        open={isOpen}
        footer={null}
        onCancel={closeModal}
        closable={false}
        wrapClassName={'con'}
        maskStyle={{ background: 'black', opacity: '0.9' }}
      >
        <Wrap>
          <ProfileImage src={selectedProfile.profileUrl} alt='' />
          <ProfileName>{selectedProfile.nickname}</ProfileName>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </Wrap>
      </StyledModal>
    </>
  );
}
ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
const StyledModal = styled(Modal)`
  .ant-modal-content {
    box-shadow: none;
    background-color: transparent;
    padding: 0;
  }
`;
const Wrap = styled.div`
  height: 74vh;
  text-align: center;
  color: white;
`;
const ProfileName = styled.div`
  padding-top: 28px;
  color: #fff;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;
const CloseButton = styled.button`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  width: 40px;
  height: 40px;
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
