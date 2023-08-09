import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const MyPageHeader = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <BackButton src={`${process.env.PUBLIC_URL}assets/svgs/icon_back.svg`} alt='back' onClick={() => navigate(-1)} />
            <Title>마이페이지</Title>
        </HeaderContainer>
    )
}

export default MyPageHeader;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5vw;
    position: relative;
    top: 3vh;
`;

const BackButton = styled.img`
    display: flex;
    width: 1.10269rem;
    height: 1.10269rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: #4C4C4C;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;