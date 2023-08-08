import React from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer.jsx';
function GroupAlbum() {
  return (
    <Wrap>
      <Foot>
        <Footer />
      </Foot>
    </Wrap>
  );
}

export default GroupAlbum;
const Wrap = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;
const Foot = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;
