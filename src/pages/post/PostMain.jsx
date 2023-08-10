import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer.jsx';
// import GroupAlbumHeader from '../../layout/header/GroupAlbumHeader.jsx';

function PostMain() {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const Header_Max_Height = 408;
  const Header_Min_Height = 100;
  const animateHeaderHeight =
    scrollTop >= 307 ? Header_Min_Height : Header_Max_Height;

  return (
    <div>
      <div
        style={{
          height: animateHeaderHeight,
          position: 'fixed',
          background: '#C2C2C2',
          width: '100%',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all ease 0.5s     0s',
        }}
      >
        <Head
          style={{
            height: scrollTop >= 307 ? 'none' : 'block',
          }}
        >
          <Icons>
            <img
              src={`${process.env.PUBLIC_URL}/assets/svgs/VectorLeft.svg`}
              alt="left"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/svgs/Add.svg`}
              alt="add"
            />
          </Icons>
          {scrollTop}
        </Head>
        <Side
          style={{
            display: scrollTop >= 307 ? 'none' : 'block',
            background: 'white',
            height: '40%',
          }}
        >
          <MemoryName>
            <MemoryNameLeft>
              <span>Memory Name</span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/svgs/VectorRight.svg`}
                alt="left"
              />
            </MemoryNameLeft>
            <MemoryNameRight>
              <img
                src={`${process.env.PUBLIC_URL}/assets/svgs/AddFriend.svg`}
                alt="left"
              />
              <span>친구초대</span>
            </MemoryNameRight>
          </MemoryName>
          <Avatar>
            <div>
              <img src="" alt="" />
              <span>Name</span>
            </div>
            <div>
              <img src="" alt="" />
              <span>Name</span>
            </div>
          </Avatar>
          <Location>
            <span>강원도 양양군</span>
            <span>2023.08.01-2023.08.03</span>
          </Location>
        </Side>
      </div>

      <WrapContent>
        <Box>
          <img
            src={`${process.env.PUBLIC_URL}/assets/svgs/plus.svg`}
            alt="plus"
          />
        </Box>
      </WrapContent>
      <Foot>
        <Footer />
      </Foot>
    </div>
  );
}

export default PostMain;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Head = styled.div`
  height: 60%;
  padding: 57px 23px;
`;
const Box = styled.div`
  display: flex;
  background: #d9d9d9;
  align-items: center;
  justify-content: center;
  height: 130px;
`;

const WrapContent = styled.div`
  margin-top: 25.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
`;

const Foot = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const Side = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const MemoryName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
`;

const MemoryNameLeft = styled.div`
  display: flex;
  gap: 5px;
  span {
    color: #535353;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const MemoryNameRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  span {
    color: #a6a6a6;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Avatar = styled.div`
  display: flex;
  padding: 0px 22px 0px 22px;
  gap: 17px;

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: center;
  }
  img {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background: #c1c1c1;
  }
  span {
    color: #a6a6a6;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Location = styled.div`
  display: flex;
  padding: 15px 24px;
  flex-direction: column;
  gap: 5px;
  span {
    color: #a6a6a6;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
