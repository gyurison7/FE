import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function GroupPageHeader() {
  const navigate = useNavigate()
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoWrapper>
          <LogoImage
            src={`${process.env.PUBLIC_URL}/assets/image/logo_blue.png`}
            alt='logo'
          />
        </LogoWrapper>
        <SearchWrapper>
          <SearchButton>
            <SearchIcon
              src={`${process.env.PUBLIC_URL}/assets/svgs/searchicon.svg`}
              alt='search'
              onClick={()=> navigate('/search')}
            />
          </SearchButton>
        </SearchWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default GroupPageHeader;

const HeaderContainer = styled.div`
  width: 100%;
  position: relative;
`;
const HeaderWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LogoImage = styled.img`
  width: 32px;
  height: auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const SearchButton = styled.button`
  height: 42px;
  border: none;
  background-color: transparent;
`;

const SearchIcon = styled.img`
  cursor: pointer;
  width: 21px;
  margin-top: 21px;
  margin-right: 23px;
`;
