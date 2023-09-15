import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { UpdateNotificationStatus } from '../../api/noticeApi.js';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { noticeCountState, noticeListState } from '../../recoil/Atom.js';
import Header from '../../components/common/header/Header.jsx';
import Footer from '../../layout/footer/Footer.js';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 추가
import relativeTime from 'dayjs/plugin/relativeTime'; // relativeTime 플러그인 추가

dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale('ko');

const Notice = () => {
  const [activeNav, setActiveNav] = useState('new');
  const noticeList = useRecoilValue(noticeListState);
  const setPastNoticeList = useSetRecoilState(noticeListState);
  const setNoticeCount = useSetRecoilState(noticeCountState);
  const navigate = useNavigate();

  const navClickHandler = (name) => {
    setActiveNav(name);
  };

  const newNoticeList = noticeList.filter(
    (notice) => notice['Participants.status'] === 0
  );
  const pastNoticeList = noticeList.filter(
    (notice) => notice['Participants.status'] === 1
  );

  const noticeClickHandler = async (groupId, participantId) => {
    const participantIdString = JSON.stringify([participantId.toString()]);
    try {
      await UpdateNotificationStatus(participantIdString);

      setPastNoticeList((prev) => {
        return prev.map((notice) => {
          if (notice['Participants.participantid'] === participantId) {
            return { ...notice, 'Participants.status': 1 };
          } else {
            return notice;
          }
        });
      });
      setNoticeCount((prev) => prev - 1);

      navigate(`/postmain/${groupId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Header title='알림' />
      <Navbar>
        <button
          className={activeNav === 'new' ? 'active' : ''}
          onClick={() => navClickHandler('new')}
        >
          새로운 알림
        </button>
        <button
          className={activeNav === 'past' ? 'active' : ''}
          onClick={() => navClickHandler('past')}
        >
          지난 알림
        </button>
      </Navbar>
      <NoticeContainer>
        {(activeNav === 'new' ? newNoticeList : pastNoticeList).map((notice) => {
          const relativeDate = dayjs(notice['Participants.createdAt']).fromNow();
          return (
            <NoticeItem key={notice['Participants.participantid']}>
              <img src={notice.thumbnailUrl} alt='썸네일' />
              <button
                onClick={() =>
                  noticeClickHandler(
                    notice.groupId,
                    notice['Participants.participantid']
                  )
                }
              >
                <p className='message'>앨범 {notice.groupName}에 초대되셨습니다.</p>
                <p className='date'>{relativeDate}</p>
              </button>
            </NoticeItem>
          );
        })}
      </NoticeContainer>
      <Foot>
        <Footer />
      </Foot>
    </Wrapper>
  );
};

export default Notice;

const buttonStyle = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
`;

const Navbar = styled.div`
  display: inline-flex;
  padding: 6px 4px;
  justify-content: center;
  align-items: center;
  gap: 17px;
  margin: 30px 0 0 24px;

  button {
    ${buttonStyle};
    color: #c2c2c2;
    font-size: 16px;
    font-weight: 600;
  }

  .active {
    color: #5873fe;
    padding: 6px 4px;
    border-bottom: 1px solid #5873fe;
  }
`;

const NoticeContainer = styled.div`
  margin: 18px 0 0 24px;
`;

const NoticeItem = styled.div`
  display: flex;
  gap: 9px;
  margin-bottom: 1vh;

  img {
    width: 49px;
    height: 49px;
    object-fit: cover;
    border-radius: 50%;
  }

  button {
    ${buttonStyle};
    font-size: 14px;
    text-align: left;

    .message {
      color: #4c4c4c;
      font-weight: 600;
    }

    .date {
      color: #a6a6a6;
    }
  }
`;

const Foot = styled.div`
  position: fixed;
  bottom: 0;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
