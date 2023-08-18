import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

export default function Profile({ url, name }) {
  return (
    <AvatarWrap>
      <AvatarImage src={url} alt='avatar' />
      <span>{name}</span>
    </AvatarWrap>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
const AvatarWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5px;
  align-items: center;
  span {
    color: #4c4c4c;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const AvatarImage = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: black;
`;
