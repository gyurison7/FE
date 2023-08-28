import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/index.jsx';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import Comment from '../../components/common/comment/Comment.jsx';
import Avatar from '../../components/common/avatar/Avatar.jsx';
import secureLocalStorage from 'react-secure-storage';
export default function PostDetail() {
  const { groupId, postId } = useParams();
  const [detail, setDetail] = useState(null);
  const storedUserId = secureLocalStorage.getItem('userId');
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    api
      .get(`/group/${groupId}/memory/${postId}`, { withCredentials: true })
      .then((res) => {
        setDetail(res.data);
      });
  }, []);
  const commentSubmit = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newComment = {
        comment: commentInput,
      };
      await api.post(`/group/${groupId}/memory/${postId}/comment`, newComment, {
        withCredentials: true,
      });
      api
        .get(`/group/${groupId}/memory/${postId}`, { withCredentials: true })
        .then((res) => {
          setDetail(res.data);
          setCommentInput('');
        });
    }
  };
  const commentDeleta = async (commentId) => {
    await api.delete(
      `/group/${groupId}/memory/${detail.memory.memoryId}/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );
    const updatedComments = detail.comments.filter(
      (comment) => comment.commentId !== commentId
    );
    setDetail((prevDetail) => ({
      ...prevDetail,
      comments: updatedComments,
    }));
  };
  return (
    <Wrap>
      <Head>
        <IconComponents iconType='vectorLeft' stroke='white' />
        <p>게시물</p>
        <div></div>
      </Head>
      <div style={{ paddingBottom: '75px' }}>
        <UserInfo>
          <UserTitle>
            {detail && detail.memory && (
              <>
                <p>{detail.memory.title}</p>
                {storedUserId === detail.memory.userId ? <div>...</div> : null}
              </>
            )}
          </UserTitle>
          <UserInfoData>
            <Avatar
              src={detail?.memory?.['User.profileUrl']}
              width='40px'
              height='40px'
            />
            <div>
              <p>{detail?.memory?.['User.nickname']}</p>
              <div>
                <p>{detail?.memory?.createdAt.slice(0, 10)}</p>
              </div>
            </div>
          </UserInfoData>
        </UserInfo>
        <IMG src={detail?.memory?.imageUrl} alt='detaeil' />
        <CommentWrap>
          <div>
            {detail?.comments?.map((element) => {
              return (
                <Comment
                  key={element.commentId}
                  {...element}
                  groupId={groupId}
                  detail={detail}
                  commentDeleta={() => commentDeleta(element.commentId)}
                />
              );
            })}
          </div>
        </CommentWrap>
      </div>
      <Footer>
        <Avatar src={detail?.user?.profileUrl} width='40px' height='40px' />
        <input
          type='text'
          placeholder='댓글을 달아주세요'
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={commentSubmit}
        />
      </Footer>
    </Wrap>
  );
}
const CommentWrap = styled.div`
  width: 100%;
`;
const Wrap = styled.div`
  position: relative;
  max-width: 428px;
  height: 100vh;
`;
const Head = styled.div`
  padding: 56px 24px 18px 25px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 93px;
  background: #5873fe;
  p {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const IMG = styled.img`
  width: 100%;
`;
const UserInfo = styled.div`
  width: 100%;
  height: 106px;
`;
const UserTitle = styled.div`
  display: flex;
  padding: 20px 24px 0px 24px;
  justify-content: space-between;

  p {
    color: #4c4c4c;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const UserInfoData = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 0px 13px 24px;
  p {
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const Footer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: white;
  gap: 15px;
  padding: 19px 17px;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
  input {
    width: 320px;
    border-radius: 20px;
    border: 0.1px solid #c5c5c7;
    outline: none;
    padding-left: 15px;
    &::placeholder {
      color: #c5c5c7;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;
