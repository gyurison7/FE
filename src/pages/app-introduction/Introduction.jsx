import React from 'react';
import Button from '../../components/common/button/Button.jsx';
import { styled } from 'styled-components';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';

function Itroduction() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/login');
  };
  return (
    <Wrap>
      <CarouselWrap>
        <Carousel autoplay>
          <IMG src={`${process.env.PUBLIC_URL}/assets/image/img2.jpeg`} alt='rasm' />
          <IMG src={`${process.env.PUBLIC_URL}/assets/image/img2.jpeg`} alt='rasm' />
          <IMG src={`${process.env.PUBLIC_URL}/assets/image/img3.jpeg`} alt='rasm' />
          <IMG src={`${process.env.PUBLIC_URL}/assets/image/img4.jpeg`} alt='rasm' />
        </Carousel>
      </CarouselWrap>
      <WrapButton>
        <Button
          size='large'
          background='#9A9A9A'
          color='white'
          onClick={onClickHandler}
        >
          시작하기
        </Button>
      </WrapButton>
    </Wrap>
  );
}

export default Itroduction;
const Wrap = styled.div`
  max-width: 428px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const IMG = styled.img`
  background: red;
  height: 70vh;
`;
const CarouselWrap = styled.div`
  width: 100%;
  height: 70vh;
`;
const WrapButton = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
