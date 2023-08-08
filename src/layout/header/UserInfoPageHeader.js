import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const UserInfoPageHeader = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <BackButton src={`${process.env.PUBLIC_URL}assets/svgs/icon_back.svg`} alt='' onClick={() => navigate(-1)} />
            <Title>프로필 등록</Title>
        </HeaderContainer>
    )
}

export default UserInfoPageHeader;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10vh;
    padding: 1vw;
    position: relative;
    top: -8vh;
    @media (max-height: 750px) {
        top: 0;
    }
`;

const BackButton = styled.img`
    cursor: pointer;
    margin-top: 10vw;
    @media (max-height: 750px) {
        margin-top: 5vw;
    }
`;

const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: #4C4C4C;
    font-family: Pretendard Variable;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;