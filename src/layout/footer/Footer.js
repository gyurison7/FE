import React from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';

function Footer() {
  return (
    <Wrap>
      <div>
        <StyledNavLink to='/groupmain'>
          <IconComponents iconType='home' stroke='black' />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/your-link'>
          <IconComponents iconType='group' stroke='black' />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/your-link'>
          <IconComponents iconType='inbox' stroke='black' />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink to='/mypage'>
          <IconComponents iconType='user' stroke='black' />
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
