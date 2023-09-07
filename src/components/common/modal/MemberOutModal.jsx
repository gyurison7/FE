import React, { useState } from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import CommonModal from './CommonModal.jsx';

const MemberOutModal = ({ setMemberOutModal, memberOutHandler }) => {
  const [memberOutCheck, setMemberOutCheck] = useState('');

  return (
    <CommonModal
      title={'회원 탈퇴'}
      description={'회원 탈퇴 시 계정 정보 및 추억은\n삭제되어 복구가 불가능해요.'}
      onCancel={() => setMemberOutModal(false)}
      onFunction={() => memberOutHandler(memberOutCheck)}
      buttonText={'떠날래요'}
      height={'436px'}
      padding={'24px 16px 28px 16px'}
    >
      <InputContainer>
        <p>그래도 탈퇴하시려면 &quot;떠날래요&quot;를 입력해주세요.</p>
        <input
          onChange={(e) => setMemberOutCheck(e.target.value)}
          type='text'
          name='memberOutCheck'
          value={memberOutCheck}
          placeholder='"떠날래요"를 입력해주세요.'
        />
      </InputContainer>
    </CommonModal>
  );
};

export default MemberOutModal;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4c4c4c;
  gap: 24px;
  margin-bottom: 5vh;
  p {
    font-weight: 600;
    line-height: 129.336%;
  }
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #cecece;
    padding-bottom: 7px;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
`;

MemberOutModal.propTypes = {
  setMemberOutModal: PropTypes.func.isRequired,
  memberOutHandler: PropTypes.func.isRequired,
};
