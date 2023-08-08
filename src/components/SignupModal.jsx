import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const SignupModal = () => {
    const navigate = useNavigate();

    return (
        <ModalWrapper>
            <ModalBackground></ModalBackground>
            <ModalBody>
                <img src={`${process.env.PUBLIC_URL}assets/image/signup_check.svg`} alt='회원가입 확인' />
                <TextContainer>
                    <h2>회원가입 완료</h2>
                    <p>지금 바로 메모리 밍글을<br />만들어보세요</p>
                </TextContainer>
                <ButtonContainer>
                    <button onClick={() => navigate('/groupmain')}>확인</button>
                </ButtonContainer>
            </ModalBody>
        </ModalWrapper>
    )
}

export default SignupModal;

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-color: #000;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const ModalBody = styled.div`
    position: relative;
    padding: 1.25rem;
    border-radius: 1.75rem;
    opacity: 1;
    background: #FFF;
    width: 21.125rem;
    height: 27.25rem;
    flex-shrink: 0;
    max-width: 80%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        margin-top: 2rem;
    }
`;

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;

    h2 {
        margin-bottom: 1.25rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;

    button {
        width: 18.5rem;
        height: 3.5625rem;
        flex-shrink: 0;
        border: none;
        border-radius: 1.75rem;
        background: #5873FE;
        color: #FFF;
        cursor: pointer;
    }
`;