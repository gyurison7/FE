import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import api from '../../../api/index.jsx';
import CommonModal from './CommonModal.jsx';
import { useToast } from '../../../hooks/useToast.jsx';
import { useRecoilState } from 'recoil';
import { groupDataState, noticeListState } from '../../../recoil/Atom.js';

function MoreModal({ groupid, groupUserId, groupName, parentRef, onClose }) {
  const [position, setPosition] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const storedUserId = localStorage.getItem('userId');
  const [groupData, setGroupData] = useRecoilState(groupDataState);
  const [noticeList, setNoticeList] = useRecoilState(noticeListState);

  const handleOverlayClick = () => {
    onClose && onClose();
  };
  console.log('modal', groupData);
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

  const leaveGroupHandler = async (id) => {
    try {
      const response = await api.delete(`/group/${id}/groupout`, {
      });

      if (response.data.success === false) {
        console.log(response.data.success);
        setDeleteModal(false);
        setErrorMessage(response.data.message);
        console.log('error',response.data.message)
      } else if (response.data.success) {
        showToast('앨범에서 나갔습니다');
        setDeleteModal(false);
        setErrorMessage(null);
        setGroupData((prevData) => prevData.filter((group) => group.groupId !== id));

        const updatedNoticeList = noticeList.filter((notice) => notice.groupId !== id);
        setNoticeList(updatedNoticeList);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('서버 에러 입니다');
    }
    
    navigate('/groupmain', { replace: true });
  };

  return (
    <>
      <Overlay onClick={handleOverlayClick}></Overlay>
      <MoreModalContainer style={position} ref={modalRef}>
        <Header>{groupName}</Header>
        {Number(storedUserId) === groupUserId && (
          <div>
            <ModalButton onClick={() => navigate(`/groupedit/${groupid}`)}>
              앨범 수정하기
            </ModalButton>
          </div>
        )}
        <div>
          <ModalButton isend='true' onClick={() => setDeleteModal(true)}>
            {storedUserId === groupUserId ? '앨범 삭제하기' : '앨범 나가기'}
          </ModalButton>
          {errorMessage && (
            <ErrorMessage>초대된 친구가 남아있어 삭제할 수 없습니다</ErrorMessage>
          )}
          {deleteModal && (
            <CommonModal
              title={'앨범 나가기'}
              description={'정말 앨범에서 나가시겠어요?'}
              onCancel={() => setDeleteModal(false)}
              onFunction={() => leaveGroupHandler(groupid)}
              buttonText={'나가기'}
            ></CommonModal>
          )}
        </div>
      </MoreModalContainer>
    </>
  );
}

export default MoreModal;

const MoreModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 240px;
  top: 60px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 0.6);
  z-index: 500;
`;

const ErrorMessage = styled.p`
  color: #ff6a6a;
  font-size: 12px;
  margin-top: -5px;
  padding-left: 15px;
  padding-bottom: 12px;
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

const shouldForwardProp = (prop) => !['isend'].includes(prop);
const ModalButton = styled.button.withConfig({ shouldForwardProp })`
  width: 100%;
  height: 46px;
  font-size: 1spx;
  background-color: white;
  border: none;
  border-top: 1px solid rgba(178, 179, 178, 0.5);
  text-align: left;
  cursor: pointer;
  padding-left: 15px;
  border-radius: ${(props) => (props.isend ? '0 0 12px 12px' : '0')};

  &:active {
    background-color: #f0f0f0;
  }
  &:hover {
    background-color: #f7f7f7;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 499;
`;

MoreModal.propTypes = {
  groupid: PropTypes.number,
  groupUserId: PropTypes.number,
  groupName: PropTypes.string,
  parentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onClose: PropTypes.func,
};
