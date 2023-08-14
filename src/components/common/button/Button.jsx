import React from 'react';
import { css, styled } from 'styled-components';
import PropTypes from 'prop-types';
export default function Button({
  children,
  onClick,
  size,
  background,
  color,
  type,
}) {
  return (
    <ButtonStyle
      size={size}
      type={type}
      background={background}
      color={color}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
}
const ButtonStyle = styled.button`
  border-radius: 28px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 14px;

  ${(props) =>
    props.size === 'large' &&
    css`
      width: 90%;
      height: 57px;
      background: ${(props) => props.background};
      color: ${(props) => props.color};
    `}
  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 45%;
      height: 57px;
      background: ${(props) => props.bg};
      color: ${(props) => props.color};
    `}
    ${(props) =>
    props.size === 'small' &&
    css`
      width: 75px;
      height: 28px;
      background: ${(props) => props.bg};
      color: ${(props) => props.color};
    `}
`;
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  background: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
};
