import React, { useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import IconComponents from '../common/iconComponent/IconComponents.jsx';

import PropTypes from 'prop-types';

export default function CommentDropDown({
  commentDeleta,
  toggleEdit,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  const dropdownRef = useRef();
  const toggleModal = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('yes');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleToggleEdit = () => {
    toggleEdit(); // toggleEdit 함수 호출
    setIsDropdownOpen(false); // 드롭다운 닫기
  };
  const handleToggleDelete = () => {
    commentDeleta(); // toggleEdit 함수 호출
    setIsDropdownOpen(false); // 드롭다운 닫기
  };
  return (
    <Wrap ref={dropdownRef}>
      <div style={{ cursor: 'pointer' }}>
        <IconComponents
          iconType='menuComment'
          width='25px'
          height='25px'
          stroke='#C1C1C1'
          viewBox='0 0 25 25'
          onClick={toggleModal}
        />
      </div>
      {isDropdownOpen ? (
        <Dropdown>
          <DropdownContent onClick={handleToggleEdit}>댓글 수정하기</DropdownContent>
          <Line></Line>
          <DropdownContent onClick={handleToggleDelete}>
            댓글 삭제하기
          </DropdownContent>
        </Dropdown>
      ) : null}
    </Wrap>
  );
}
CommentDropDown.propTypes = {
  commentDeleta: PropTypes.func.isRequired, // commentDeleta prop의 유형 및 필수 여부 설정
  toggleEdit: PropTypes.func.isRequired, // toggleEdit prop의 유형 및 필수 여부 설정
  isDropdownOpen: PropTypes.bool.isRequired, // 드롭다운 상태를 전달받음
  setIsDropdownOpen: PropTypes.func.isRequired,
};

const Wrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  top: 7px;
`;
const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 30px;
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
const Line = styled.div`
  border-bottom: 1px solid rgba(178, 179, 178, 0.5);
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
