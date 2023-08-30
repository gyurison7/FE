import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import GroupPageHeader from '../../layout/header/GroupPageHeader';
import Footer from '../../layout/footer/Footer.js';
import { getGroupData } from '../../api/groupMainApi';
import { useQuery } from 'react-query';
import PlusButton from '../../components/common/button/PlusButton.jsx';
import MoreModal from '../../components/common/modal/MoreModal.jsx';

function GroupMain() {
  const [isMoreModalId, setMoreModalId] = useState(null);
  const navigate = useNavigate();
  const parentRef = useRef(null);

  const writeButtonHandler = () => {
    navigate(`/groupwrite`);
  };

  // groupdata 가져오기
  const {
    data: groupData,
    isError,
    isLoading,
  } = useQuery('groupData', getGroupData);

  const moreEditHandler = (groupId) => {
    if (isMoreModalId === groupId) {
      setMoreModalId(null);
    } else {
      setMoreModalId(groupId);
    }
  };
  return (
    <>
      <MainContainer ref={parentRef}>
        <GroupPageHeader />
        <GroupWrapper>
          {isLoading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : isError ? (
            <div>Error fetching group data</div>
          ) : groupData && groupData.length === 0 ? (
            <PreMainContainer>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/3dhand.png`}
                alt='handicon'
              />
              <PreMainContentWrapper>
                <PreMainText>지금 추억을 만들어보세요 </PreMainText>
                <PreMainButton onClick={writeButtonHandler}>
                  <PreMainPlus
                    src={`${process.env.PUBLIC_URL}/assets/image/plusimg.png`}
                    alt='logo'
                  />
                  추억 만들기
                </PreMainButton>
              </PreMainContentWrapper>
            </PreMainContainer>
          ) : (
            <>
              <ButtonWrapper>
                <PlusButton onClick={writeButtonHandler} />
              </ButtonWrapper>
              {groupData.map((item) => {
                const formattedStartDate = item.startDate
                  ? item.startDate.slice(0, 10)
                  : '';
                const formattedEndDate = item.endDate
                  ? item.endDate.slice(0, 10)
                  : '';

                return (
                  <ButtonWrapper key={item.groupId}>
                    <GroupEditButton onClick={() => moreEditHandler(item.groupId)}>
                      <EditIcon
                        src={`${process.env.PUBLIC_URL}/assets/svgs/iconedit.svg`}
                        alt='editicon'
                      />
                    </GroupEditButton>
                    {isMoreModalId === item.groupId && (
                      <MoreModal
                        onClose={() => setMoreModalId(null)}
                        groupid={item.groupId}
                        groupUserId={item.userId}
                        groupName={item.groupName}
                        parentRef={parentRef}
                      />
                    )}
                    <GroupDetailButton
                      onClick={() => navigate(`/postmain/${item.groupId}`)}
                    >
                      {' '}
                      <ThumbNaiilImage src={item.thumbnailUrl} alt='cover' />
                    </GroupDetailButton>
                    <div
                      style={{
                        lineHeight: '7px',
                        paddingLeft: '2px',
                        marginTop: '12px',
                      }}
                    >
                      <h5> {item.groupName}</h5>
                      <p
                        style={{
                          fontSize: '10px',
                          color: 'gray',
                          marginTop: '4px',
                        }}
                      >
                        {formattedStartDate}~{formattedEndDate}
                      </p>
                    </div>
                  </ButtonWrapper>
                );
              })}
            </>
          )}
          <div style={{ height: '72px' }}></div>
        </GroupWrapper>
        <Foot>
          <Footer />
        </Foot>
      </MainContainer>
    </>
  );
}

export default GroupMain;

const GroupEditButton = styled.button`
  position: absolute;
  right: 10px;
  top: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const GroupDetailButton = styled.button`
  width: 100%;
  height: 170px;
  border-radius: 12px;
  border: none;
`;

const EditIcon = styled.img`
  width: 8px;
  height: 23px;
`;
const ThumbNaiilImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

//container and wrapper
const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 72px;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 12px;
  width: 40%;
  padding-bottom: 24px;
  cursor: pointer;
  margin-left: 24px;
  position: relative;

  h5 {
    margin-top: -10px;
    line-height: 16px;
  }
`;

//styled
// const WriteButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 170px;
//   border-radius: 12px;
//   border: none;
//   cursor: pointer;
//   font-size: 50px;
//   color: white;
//   background-color: rgba(88, 115, 254, 1);
// `;

// const PlusImage = styled.img`
//   margin: 0;
// `;

const PreMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

const PreMainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  margin-top: 1rem;
  align-items: center;
`;

const PreMainButton = styled.button`
  border: none;
  width: 167px;
  height: 52px;
  border-radius: 26.321px;
  background: #5873fe;
  color: #fff;
`;

const PreMainText = styled.p`
  color: #4c4c4c;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PreMainPlus = styled.img`
  width: 12px;
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

/// 스켈레턴
const SkeletonWrapper = styled.div`
  margin-top: 12px;
  width: 40%;
  padding-bottom: 24px;
  margin-left: 24px;
  position: relative;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 170px;
  border-radius: 12px;
  background-color: #ccc;
`;

const SkeletonText = styled.div`
  h5,
  p {
    background-color: #ccc;
    width: 80%;
    height: 10px;
  }
`;

const SkeletonItem = () => (
  <SkeletonWrapper>
    <SkeletonImage />
    <SkeletonText>
      <h5>...</h5>
      <p></p>
    </SkeletonText>
  </SkeletonWrapper>
);

// export default SkeletonItem;
