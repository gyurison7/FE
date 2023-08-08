import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const SignupPageHeader = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <BackButton onClick={() => navigate(-1)}>X</BackButton>
            <TitleContainer>
                <Title>회원가입</Title>
            </TitleContainer>
        </HeaderContainer>
    )
}

export default SignupPageHeader;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 1rem;
    position: relative;
    top: -10vh;
`;

const BackButton = styled.button`
    cursor: pointer;
    margin-right: auto; 
`;

const TitleContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const Title = styled.h1`
    color: #4C4C4C;
    font-family: Pretendard Variable;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;