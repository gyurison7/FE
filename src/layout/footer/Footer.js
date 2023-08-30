import React from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';

function Footer() {
  const showAlert = (e) => {
    e.preventDefault();
    alert('준비중입니다. 잠시만 기다려주세요!');
  }

  return (
    <Wrap>
      <div>
        <StyledNavLink to='/groupmain'>
          <IconComponents iconType='home' stroke='#4C4C4C' />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/your-link'>
          <IconComponents iconType='group' stroke='#4C4C4C' />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/notice' onClick={showAlert}>
          <IconComponents iconType='inbox' stroke='#4C4C4C' />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/mypage'>
          <IconComponents iconType='user' stroke='#4C4C4C' />
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
  height: 72px;
  background: #fff;
  box-shadow: 8px 4px 23px 0px rgba(0, 0, 0, 0.25);
  margin-top: auto;
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    & svg {
      stroke: #5873fe;
    }
  }
`;
