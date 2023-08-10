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
          background: 'red',
          width: '100%',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all ease 0.5s 0s',
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
        <div
          style={{
            display: scrollTop >= 307 ? 'none' : 'block',
            background: 'yellow',
            height: '40%',
          }}
        >
          side
        </div>
      </div>

      <WrapContent>
        <Box />
        {/* <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box /> */}
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
  height: 130px;
  background: #9c9c9c;
`;

const WrapContent = styled.div`
  margin-top: 25.5rem;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
`;

const Foot = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;
