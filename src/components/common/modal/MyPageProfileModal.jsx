import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const MyPageProfileModal = ({
  setProfileModal,
  imageUploadInput,
  deleteProfileImage,
}) => {
  return (
    <ModalWrapper>
      <ModalBackground onClick={() => setProfileModal(false)}></ModalBackground>
      <ModalBody>
        <ImageButtonContainer>
          <button onClick={() => imageUploadInput.current.click()}>
            앨범에서 사진 선택
          </button>
          <button onClick={deleteProfileImage}>프로필 사진 삭제</button>
        </ImageButtonContainer>
        <CancelButtonContainer>
          <button onClick={() => setProfileModal(false)}>취소하기</button>
        </CancelButtonContainer>
      </ModalBody>
    </ModalWrapper>
  );
};

export default MyPageProfileModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

const ModalBody = styled.div`
  width: 95%;
  max-width: 428px;
  background: transparent;
  margin-bottom: 3vh;
  z-index: 2;

  button {
    display: block;
    width: 100%;
    padding: 20px;
    color: #5873fe;
    font-size: 16px;
    border: none;
  }
`;

const ImageButtonContainer = styled.div`
  margin-bottom: 1vh;

  button {
    border-bottom: 1px solid #b2b3b2;
    font-weight: 500;

    &:first-child {
      border-radius: 13px 13px 0 0;
    }

    &:last-child {
      border-radius: 0 0 13px 13px;
    }
  }
`;

const CancelButtonContainer = styled.div`
  button {
    border-radius: 13px;
    font-weight: 700;
  }
`;

MyPageProfileModal.propTypes = {
  setProfileModal: PropTypes.func.isRequired,
  imageUploadInput: PropTypes.object.isRequired,
  deleteProfileImage: PropTypes.func.isRequired,
};
