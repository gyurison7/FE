import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import UserInfoPageHeader from '../../layout/header/UserInfoPageHeader';
import Input from '../../components/common/input/Input.jsx';

const UserInfo = () => {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const onChangeNicknameHandeler = (e) => {
        setNickname(e.target.value);
        setNicknameError('');
    };

    const userInfoHandler = (e) => {
        e.preventDefault();
        if(nickname === '') {
            setNicknameError('닉네임을 입력해주세요.');
        }
    }

    return (
        <UserInfoContainer>
            <UserInfoPageHeader />
            <Text>
                친구들이 알 수 있도록,<br />
                사진과 닉네임을 등록해주세요.
            </Text>
            <img src={`${process.env.PUBLIC_URL}assets/image/user.png`} alt='user' />
            <FormContainer onSubmit={userInfoHandler}>
                <Input
                    onChange={onChangeNicknameHandeler}
                    name='nickname'
                    type="text"
                    value={nickname}
                    placeholder="닉네임을 입력해주세요."
                    theme='underLine'
                />
                {nicknameError && <small>{nicknameError}</small>}
                <p>
                    프로필 정보(사진, 닉네임)는 회원 식별, 친구간 커뮤니케이션
                    등의 목적으로 활용되며, Memory Mingle 이용기간 동안 보관됩니다.
                </p>
                <button type='submit'>등록하기</button>
            </FormContainer>
            <Link to='/groupmain'>건너뛰기</Link>
        </UserInfoContainer>
    )
}

export default UserInfo;

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2vw;

    img {
        margin-bottom: 10vw;
        @media (max-height: 750px) {
            margin-bottom: 5vw;
        }
    }
`;

const Text = styled.h2`
    margin-bottom: 10vw;
    text-align: left;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vw;
    margin-bottom: 10vw;

    small {
        width: 90%;
        font-size: 0.8rem;
        color: #FF7E62;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: pre-line;
    }

    p {
        width: 90%;
        font-size: 0.8rem;
        color: #959595;
        margin-bottom: 10vw;
        @media (max-height: 750px) {
            margin-bottom: 5vw;
        }
    }

    button {
        width: 21.375rem;
        height: 3.5625rem;
        flex-shrink: 0;
        border-radius: 1.75rem;
        background: #5873FE;
        color: #FFF;
        border: none;
        cursor: pointer;
    }
`;

