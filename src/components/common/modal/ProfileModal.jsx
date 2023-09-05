import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { selectedProfileState } from '../../../recoil/Atom';
import { styled } from 'styled-components';
import IconComponents from '../iconComponent/IconComponents.jsx';

export default function ProfileModal({ isOpen, closeModal }) {
  const postData = useRecoilValue(selectedProfileState);
  if (!postData) {
    return null;
  }

  return (
    <StyledModal
      open={isOpen}
      footer={null}
      onCancel={closeModal}
      closable={false}
      wrapClassName={'con'}
      maskStyle={{ background: 'black', opacity: '0.6' }}
    >
      <Wrap>
        <ProfileImage src={postData.profileUrl} alt='ProfileImage' />
        <ProfileName>{postData.nickname}</ProfileName>
        <IconWrap>
          <IconComponents
            iconType='OxButton'
            stroke='white'
            width='29px'
            height='29px'
            viewBox='0 0 29 29'
            onClick={closeModal}
          />
        </IconWrap>
      </Wrap>
    </StyledModal>
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
    margin-top: 50px;
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
const IconWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
