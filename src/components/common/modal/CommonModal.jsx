import React from 'react';
import { styled } from 'styled-components';
import Button from '../button/Button.jsx';
import PropTypes from 'prop-types';

const CommonModal = ({
  title,
  description,
  onCancel,
  onFunction,
  buttonText,
  children,
  height,
  padding,
}) => {
  return (
    <ModalWrapper>
      <ModalBackground></ModalBackground>
      <ModalBody height={height} padding={padding}>
        <TextContainer>
          <img
            src={`${process.env.PUBLIC_URL}assets/svgs/delete.svg`}
            alt={title}
          />
          <h2>{title}</h2>
          <p>{description}</p>
        </TextContainer>
        {children}
        <ButtonContainer>
          <Button
            onClick={onCancel}
            size='medium'
            background='#94A3B8'
            color='#FFFFFF'
          >
            취소
          </Button>
          <Button
            onClick={onFunction}
            size='medium'
            background='#FF6A6A'
            color='#FFF'
          >
            {buttonText}
          </Button>
        </ButtonContainer>
      </ModalBody>
    </ModalWrapper>
  );
};
export default CommonModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 428px;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.6;
  background-color: #000000;
  z-index: 1;
`;

const ModalBody = styled.div`
  width: 86.5%;
  height: ${props => props.height || '287px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '24px 21px 23px 22px'};
  border-radius: 28px;
  background: #fff;
  flex-shrink: 0;
  z-index: 2;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 16px;
  color: #4c4c4c;
  line-height: 129.336%;
  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 129.336%;
  }
  p {
    white-space: pre-line;
    font-weight: 500;
    line-height: 129.336%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 22px;
  button {
    font-weight: 700;
  }
`;

CommonModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onFunction: PropTypes.func,
  buttonText: PropTypes.string,
  children: PropTypes.object,
  height: PropTypes.string,
  padding: PropTypes.string,
};
