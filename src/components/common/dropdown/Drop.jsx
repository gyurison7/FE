import React, { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DropdownState } from '../../../recoil/Atom';
import { styled } from 'styled-components';
import IconComponents from '../iconComponent/IconComponents.jsx';
import api from '../../../api/index.jsx';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Drop({ detail, groupId }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState(DropdownState);
  const dropdownRef = useRef();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const memoryDelete = async () => {
    await api.delete(`/group/${groupId}/memory/${detail.memory.memoryId}`, {
      withCredentials: true,
    });
    setIsModalOpen(false);
    navigate(`/postmain/${groupId}`);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
  const handleEditClick = () => {
    navigate(`/postedit/${groupId}/${detail.memory.memoryId}`); // 수정 페이지로 이동
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Wrap ref={dropdownRef}>
      <IconComponents
        iconType='menu'
        width='21'
        height='10'
        viewBox='0 0 21 5'
        onClick={toggleModal}
      />

      {isModalOpen ? (
        <Dropdown>
          <DropdownContent onClick={handleEditClick}>
            게시물 수정하기
          </DropdownContent>
          <Line></Line>
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
const Line = styled.div`
  border-bottom: 1px solid rgba(178, 179, 178, 0.5);
`;
const Dropdown = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
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
  font-size: 14px;
  font-style: normal;
  padding: 10px;
  font-weight: 500;
  line-height: normal;
`;
