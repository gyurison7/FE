import React from 'react';
import { styled } from 'styled-components';

function Footer() {
  return (
    <Wrap>
      <div>
        <img src={`${process.env.PUBLIC_URL}/assets/svgs/home.svg`} alt="svg" />
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/svgs/group.svg`}
          alt="svg"
        />
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/svgs/alarm.svg`}
          alt="svg"
        />
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/svgs/person.svg`}
          alt="svg"
        />
      </div>
    </Wrap>
  );
}

export default Footer;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 17vh;
  background: #fff;
  box-shadow: 8px 4px 23px 0px rgba(0, 0, 0, 0.25);
  margin-top: auto;
`;
