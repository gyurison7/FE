import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../button/Button.jsx';

const SignupModal = () => {
    const navigate = useNavigate();

    return (
        <ModalWrapper>
            <ModalBackground></ModalBackground>
            <ModalBody>
                <img src={`${process.env.PUBLIC_URL}assets/svgs/signup_check.svg`} alt='회원가입 확인' />
                <TextContainer>
                    <h2>회원가입 완료</h2>
                    <p>지금 바로 우리들의 추억을<br />만들어보세요!</p>
                </TextContainer>
                <ButtonContainer>
                    <Button
                        onClick={() => navigate('/userprofile')}
                        size='large'
                        background='#5873FE'
                        color='#FFF'
                    >확인
                    </Button>
                </ButtonContainer>
            </ModalBody>
        </ModalWrapper>
    )
}

export default SignupModal;

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 428px;
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.8;
    background-color: #000;
    z-index: 1;
`;

const ModalBody = styled.div`
    position: relative;
    width: 80%;
    height: 436px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 21px 32px;
    border-radius: 28px;
    background: #FFF;
    flex-shrink: 0;
    z-index: 2;
    img {
        margin-top: 69px;
    }
`;

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    color: #4C4C4C;
    line-height: 129.336%;
    h2 {
        margin-bottom: 38px;
        font-size: 24px;
        font-weight: 700;
    }
    p {
        font-size: 16px;
        font-weight: 500;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    button {
        width: 100%;
        font-weight: 700;
    }
`;