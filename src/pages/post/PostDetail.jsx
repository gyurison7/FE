import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/index.jsx';
import { styled } from 'styled-components';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
export default function PostDetail() {
  const { groupId, postId } = useParams();
  const [detail, setDetail] = useState(null);
  console.log(detail?.memory);
  useEffect(() => {
    api
      .get(`/group/${groupId}/memory/${postId}`, { withCredentials: true })
      .then((res) => {
        setDetail(res.data);
      });
  }, []);
  return (
    <Wrap>
      <Head>
        <IconComponents iconType='vectorLeft' stroke='white' />
        <p>게시물</p>
        <div></div>
      </Head>
      <UserInfo>
        <UserTitle>
          <p>{detail?.memory.title} </p>
          <div>...</div>
        </UserTitle>
        <UserInfoData>
          <UserImg src={detail?.memory['User.profileUrl']} alt='avatar' />
          <div>
            <p>{detail?.memory['User.nickname']}</p>
            <div>
              <p>2023.08.01</p>
            </div>
          </div>
        </UserInfoData>
      </UserInfo>
      <IMG src={detail?.memory.imageUrl} alt='detaeil' />
    </Wrap>
  );
}
const Wrap = styled.div`
  max-width: 428px;
  border: 1px solid red;
`;
const Head = styled.div`
  padding: 56px 24px 0px 25px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 11vh;
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
  height: 48vh;
`;
const UserInfo = styled.div`
  width: 100%;
  height: 102px;
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
const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
