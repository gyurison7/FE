import React, { useState } from 'react';
import { styled } from 'styled-components';
import Avatar from '../avatar/Avatar.jsx';
import CommentDropDown from '../../commentDropdown/CommentDropDown.jsx';

export default function Comment(prop) {
  const { comment, createdAt, commentDeleta, commentId, commentEdit } = prop;
  const storedUserId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  console.log(editedComment);
  const handleCommentEdit = async () => {
    await commentEdit(commentId, editedComment);
    setIsEditing(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommentEdit();
    }
  };
  return (
    <Wrap>
      <UserInfo>
        <Avatar src={prop['User.profileUrl']} width='40px' height='40px' />
        <div>
          <NickName>{prop['User.nickname']}</NickName>
          <CreatedAt>{createdAt.slice(0, 10)}</CreatedAt>
          {isEditing ? (
            <EditInput
              type='text'
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <UserComment>{comment} </UserComment>
          )}
        </div>
      </UserInfo>
      {storedUserId == prop.userId ? (
        <ButtonWrap>
          <CommentDropDown
            commentDeleta={commentDeleta}
            toggleEdit={toggleEdit}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </ButtonWrap>
      ) : null}
    </Wrap>
  );
}
const Wrap = styled.div`
  padding: 14px 25px 18px 23px;
  display: flex;
  height: 92px;
  justify-content: space-between;
  border-bottom: 0.5px solid #e4e4e4;
  background: white;
`;
const ButtonWrap = styled.div``;

const UserInfo = styled.div`
  word-break: break-all;
  display: flex;
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
  padding-top: 3px;
`;
const UserComment = styled.div`
  color: #4c4c4c;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  padding-top: 8px;
  line-height: normal;
`;
const EditInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.1px solid #6666;
  outline: none;
`;
