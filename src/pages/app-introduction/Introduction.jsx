import React from 'react';
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
        <Carousel autoplay dotPosition='top'>
          <IMG
            src={`${process.env.PUBLIC_URL}/assets/svgs/introduction.svg`}
            alt='rasm'
          />
          <IMG
            src={`${process.env.PUBLIC_URL}/assets/svgs/introduction1.svg`}
            alt='rasm'
          />
          <IMG
            src={`${process.env.PUBLIC_URL}/assets/svgs/introduction2.svg`}
            alt='rasm'
          />
          <IMG
            src={`${process.env.PUBLIC_URL}/assets/svgs/introduction3.svg`}
            alt='rasm'
          />
          <WrapButton>
            <IMG
              src={`${process.env.PUBLIC_URL}/assets/svgs/introduction4.svg`}
              alt='rasm'
            />
            <Button onClick={onClickHandler}>시작하기</Button>
          </WrapButton>
        </Carousel>
      </CarouselWrap>
    </Wrap>
  );
}

export default Itroduction;
const Wrap = styled.div`
  background: #5873fe;
  max-width: 428px;
  height: 100vh;
`;
const IMG = styled.img`
  width: 100%;
  height: 100vh;
`;
const CarouselWrap = styled.div`
  width: 100%;
`;
const WrapButton = styled.div`
  height: 100vh;
`;
const Button = styled.span`
  position: sticky;
  border-radius: 28px;
  bottom: 30px;
  color: #5873fe;
  background: #fff;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 428px) {
    width: 200px;
    margin: 0 auto;
  }
  @media (min-width: 429px) {
    width: 200px;
    margin: 0 auto;
  }
`;
