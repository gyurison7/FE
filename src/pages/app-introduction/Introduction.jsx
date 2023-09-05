import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import introduction1 from '../../assets/images/introduction1.png';
import introduction2 from '../../assets/images/introduction2.png';
import introduction3 from '../../assets/images/introduction3.png';
import introduction4 from '../../assets/images/introduction4.png';
import introduction5 from '../../assets/images/introduction5.png';
import Button from '../../components/common/button/Button.jsx';

function Introduction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const navigate = useNavigate();

  const images = [
    introduction1,
    introduction2,
    introduction3,
    introduction4,
    introduction5,
  ];
  const texts = [
    '친구들끼리<br/>추억 앨범을 만들어보세요',
    '함께 공유하고 싶은<br/>순간들을 올려보세요',
    '친구들과의 소통도<br/>할 수 있어요',
    '날짜 검색으로<br/>이전 추억들을 돌아봐요',
    '지금 바로<br/>메모리밍글을 시작해보세요!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const handleTouchStart = (e) => {
    e.preventDefault();
    // 모바일 환경
    if (e.type === 'touchstart') {
      setStartX(e.touches[0].clientX);
    }
    // 데스크탑 환경
    else if (e.type === 'mousedown') {
      setStartX(e.clientX);
    }
  };

  const handleTouchEnd = (e) => {
    let endX;
    // 모바일 환경
    if (e.type === 'touchend') {
      endX = e.changedTouches[0].clientX;
    }
    // 데스크탑 환경
    else if (e.type === 'mouseup') {
      endX = e.clientX;
    }

    if (startX - endX > 50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (endX - startX > 50) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const renderText = (text) => {
    return text.split('<br/>').map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index !== text.split('<br/>').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Wrapper>
      <Dots>
        {images.map((_, index) => (
          <Dot key={index} active={currentIndex === index} />
        ))}
      </Dots>
      {currentIndex !== images.length - 1 && (
        <ButtonContainer>
          <button onClick={() => navigate('/login')}>건너뛰기</button>
          <button onClick={handleNext}>다음</button>
        </ButtonContainer>
      )}
      <Slider
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseUp={handleTouchEnd}
      >
        <H1>{renderText(texts[currentIndex])}</H1>
        <img
          src={images[currentIndex]}
          alt={`slide ${currentIndex}`}
          className={currentIndex === images.length - 1 ? 'last' : ''}
        />
        {currentIndex === images.length - 1 && (
          <StartButtonContainer>
            <Button
              type='button'
              size='large'
              background='#FFF'
              color='#5873FE'
              onClick={() => navigate('/login')}
            >
              시작하기
            </Button>
          </StartButtonContainer>
        )}
      </Slider>
    </Wrapper>
  );
}

export default Introduction;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 428px;
  display: flex;
  justify-content: center;
  background-color: #5873fe;
  overflow: hidden;
`;

const Dots = styled.div`
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#FFF' : '#A5B3FF')};
  transition: background-color 0.3s;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 3.5%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1em;

  button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: -2vh;
  gap: 10vh;

  img {
    width: 80%;
    &.last {
      width: 267px;
      height: 261px;
      margin-top: -19vh;
    }
  }
`;

const H1 = styled.h1`
  margin-top: 15vh;
  text-align: center;
  font-size: 30px;
  color: #fff;
  font-weight: 700;
`;

const StartButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 25vh;

  button {
    width: 100%;
    font-size: 16px;
    font-weight: 700;
  }
`;
