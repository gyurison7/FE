import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import IconComponents from '../iconComponent/IconComponents.jsx';

export default function Profile({ url, name, onClick, userId }) {
  const storedUserId = localStorage.getItem('userId');

  return (
    <AvatarWrap onClick={() => onClick()}>
      <AvatarImage src={url} alt='avatar' />
      <AvatarName>
        {storedUserId == userId ? (
          <IconComponents
            iconType='na'
            width='13px'
            height='13px'
            viewBox='0 0 13 13'
          />
        ) : null}

        <span>{name}</span>
      </AvatarName>
    </AvatarWrap>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
const AvatarWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5px;
  align-items: center;
  span {
    color: #4c4c4c;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const AvatarName = styled.div`
  display: flex;
  gap: 2.3px;
`;
const AvatarImage = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: black;
`;
