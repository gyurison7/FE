import React from 'react';
import { styled } from 'styled-components';
import Avatar from '../avatar/Avatar.jsx';

export default function Comment(prop) {
  const { comment, createdAt } = prop;
  return (
    <Wrap>
      <UserInfo>
        <Avatar src={prop['User.profileUrl']} width='40px' height='40px' />
        <div>
          <NickName>{prop['User.nickname']}</NickName>
          <CreatedAt>{createdAt.slice(0, 10)}</CreatedAt>
          <UserComment>{comment} </UserComment>
        </div>
      </UserInfo>
      <div>...</div>
    </Wrap>
  );
}
const Wrap = styled.div`
  padding: 14px 25px 18px 23px;
  display: flex;
  height: 92px;
  justify-content: space-between;
  border-bottom: 0.5px solid #e4e4e4;
`;

const UserInfo = styled.div`
  word-break: break-all;
  display: flex;
  width: 300px;
  gap: 9px;
`;
const NickName = styled.div`
  color: #444;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const CreatedAt = styled(NickName)`
  color: #8888;
`;
const UserComment = styled.div`
  color: #4c4c4c;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
