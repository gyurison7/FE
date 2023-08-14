import React from "react";
import { styled } from "styled-components";

function GroupPageHeader() {
  return (
    <StLogoWrapper>
      <StLogoContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StLogoImage
            src={`${process.env.PUBLIC_URL}/assets/image/logo_blue.png`}
            alt="logo"
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        >
          <button style={{ 
            height: "42px",
            border:"none",
            backgroundColor:"transparent"
            }}> 
          <img style={{
            width:"30px",
            marginTop:"18px"
          }}
          src={`${process.env.PUBLIC_URL}/assets/image/searchicon.png`}
                alt='search'/></button>
        </div>
      </StLogoContainer>
    </StLogoWrapper>
  );
}

export default GroupPageHeader;

const StLogoContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  max-width: 428px;
`;

const StLogoImage = styled.img`
  width: 32px;
  height: auto;
`;

const StLogoWrapper = styled.div`
  width: 100%;
  position: relative;
`;
