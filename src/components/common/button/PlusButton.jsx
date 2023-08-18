import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import IconComponents from '../iconComponent/IconComponents.jsx';

function PlusButton(props) {
  return (
    <>
      <WriteButton
        height={props.height}
        background={props.background}
        borderradious={props.borderradious}
      >
        <IconComponents
          onClick={props.onClick}
          iconType='plus'
          width='24px'
          height='24px'
          stroke='white'
        />
      </WriteButton>
    </>
  );
}

export default PlusButton;

const WriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height || '170px'};
  border-radius: ${(props) => (props.borderradious ? props.borderradious : '12px')};
  border: none;
  cursor: pointer;
  font-size: 50px;
  color: white;
  background-color: ${(props) => props.background || 'rgba(88, 115, 254, 1)'};
`;

PlusButton.propTypes = {
  onClick: PropTypes.func,
  height: PropTypes.string,
  background: PropTypes.string,
  borderradious: PropTypes.string,
};
