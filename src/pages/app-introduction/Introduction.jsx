import React from 'react';
import Button from '../../components/common/button/Button.jsx';
import { styled } from 'styled-components';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';


function Itroduction() {

const navigate = useNavigate()
  const onClickHandler =()=>{
navigate('/login')
  }
  return (
    <Wrap>
      <CarouselWrap>
        <Carousel autoplay>
            <IMG src={`${process.env.PUBLIC_URL}/assets/image/img1.png`} alt="rasm" />
            <IMG src={`${process.env.PUBLIC_URL}/assets/image/img2.jpeg`} alt="rasm" />
            <IMG src={`${process.env.PUBLIC_URL}/assets/image/img3.jpeg`} alt="rasm" />
            <IMG src={`${process.env.PUBLIC_URL}/assets/image/img4.jpeg`} alt="rasm" />
        </Carousel>
      </CarouselWrap>
      <WrapButton>
        <Button onClick={onClickHandler} >시작하기</Button>
      </WrapButton>
    </Wrap>
  );
}

export default Itroduction;
const Wrap = styled.div`
  width: 428px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  
`;
const IMG = styled.img`
background: red;
  height: 70vh;
`
const CarouselWrap = styled.div`
height: 70vh;
`;
const WrapButton = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
`;
