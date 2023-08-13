import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { uploadImage } from '../../hooks/uploadImage';
import { userInfoUpload } from '../../api/auth';
import Input from '../../components/common/input/Input.jsx';
import Header from '../../components/common/header/Header.jsx';


const UserInfo = () => {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const navigate = useNavigate();

    const onChangeNicknameHandler = (e) => {
        const value = e.target.value;
        setNickname(value);
        nicknameCheckHandler(value);
    };

    const nicknameCheckHandler = (nickname) => {
        const nicknameCheck = /^.{2,10}$/;
        if (nickname === '') {
            setNicknameError('닉네임을 입력해주세요.');
            return false;
        } else if (!nicknameCheck.test(nickname)) {
            setNicknameError('닉네임은 2자에서 10자 사이로 입력해주세요.');
            return false;
        } else {
            setNicknameError('');
            return true;
        }
    };

    const userInfoUploadHandler = async (e) => {
        e.preventDefault();
        console.log(profileImage);

        if (profileImage === '') {
            alert('사진을 등록해주세요.');
            return;
        }

        const nicknameCheckResult = nicknameCheckHandler(nickname);
        if (!nicknameCheckResult) return;

        try {
            const loginId = localStorage.getItem('loginId');
            console.log(loginId);
            const responseData = await userInfoUpload(loginId, nickname, profileImage);
            if (responseData) {
                alert('프로필 등록이 완료되었습니다!');
                navigate('/groupmain');
            } else {
                alert('프로필 등록에 실패하였습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            alert('프로필 등록에 실패하였습니다. 다시 시도해주세요.');
            console.error(error);
        }
    }

    const imageHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file).then((url) => {
                setProfileImage(url);
            });
        }
    };

    return (
        <>
            <Header title='프로필 등록' />
            <UserInfoContainer>
                <Text>
                    친구들이 알 수 있도록,<br />
                    사진과 닉네임을 등록해주세요.
                </Text>
                <input type='file'
                    accept="image/*"
                    onChange={imageHandler}
                    style={{ display: 'none' }}
                    id="hiddenFileInput"
                />
                <Button onClick={() => document.getElementById('hiddenFileInput').click()}>
                    <img src={profileImage ? profileImage : `${process.env.PUBLIC_URL}assets/image/user.png`} alt='user' />
                </Button>
                <FormContainer onSubmit={userInfoUploadHandler}>
                    <InputContainer>
                        <Input
                            onChange={onChangeNicknameHandler}
                            name='nickname'
                            type="text"
                            value={nickname}
                            placeholder="닉네임 입력"
                            theme='underLine'
                            maxLength={10}
                        />
                    </InputContainer>
                    {nicknameError && <small>{nicknameError}</small>}
                    <p>
                        프로필 정보(사진, 닉네임)는 회원 식별, 친구간 커뮤니케이션
                        등의 목적으로 활용되며, Memory Mingle 이용기간 동안 보관됩니다.
                    </p>
                    <button type='submit'>등록하기</button>
                </FormContainer>
                <SkipButton type='button' onClick={() => navigate('/groupmain')}>건너뛰기</SkipButton>
            </UserInfoContainer>
        </>
    )
}

export default UserInfo;

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2vw;
    img {
        margin-bottom: 8vw;
        @media (max-height: 750px) {
            margin-bottom: 3vw;
        }
    }
`;

const Text = styled.h2`
    margin-top: 7vh;
    margin-bottom: 10vw;
    @media (max-height: 750px) {
        margin-bottom: 7vw;
    }
    text-align: left;
    color: #4C4C4C;
    font-family: Apple SD Gothic Neo;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 129.336%;
`;

const Button = styled.button`
    background: transparent;
    border: none;

    img {
        height: 20vh;
        width: 20vh;
        border-radius: 100%;
        object-fit: cover;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vw;
    margin-bottom: 10vw;

    small {
        width: 90%;
        color: #FF7E62;
        font-family: Apple SD Gothic Neo;
        font-size: 0.8125rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        word-break: break-all;
        overflow-wrap: break-word;
        white-space: pre-line;
    }

    p {
        width: 90%;
        color: #959595;
        font-family: Apple SD Gothic Neo;
        font-size: 0.8125rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 10vw;
        @media (max-height: 750px) {
            margin-bottom: 5vw;
        }
    }

    button {
        width: 90%;
        height: 3.5625rem;
        flex-shrink: 0;
        border-radius: 1.75rem;
        background: #5873FE;
        color: #FFF;
        text-align: center;
        font-family: Apple SD Gothic Neo;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        border: none;
    }
`;

const InputContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SkipButton = styled.div`
    background: transparent;
    border: none;
    border-bottom: 1px solid #4C4C4C;
    color: #4C4C4C;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
