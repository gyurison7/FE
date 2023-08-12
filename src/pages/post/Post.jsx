import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer';

export default function Post() {
  const headref = useRef(null);

  const handleScroll = () => {
    const style = headref.current.style;

    if (window.scrollY > 113 && style) {
      style.height = '93px';
      style.maxWidth = '428px';
      style.position = 'fixed';
      style.top = '0';
      style.backgroundColor = 'red';
    } else if (style) {
      style.position = '';
      style.height = '206px';
      style.backgroundColor = '';
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrap>
      <div
        style={{
          position: 'sticky',
        }}
      >
        <Head ref={headref}>
          <div>Head</div>
        </Head>
        <Side>
          <div>Side</div>
        </Side>
      </div>

      <Content>
        {Array.from({ length: 9 }, (_, index) => (
          <Box key={index} />
        ))}
      </Content>
      <Foot>
        <Footer />
      </Foot>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: red;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 1px 2px;
  overflow: scroll;
  background: wheat;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;
`;

const Box = styled.div`
  min-height: 130px;
  border: 1px solid black;
`;

const Head = styled.div`
  background: blue;
  width: 100%;
  height: 22vh;
  transition: 0.5s;
  div {
    text-align: center;
    color: white;
  }
`;
const Side = styled.div`
  display: ${(prop) => prop.head};
  width: 100%;
  height: 18.5vh;
  background: green;
`;
const Foot = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
`;
