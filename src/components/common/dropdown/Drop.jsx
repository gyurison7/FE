import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/Atom';
import { styled } from 'styled-components';
import IconComponents from '../iconComponent/IconComponents.jsx';
import api from '../../../api/index.jsx';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Drop({ detail, groupId }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const memoryDelete = async () => {
    await api.delete(`/group/${groupId}/memory/${detail.memory.memoryId}`, {
      withCredentials: true,
    });
    navigate(`/postmain/${groupId}`);
  };

  return (
    <Wrap>
      <IconComponents
        iconType='menu'
        width='20px'
        height='20px'
        stroke='#787878'
        onClick={toggleModal}
      />

      {isModalOpen ? (
        <Dropdown>
          <DropdownContent>게시물 수정하기</DropdownContent>
          <hr />
          <DropdownContent onClick={memoryDelete}>게시물 삭제하기</DropdownContent>
        </Dropdown>
      ) : null}
    </Wrap>
  );
}
Drop.propTypes = {
  detail: PropTypes.any.isRequired,
  groupId: PropTypes.any.isRequired,
};
const Wrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 7px;
`;
const Dropdown = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  padding: 10px;
  width: 191px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 89.6px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0px 0px 17px -4px rgba(58, 51, 51, 0.2);
`;
const DropdownContent = styled.div`
  cursor: pointer;
  color: #4c4c4c;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
