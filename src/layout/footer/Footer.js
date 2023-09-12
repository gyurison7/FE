import React from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';

function Footer() {
  // const showAlert = (e) => {
  //   e.preventDefault();
  //   alert('준비중입니다. 잠시만 기다려주세요!');
  // }

  return (
    <Wrap>
      <div>
        <StyledNavLink to='/groupmain'>
          <IconComponents iconType='home' stroke='#4C4C4C' width="23" height="23" viewBox="0 0 23 23" />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/search'>
          <IconComponents iconType='search' stroke='#4C4C4C' width="22" height="22" viewBox="0 0 22 22" />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/notice'>
          <IconComponents iconType='inbox' stroke='#4C4C4C' width="23" height="23" viewBox="0 0 23 23" />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/mypage'>
          <IconComponents iconType='user' stroke='#4C4C4C' width="22" height="22" viewBox="0 0 22 22" />
        </StyledNavLink>
      </div>
    </Wrap>
  );
}

export default Footer;

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: #fff;
  box-shadow: 0px -4px 30px 0px rgba(129, 129, 129, 0.10);
  margin-top: auto;
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    & svg {
      stroke: #5873fe;
    }
  }
`;
