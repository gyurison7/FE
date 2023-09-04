import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import rasm from '../../assets/images/test.png';
import rasm2 from '../../assets/images/test2.png';
import rasm3 from '../../assets/images/test3.png';
import rasm4 from '../../assets/images/test4.png';
import rasm5 from '../../assets/images/test5.png';

function Itroduction() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const onClickHandler = () => {
    if (currentSlide === 0) {
      navigate('/login');
    } else if (currentSlide === 4) {
      navigate('/login');
    } else if (currentSlide === 3) {
      navigate('/login');
    } else if (currentSlide === 2) {
      navigate('/login');
    } else if (currentSlide === 1) {
      navigate('/login');
    } else {
      carouselRef.current.next();
    }
  };
  const goToNextSlide = () => {
    carouselRef.current.next();
  };
  const goToPrevSlide = () => {
    carouselRef.current.prev();
  };
  const afterSlideChange = (current) => {
    setCurrentSlide(current);
  };
  const PP = styled.p`
    color: #fff;
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `;
  return (
    <Wrap>
      <CarouselWrap>
        <Carousel ref={carouselRef} dotPosition='top' afterChange={afterSlideChange}>
          <div>
            <Skip onClick={onClickHandler}>건너뛰기</Skip>
            <PP
              style={{
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              친구들끼리 <br /> 추억 앨범을 만들어보세요
            </PP>
            <CustomImage src={rasm} alt='introduction' />
          </div>
          <div>
            <Skip onClick={onClickHandler}>건너뛰기</Skip>
            <PP
              style={{
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              함께 공유하고 싶은 <br /> 순간들을 올려보세요
            </PP>
            <CustomImage src={rasm2} alt='introduction' />
          </div>
          <div>
            <Skip onClick={onClickHandler}>건너뛰기</Skip>
            <PP
              style={{
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              친구들과의 소통도 <br /> 할 수 있어요
            </PP>
            <CustomImage src={rasm3} alt='introduction' />
          </div>
          <div>
            <Skip onClick={onClickHandler}>건너뛰기</Skip>
            <PP
              style={{
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              날짜 검색으로 <br /> 이전 추억들을 돌아봐요
            </PP>
            <CustomImage src={rasm4} alt='introduction' />
          </div>

          <WrapButton>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <PP
                style={{
                  height: '30vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#FFF',
                }}
              >
                지금 바로 <br /> 메모리밍글을 시작해보세요
              </PP>
              <CustomImageLast src={rasm5} alt='introduction4' />
              <div
                style={{
                  height: '20vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button onClick={onClickHandler}>시작하기</Button>
              </div>
            </div>
          </WrapButton>
        </Carousel>
        <PrevNext>
          <IconComponents
            iconType='vectorLeft'
            stroke='white'
            onClick={goToPrevSlide}
          />
          {currentSlide < 4 && (
            <IconComponents
              iconType='vectorRight'
              stroke='white'
              viewBox='0 0 1 20'
              onClick={goToNextSlide}
            />
          )}
        </PrevNext>
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
const Skip = styled.p`
  padding-left: 10px;
  top: 6px;
  color: #fff;
  cursor: pointer;
  position: fixed;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 129.336%;
`;

const PrevNext = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
const CustomImage = styled.img`
  width: 70%;
  margin: 0 auto;
  height: 70vh;
`;
const CustomImageLast = styled(CustomImage)`
  width: 50%;
  height: 30vh;
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
  bottom: -100px;
  font-weight: 600;
  color: #5873fe;
  background: #fff;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 428px) {
    width: 342px;
    margin: 0 auto;
  }
  @media (min-width: 429px) {
    width: 342px;
    margin: 0 auto;
  }
`;
