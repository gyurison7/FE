import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const UserInfoPageHeader = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <BackButton src={`${process.env.PUBLIC_URL}assets/svgs/icon_back.svg`} alt='back' onClick={() => navigate(-1)} />
            <Title>프로필 등록</Title>
        </HeaderContainer>
    )
}

export default UserInfoPageHeader;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 5vw;
    position: relative;
    margin-bottom: -5rem;
    @media (max-height: 670px) {
        margin-bottom: -3rem;
    }
    top: -14vh;
    @media (max-height: 670px) {
        top: -8vh;
    }
`;

const BackButton = styled.img`
    display: flex;
    width: 0.53763rem;
    height: 1.10906rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 3.5vh;
    @media (max-height: 750px) {
        margin-top: 1.5vh;
    }
`;

const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: #4C4C4C;
    text-align: center;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;