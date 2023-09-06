import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import GroupPageHeader from '../../layout/header/GroupPageHeader';
import Footer from '../../layout/footer/Footer.js';
import { getGroupData } from '../../api/groupMainApi';
import { useQuery } from 'react-query';
import PlusButton from '../../components/common/button/PlusButton.jsx';
import MoreModal from '../../components/common/modal/MoreModal.jsx';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner.jsx';

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
        <FixedHeader />
        <GroupWrapper>
          {isLoading ? (
            <>
              <LoadingSpinner />
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
                  앨범 만들기
                </PreMainButton>
              </PreMainContentWrapper>
            </PreMainContainer>
          ) : (
            <>
              <ButtonWrapper onClick={writeButtonHandler}>
                <PlusButton />
              </ButtonWrapper>
              {groupData.map((item) => {
                const formattedStartDate = item.startDate
                  ? item.startDate.slice(0, 10).replace(/-/g, '.')
                  : '';
                const formattedEndDate = item.endDate
                  ? item.endDate.slice(0, 10).replace(/-/g, '.')
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
                        paddingLeft: '2px',
                      }}
                    >
                      <Title> {item.groupName}</Title>
                      <Date>
                        {formattedStartDate}~{formattedEndDate}
                      </Date>
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

const FixedHeader = styled(GroupPageHeader)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const Title = styled.p`
  color: #4c4c4c;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-top: 6px;
`;
const Date = styled.p`
  font-size: 12px;
  color: #606060;
  padding-top: 2px;
`;
const GroupEditButton = styled.button`
  position: absolute;
  padding: 3px 5px 12px 30px;
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
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GroupWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 72px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  width: 40%;
  padding-bottom: 24px;
  cursor: pointer;
  margin-left: 24px;
  position: relative;
  word-wrap: break-word;

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
  width: 100%;
  top: 12vh;
  flex-direction: column;
  display: flex;
  position: absolute;
  background-color: white;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 167px;
  height: 52px;
  border-radius: 26.321px;
  background: #5873fe;
  color: #fff;
  font-size: 16px;
`;

const PreMainText = styled.p`
  color: #4c4c4c;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PreMainPlus = styled.img`
  width: 16px;
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
// const SkeletonWrapper = styled.div`
//   margin-top: 12px;
//   width: 40%;
//   padding-bottom: 24px;
//   margin-left: 24px;
//   position: relative;
// `;

// const SkeletonImage = styled.div`
//   width: 100%;
//   height: 170px;
//   border-radius: 12px;
//   background-color: #ccc;
// `;

// const SkeletonText = styled.div`
//   h5,
//   p {
//     background-color: #ccc;
//     width: 80%;
//     height: 10px;
//   }
// `;

// const SkeletonItem = () => (
//   <SkeletonWrapper>
//     <SkeletonImage />
//     <SkeletonText>
//       <h5>...</h5>
//       <p></p>
//     </SkeletonText>
//   </SkeletonWrapper>
// );

// export default SkeletonItem;
