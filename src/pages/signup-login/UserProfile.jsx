import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { uploadUserProfile } from '../../api/auth';
import Input from '../../components/common/input/Input.jsx';
import Header from '../../components/common/header/Header.jsx';
import Button from '../../components/common/button/Button.jsx';
import {
  nicknameCheckHandler,
  onChangeNicknameHandler,
} from '../../utils/nicknameValidation';
import secureLocalStorage from 'react-secure-storage';

const UserProfile = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [chosenFile, setChosenFile] = useState(null);

  const navigate = useNavigate();
  const imageUploadInput = useRef(null);

  const nicknameChangeUtil = (e) =>
    onChangeNicknameHandler(e, setNickname, setNicknameError);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setChosenFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const userProfileUploadHandler = async (e) => {
    e.preventDefault();

    const loginId = secureLocalStorage.getItem('loginId');
    if (loginId === null || loginId === '') {
      alert('회원 정보가 존재하지 않습니다.');
      navigate('/login');
      return;
    }

    if (profileImage === '') {
      alert('프로필 사진을 등록해주세요!');
      return;
    }

    if (!nicknameCheckHandler(nickname, setNicknameError)) return;

    const formData = new FormData();
    formData.append('loginId', loginId);
    formData.append('nickname', nickname);
    if (chosenFile) {
      formData.append('profileUrl', chosenFile);
    }

    try {
      const responseData = await uploadUserProfile(formData);
      if (responseData) {
        navigate('/groupmain');
      } else {
        alert('프로필 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      alert('프로필 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <>
      <Header title='프로필 등록' />
      <UserProfileContainer>
        <Text>
          친구들이 알 수 있도록,
          <br />
          사진과 닉네임을 등록해주세요.
        </Text>
        <input
          type='file'
          ref={imageUploadInput}
          accept='image/*'
          onChange={imageHandler}
          style={{ display: 'none' }}
        />
        <ImageButton onClick={() => imageUploadInput.current.click()}>
          <img
            className='profileImage'
            src={profileImage || `${process.env.PUBLIC_URL}assets/image/user.png`}
            alt='프로필 사진'
          />
          <img
            className='cameraIcon'
            src={`${process.env.PUBLIC_URL}assets/svgs/camera.svg`}
            alt='프로필 사진'
          />
        </ImageButton>
        <FormContainer onSubmit={userProfileUploadHandler}>
          <InputContainer>
            <Input
              onChange={nicknameChangeUtil}
              name='nickname'
              type='text'
              value={nickname}
              placeholder='닉네임 입력'
              theme='underLine'
            />
          </InputContainer>
          {nicknameError && <small>{nicknameError}</small>}
          <p>
            프로필 정보(사진, 닉네임)는 회원 식별, 친구간 커뮤니케이션 등의 목적으로
            활용되며, Memory Mingle 이용기간 동안 보관됩니다.
          </p>
          <Button type='submit' size='large' background='#5873FE' color='#FFF'>
            등록하기
          </Button>
        </FormContainer>
        <SkipButton type='button' onClick={() => navigate('/groupmain')}>
          건너뛰기
        </SkipButton>
      </UserProfileContainer>
    </>
  );
};

export default UserProfile;

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 9vh;
`;

const Text = styled.h2`
  text-align: left;
  color: #4c4c4c;
  font-size: 24px;
  font-weight: 600;
`;

const ImageButton = styled.button`
  position: relative;
  margin-top: 5vh;
  background: transparent;
  border: none;

  .profileImage {
    display: block;
    width: 20vh;
    height: 20vh;
    border-radius: 100%;
    object-fit: cover;
  }

  .cameraIcon {
    position: absolute;
    top: 76%;
    left: 75%;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vw;
  margin-bottom: 10vw;

  small {
    width: 90%;
    color: #ff7e62;
    font-size: 13px;
    font-weight: 600;
  }

  p {
    width: 90%;
    color: #959595;
    font-size: 13px;
    font-weight: 400;
  }

  button {
    position: relative;
    bottom: -4vh;
    font-weight: 700;
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
  position: relative;
  bottom: -6vh;
  background: transparent;
  border: none;
  border-bottom: 1px solid #4c4c4c;
  color: #4c4c4c;
  font-size: 16px;
  font-weight: 600;
`;
