import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer';
import useStickyMode from '../../hooks/useStickyMode.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index.jsx';
import Photo from '../../components/common/photo/Photo.jsx';
import Profile from '../../components/common/profile/Profile.jsx';
import PlusButton from '../../components/common/button/PlusButton.jsx';
import { useRecoilState } from 'recoil';
import { selectedProfileState, modalState } from '../../recoil/Atom';
import ProfileModal from '../../components/common/modal/ProfileModal.jsx';

export default function PostMain() {
  const stkicky = useStickyMode(115);
  console.log(stkicky);
  const [data, setData] = useState(null);
  const [selectedProfile, setSelectedProfile] = useRecoilState(selectedProfileState);
  console.log('atom', selectedProfile);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleProfileClick = (profileData) => {
    setSelectedProfile(profileData);
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    api.get(`group/${id}`, { withCredentials: true }).then((res) => {
      setData(res.data);
    });
  }, []);
  const processedPlace = data?.place
    ? JSON.parse(data.place)
        .map((item) => item.replace(/["]/g, ''))
        .join(', ')
    : '';
  return (
    <div style={{ position: 'relative' }}>
      <Wrap>
        <ProfileModal isOpen={isOpen} closeModal={closeModal} />
        <Head $heady={stkicky}>
          <BackButton onClick={() => navigate('/groupmain')}>
            <IconComponents iconType='vectorLeft' stroke='white' />
          </BackButton>
          {stkicky && <p>{data?.groupName}</p>}
          <CamereButton onClick={() => navigate(`/postwrite/${id}`)}>
            <IconComponents iconType='camera' stroke='white' />
          </CamereButton>
        </Head>
        <div>
          <CoverImage data={data}></CoverImage>
          <Side>
            <GroupTitle>
              <Title>
                <h4>{data?.groupName}</h4>
                <IconComponents
                  iconType='vectorRight'
                  width='20'
                  stroke='#787777'
                  onClick={() => navigate(`/grouadd/${id}`)}
                />
              </Title>
              <FriendAdd>
                <IconComponents iconType='inviteFriends' stroke='#8E8E8E' />
                <p>친구초대</p>
              </FriendAdd>
            </GroupTitle>
            <DateLocation>
              <WrapDate>
                <IconComponents
                  iconType='date'
                  width='20'
                  height='20'
                  stroke='#8E8E8E'
                />
                <p>
                  {data?.startDate.substr(0, 10)}~{data?.endDate.substr(0, 10)}
                </p>
              </WrapDate>
              <WrapLocation>
                <IconComponents
                  iconType='location'
                  width='20'
                  height='20'
                  stroke='#8E8E8E'
                />
                <p>{processedPlace}</p>
              </WrapLocation>
            </DateLocation>
            <AvatarContainer>
              {data?.participants.map((element) => {
                return (
                  <Profile
                    key={element.userId}
                    url={element.profileUrl}
                    name={element.nickname}
                    onClick={() => handleProfileClick(element)}
                  />
                );
              })}
            </AvatarContainer>
          </Side>
          <Content>
            <PlusButton
              borderradious='none'
              height='130px'
              background='#D9D9D9'
              onClick={() => navigate(`/postwrite/${id}`)}
            />
            {data?.memories?.map((url, i) => {
              return (
                <Photo
                  key={i}
                  image={url.imageUrl}
                  onClick={() => navigate(`/postmain/${id}/${url.memoryId}`)}
                />
              );
            })}
          </Content>
        </div>
        <div style={{ height: '72px' }}></div>
      </Wrap>
      <Foot>
        <Footer />
      </Foot>
    </div>
  );
}
const Wrap = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
`;
const CoverImage = styled.div`
  background-image: ${(props) => `url(${props.data?.thumbnailUrl})`};
  width: 100%;
  height: 206px;
  background-position: center;
  background-size: cover;
`;
const Head = styled.div`
  display: flex;
  color: white;
  top: 0;
  justify-content: space-between;
  padding: 58px 25px 7px 25px;
  height: 93px;
  position: fixed;
  background: ${(props) => (props.$heady ? '#5873FE' : 'transparent')};
  transition: all 0.2s;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
const CamereButton = styled.button`
  border: none;
  background: transparent;
`;
const BackButton = styled(CamereButton)``;
const Side = styled.div`
  width: 100%;
  height: 174px;
  padding: 18px 24px;
`;
const GroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  gap: 12px;
`;
const FriendAdd = styled.div`
  display: flex;
  p {
    color: #8e8e8e;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const DateLocation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const WrapDate = styled.div`
  display: flex;
  align-items: center;
  p {
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const WrapLocation = styled.div`
  display: flex;
  align-items: center;
  p {
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 12.5px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
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
