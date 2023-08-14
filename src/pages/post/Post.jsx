import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer';
import api from '../../api/index.jsx';
import { useParams } from 'react-router-dom';

export default function Post() {
  const headref = useRef(null);
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    api.get(`group/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  const handleScroll = () => {
    const style = headref.current.style;
    console.log(window.scrollY);

    if (window.scrollY > 113 && style) {
      style.height = '93px';
      style.maxWidth = '428px';
      style.position = 'fixed';
      style.top = '0';
      style.backgroundColor = '#555';
    } else if (style) {
      style.position = '';
      style.height = '206px';
      style.backgroundColor = '';
      style.backgroundImage = 'none';
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
        <Head ref={headref} data={data}>
          <div>Head</div>
        </Head>
        <Side>
          <div>Side</div>
        </Side>
      </div>
      <Content>
        {data?.memories.map((e) => {
          return (
            <Box key={e.memoryId}>
              <img
                src={e.imageUrl}
                alt='rasm'
                height={130}
                style={{ width: '100%' }}
              />
            </Box>
          );
        })}
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
  grid-template-rows: repeat(100, 130px);

  gap: 2px;
`;

const Box = styled.div`
  float: right;
  height: 130px;
  background: #b5b5b5;
`;

const Head = styled.div`
  width: 100%;
  height: 22vh;
  background-image: ${(props) => `url(${props.data?.thumbnailUrl})`};
  transition: 0.5s;
  background-position: center;
  background-size: cover;
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
