import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index.jsx';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import Comment from '../../components/common/comment/Comment.jsx';
import Avatar from '../../components/common/avatar/Avatar.jsx';
import Drop from '../../components/common/dropdown/Drop.jsx';

export default function PostDetail() {
  const [detail, setDetail] = useState(null);
  const storedUserId = localStorage.getItem('userId');
  const [commentInput, setCommentInput] = useState('');
  const { groupId, postId } = useParams();
  const navigate = useNavigate();

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
  const commentEdit = async (commentId, editedComment) => {
    await api.put(
      `/group/${groupId}/memory/${detail.memory.memoryId}/comment/${commentId}`,
      { comment: editedComment },
      {
        withCredentials: true,
      }
    );

    // 수정 완료 후 detail 상태 업데이트하여 화면 다시 그리기
    const updatedComments = detail.comments.map((comment) =>
      comment.commentId === commentId
        ? { ...comment, comment: editedComment }
        : comment
    );
    setDetail((prevDetail) => ({
      ...prevDetail,
      comments: updatedComments,
    }));
  };

  return (
    <Wrap>
      <Head>
        <IconComponents
          iconType='vectorLeft'
          stroke='white'
          onClick={() => navigate(-1)}
        />
        <p>게시물</p>
        <div></div>
      </Head>
      <div style={{ paddingBottom: '75px' }}>
        <UserInfo>
          <UserTitle>
            {detail && detail.memory && (
              <>
                <p>{detail.memory.title}</p>
                {storedUserId == detail.memory.userId ? (
                  <Drop detail={detail} groupId={groupId} />
                ) : null}
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
              <span>{detail?.memory?.['User.nickname']}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <IconComponents
                  iconType='alarm'
                  stroke='#666666'
                  viewBox='0 0 12 10'
                  width='12'
                  height='14'
                />
                <span>{detail?.memory?.createdAt.slice(0, 10)}</span>
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
                  commentDeleta={() => commentDeleta(element.commentId)}
                  commentEdit={commentEdit}
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
          placeholder='댓글을 작성해주세요...'
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
    font-size: 20px;
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
  span {
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
