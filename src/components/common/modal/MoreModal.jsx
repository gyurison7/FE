import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

function MoreModal({ groupid, groupUserId, groupName, parentRef }) {
  const [userId, setUserId] = useState(null);
  const [position, setPosition] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    if (modalRef.current && parentRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();

      const overflowRight = rect.right > parentRect.right;
      const overflowLeft = rect.left < parentRect.left;

      if (overflowRight) {
        setPosition({ right: 0 });
      } else if (overflowLeft) {
        setPosition({ left: 0 });
      } else {
        setPosition({ left: '0' });
      }
    }
  }, [modalRef, parentRef]);

  const navigate = useNavigate();

  return (
    <MoreModalContainer style={position} ref={modalRef}>
      <Header>{groupName}</Header>
      {userId === groupUserId && (
        <div>
          <ModalButton onClick={() => navigate(`/groupedit/${groupid}`)}>
            수정하기
          </ModalButton>
        </div>
      )}
      <div>
        <ModalButton isend='true'>그룹나가기</ModalButton>
      </div>
    </MoreModalContainer>
  );
}

export default MoreModal;

const MoreModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 226px;
  top: 60px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 0.6);
  z-index: 500;
`;

const Header = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #868688;
  padding-left: 15px;
`;
const ModalButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: white;
  border: none;
  border-top: 1px solid #b2b3b2;
  text-align: left;
  cursor: pointer;
  padding-left: 15px;
  border-radius: ${(props) => (props.isend ? '0 0 12px 12px' : '0')};
`;

MoreModal.propTypes = {
  groupid: PropTypes.number,
  groupUserId: PropTypes.number,
  groupName: PropTypes.string,
  parentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
