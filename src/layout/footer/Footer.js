import React from 'react';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSocketManager } from '../../hooks/useSocketManager.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';

function Footer() {
  const { noticeCount } = useSocketManager();

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
        <NoticeContainer>
          <StyledNavLink to='/notice'>
            <IconComponents iconType='inbox' stroke='#4C4C4C' width="23" height="23" viewBox="0 0 23 23" />
            {noticeCount > 0 && <CountBadge>{noticeCount}</CountBadge>}
          </StyledNavLink>
        </NoticeContainer>
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

const NoticeContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

const CountBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background-color: #FF6A6A;
  color: #FFFFFF;
  font-size: 12px;
`;
