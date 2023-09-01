import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ icon, title }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <BackButton
        src={`${process.env.PUBLIC_URL}assets/svgs/${icon || 'back'}.svg`}
        alt='back'
        onClick={() => navigate(-1)}
      />
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 20px;
  position: relative;
  top: 3vh;
`;

const BackButton = styled.img`
  cursor: pointer;
  flex-shrink: 0;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: #4c4c4c;
  font-size: 16px;
  font-weight: 600;
`;

Header.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default Header;
