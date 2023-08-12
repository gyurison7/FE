import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';
export default function Button({ children, onClick }) {
  return <Btn onClick={onClick}>{children}</Btn>;
}
const Btn = styled.button`
  width: 342px;
  height: 57px;
  color: white;
  border-radius: 28px;
  background: #9a9a9a;
  border: none;
  font-size: 20px;
  font-weight: 500;
  outline: none;
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
