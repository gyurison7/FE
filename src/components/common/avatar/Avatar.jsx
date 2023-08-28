import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

export default function Avatar({ width, height, src }) {
  return <UserAvatar src={src} alt='avatar' width={width} height={height} />;
}

const UserAvatar = styled.img`
  width: ${(props) => props.width || '40px'};
  height: ${(props) => props.height || '40px'};
  border-radius: 50%;
`;
Avatar.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
