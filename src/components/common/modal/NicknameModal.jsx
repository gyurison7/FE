import { css, keyframes, styled } from 'styled-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { useEffect } from 'react';
import NoSearch from '../nosearchresult/NoSearch.jsx';

const Portal = ({ children }) => {
  const el = document.getElementById('portal-root');
  return ReactDOM.createPortal(children, el);
};

function FriendSearchModal({
  onClose,
  ismodalopen,
  universalHandler,
  searchResult,
  addFriendHandler,
  participants,
  hasSearched,
}) {
  console.log('modal', hasSearched);
  useEffect(() => {
    if (ismodalopen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [ismodalopen]);

  const handleStop = (e, data) => {
    if (data.y > 100) {
      onClose();
    }
  };

  const handleOverlayClick = () => {
    onClose && onClose();
  };

  return (
    <Portal>
      <Overlay onClick={handleOverlayClick} />
      <Draggable
        axis='y'
        bounds={{ top: 0 }}
        handle='.drag-handle'
        onStop={(e, data) => handleStop(e, data)}
      >
        <ModalContainer isopen={ismodalopen}>
          <div
            style={{
              width: '100%',
              padding: '8px',
            }}
            className='drag-handle'
          ></div>
          <ModalButtonWrapper>
            <ModalButton onClick={onClose}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/line.png`}
                alt='line'
              />
            </ModalButton>
          </ModalButtonWrapper>
          <div style={{ position: 'fix' }}>
            <ModalWriteInput
              name='participants'
              placeholder='친구 닉네임을 입력해주세요'
              value={participants}
              onChange={universalHandler}
            />
          </div>
          {hasSearched &&
            (searchResult.length > 0 ? (
              searchResult.map((item) => (
                <ResultWrapper key={item.userId}>
                  <div
                    style={{ display: 'flex', gap: '30px', alignItems: 'center' }}
                  >
                    <ResultProfileImage src={item.profileUrl} alt='profileImg' />
                    <div>
                      <LoginId>{item.loginId ? item.loginId : item.kakaoId}</LoginId>
                      <p>{item.nickname}</p>
                    </div>
                  </div>
                  <ResultAddButton
                    onClick={() => {
                      addFriendHandler(item);
                      onClose();
                    }}
                  >
                    추가
                  </ResultAddButton>
                </ResultWrapper>
              ))
            ) : (
              <NoSearch/>
            ))}
        </ModalContainer>
      </Draggable>
    </Portal>
  );
}

const ResultWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
`;

const LoginId = styled.p`
  font-size: 14px;
  color: grey;
`;

const ResultProfileImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 100%;
  object-fit: cover;
`;

const ResultAddButton = styled.button`
  width: 75px;
  height: 28px;
  border: none;
  color: white;
  background-color: rgba(88, 115, 254, 1);
  border-radius: 12px;
`;

const shouldForwardProp = (prop) => !['isopen'].includes(prop);
const ModalContainer = styled.div.withConfig({ shouldForwardProp })`
  position: fixed;
  @media (max-width: 428px) {
    width: 100%;
    margin: 0 auto;
  }
  @media (min-width: 429px) {
    width: 428px;
    margin: 0 auto;
  }
  left: 0;
  right: 0;
  bottom: ${({ isopen }) => (isopen ? '-9%' : '-100%')};
  background-color: #fff;
  padding: 1rem;
  z-index: 10;
  transition: bottom 0.4s ease-out;
  animation: ${({ isopen }) =>
    isopen
      ? css`
          ${slideUp} 0.8s
        `
      : css`
          ${slideDown} 1s
        `};
  height: 100%;
  border-radius: 30px;
  box-shadow: 0px -10px 14px 0px rgba(199, 199, 199, 0.25);

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const slideUp = keyframes`
    0% {
      bottom: -100%;
    }
    100% {
      bottom: -9%;
    }
    `;

const slideDown = keyframes`
    from {
      bottom: -9%;
    }
    to {
      bottom: -100%;
    }
    `;

const ModalButton = styled.button`
  border: none;
  background-color: transparent;
  align-items: center;
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  justify-content: center;
`;

const ModalWriteInput = styled.input`
  width: 100%;
  height: 44px;
  padding-right: 50px;
  padding-left: 12px;
  border-radius: 7px;
  background-color: #f5f5f5;
  border: none;
  margin-top: 25px;

  &:focus {
    outline: none;
  }
`;

FriendSearchModal.propTypes = {
  onClose: PropTypes.func,
  ismodalopen: PropTypes.bool,
  universalHandler: PropTypes.func,
  searchResult: PropTypes.array,
  addFriendHandler: PropTypes.func,
  participants: PropTypes.array,
  hasSearched: PropTypes.bool,
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
`;

export default FriendSearchModal;
