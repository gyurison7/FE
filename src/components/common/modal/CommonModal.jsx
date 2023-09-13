import React from 'react';
import { styled } from 'styled-components';
import Button from '../button/Button.jsx';
import PropTypes from 'prop-types';

const CommonModal = ({
  img,
  title,
  description,
  onCancel,
  onFunction,
  button,
  buttonText,
  children,
  height,
  padding,
  firstgap,
  secondgap,
}) => {
  return (
    <ModalWrapper>
      <ModalBackground></ModalBackground>
      <ModalBody height={height} padding={padding}>
        <TitleContainer firstgap={firstgap} secondgap={secondgap}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/svgs/${img || 'delete'}.svg`}
            alt={title}
          />
          <h2>{title}</h2>
          <p>{description}</p>
        </TitleContainer>
        {children}
        {button ? (
          button
        ) : (
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
        )}
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
  z-index: 1;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.6;
  background-color: #000000;
`;

const ModalBody = styled.div`
  width: 86.5%;
  height: ${(props) => props.height || '287px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '24px 21px 23px 22px'};
  border-radius: 28px;
  background: #fff;
  flex-shrink: 0;
  z-index: 2;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: ${(props) => (props.firstgap || props.secondgap ? '' : '16px')};
  color: #4c4c4c;
  > :nth-child(1) {
    margin-bottom: ${(props) => props.firstgap || ''};
  }

  > :nth-child(2) {
    margin-bottom: ${(props) => props.secondgap || ''};
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 129.336%;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 129.336%;
    white-space: pre-line;
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
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onFunction: PropTypes.func,
  button: PropTypes.element,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
  padding: PropTypes.string,
  firstgap: PropTypes.string,
  secondgap: PropTypes.string,
};
