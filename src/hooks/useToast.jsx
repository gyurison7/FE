import React, { createContext, useState, useContext } from 'react';
import { keyframes, styled } from 'styled-components';
import PropTypes from 'prop-types';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message, seconds = 5000) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, seconds);
  };

  const closeToast = () => {
    setToast({ show: false, message: '' });
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toast.show && (
        <ToastStyle className={`${toast.show ? 'show' : ''}`}>
          <span>{toast.message}</span>
          <CloseButton onClick={closeToast}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/svgs/close.svg`}
              alt='close'
            />
          </CloseButton>
        </ToastStyle>
      )}
    </ToastContext.Provider>
  );
}

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-10px);
    }
    60% {
        transform: translateX(-50%) translateY(-5px);
    }
`;

const ToastStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 428px;
  height: 83px;
  padding: 33px 25px 29px 25px;
  background-color: #5873fe;
  color: #fff;
  border-radius: 0px 0px 16px 16px;
  z-index: 1000;
  opacity: 0;
  transition: top 1s, opacity 1s;

  &.show {
    top: 0;
    opacity: 1;
    animation: ${bounce} 0.5s;
  }
  span {
    padding-right: 4vw;
    line-height: 129.336%;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 14px;
    height: 14px;
  }
`;

ToastProvider.propTypes = {
  children: PropTypes.object,
  seconds: PropTypes.number,
};
