import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
export default function Photo({ image, onClick }) {
  const [ref, inView] = useInView({
    threshold: 0.9, // threshold: 이는 요소가 얼마나 보여야 하는지를 나타냄
    triggerOnce: true, // triggerOnce: 이 옵션이 true로 설정되면, 한 번 감지되면 나중에 다시 감지하지 않
  });
  return (
    <Box ref={ref} onClick={onClick}>
      {inView ? <img src={image} alt='photos' /> : <CardSkeleton />}
    </Box>
  );
}
Photo.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
const Box = styled.div`
  height: 130px;
  img {
    height: 130px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
const CardSkeleton = styled.div`
  border-radius: 5px;
  height: 130px;
  background: #d4d4d4;
`;
