import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
function GroupAlbumHeader() {
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
  const Header_Max_Height = 100;
  const Header_Min_Height = 30;
  const animateHeaderHeight =
    scrollTop > 50 ? Header_Min_Height : Header_Max_Height;

  return (
    <Wrap animateHeaderHeight={animateHeaderHeight}>
      <Icons>
        <img
          src={`${process.env.PUBLIC_URL}/assets/svgs/VectorLeft.svg`}
          alt="left"
        />
        <img src={`${process.env.PUBLIC_URL}/assets/svgs/Add.svg`} alt="add" />
      </Icons>
      {scrollTop}
    </Wrap>
  );
}

export default GroupAlbumHeader;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  width: 428px;

  height: ${(props) => props.animateHeaderHeight};
  background: #c8c8c8;
`;
const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 58px 23px;
`;
