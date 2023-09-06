import React from 'react';
import { styled } from 'styled-components';

function NoSearch() {
  return (
    <NoSearchContainer>
      <NoSearchImage
        className='inputIcon'
        src={`${process.env.PUBLIC_URL}/assets/image/nosearch.png`}
        alt='calander'
      />
      <SearhNotFound>검색결과가 없습니다</SearhNotFound>
    </NoSearchContainer>
  );
}

export default NoSearch;

const NoSearchContainer = styled.div`
padding-top: 10rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearhNotFound = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #959595;
  padding-top: 46px;
  font-weight: 600;
`;

const NoSearchImage = styled.img`
  width: 160px;
  height: 129px;
`;
