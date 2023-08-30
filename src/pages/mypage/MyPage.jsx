import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import {
  getUserProfile,
  updateMyPageProfileImage,
  updateMyPageNickname,
  deleteMyPageProfileImage,
  logout,
  memberOut,
} from '../../api/auth.js';
import {
  nicknameCheckHandler,
  onChangeNicknameHandler,
} from '../../utils/nicknameValidation.js';
import Header from '../../components/common/header/Header.jsx';
import Footer from '../../layout/footer/Footer.js';
import MyPageProfileModal from '../../components/common/modal/MyPageProfileModal.jsx';
import MemberOutModal from '../../components/common/modal/MemberOutModal.jsx';
import secureLocalStorage from 'react-secure-storage';

const MyPage = () => {
  const [nickname, setNickname] = useState(''); // 원래 닉네임
  const [inputNickname, setInputNickname] = useState(); // 유저가 입력한 닉네임
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginType, setLoginType] = useState('');
  const [width, setWidth] = useState('');
  const [memberOutModal, setMemberOutModal] = useState(false);

  const navigate = useNavigate();
  const imageUploadInput = useRef(null);

  useEffect(() => {
    const getUserProfilefromApi = async () => {
      try {
        const responseData = await getUserProfile();
        setNickname(responseData.nickname);
        setInputNickname(responseData.nickname);
        setProfileImage(responseData.profileUrl);
        if (responseData.providerType === 'kakao') {
          setLoginType(responseData.providerType);
          setLoginId(responseData.kakaoId);
        } else {
          setLoginId(responseData.loginId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserProfilefromApi();
  }, []);

  const nicknameChangeUtil = (e) => onChangeNicknameHandler(e, setInputNickname);

  const blurHandler = () => {
    setInputNickname(nickname);
    setIsEditing(false);
  };

  const imageSubmitHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileUrl', file);
      try {
        const responseData = await updateMyPageProfileImage(formData);
        if (responseData) {
          setProfileImage(responseData);
          setProfileModal(false);
        } else {
          alert('프로필 이미지 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      } catch (error) {
        alert('프로필 이미지 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  const nicknameSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const result = nicknameCheckHandler(inputNickname);
    if (result) {
      try {
        const responseData = await updateMyPageNickname(inputNickname);
        if (responseData) {
          setNickname(inputNickname);
          setIsEditing(false);
        } else {
          alert('닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      } catch (error) {
        alert('닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  const deleteProfileImage = async () => {
    try {
      const responseData = await deleteMyPageProfileImage();
      if (responseData) {
        setProfileImage(null);
        setProfileModal(false);
      } else {
        alert('프로필 이미지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      alert('프로필 이미지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    try {
      const responseData = await logout();
      if (responseData) {
        secureLocalStorage.removeItem('userId');
        secureLocalStorage.removeItem('loginId');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const memberOutHandler = async (password) => {
    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    try {
      const responseData = await memberOut(password);
      if (responseData) {
        alert(
          '탈퇴가 완료되었습니다. 남아있는 추억들을 정리하는데 시간이 조금 소요될 수 있습니다.'
        );
        logoutHandler();
      }
    } catch (error) {
      alert('회원 탈퇴에 실패했습니다. 확인 후 다시 입력해주세요.');
      console.log(error);
    }
  };

  const dynamicWidth = (e) => {
    const baseWidth = 63;
    const addWidth = 21;
    const newWidth = baseWidth + e.target.value.length * addWidth;
    setWidth(newWidth);
  };

  return (
    <Wrapper>
      <Header title='마이페이지' />
      <MypageContainer>
        <ProfileContainer>
          <input
            type='file'
            ref={imageUploadInput}
            accept='image/*'
            onChange={imageSubmitHandler}
            style={{ display: 'none' }}
          />
          <ProfileImageButton onClick={() => setProfileModal(true)}>
            <img
              className='profileImage'
              src={
                profileImage ||
                'https://t1.daumcdn.net/cfile/tistory/243FE450575F82662D'
              }
              alt='프로필 사진'
            />
            <img
              className='cameraIcon'
              src={`${process.env.PUBLIC_URL}assets/svgs/camera.svg`}
              alt='프로필 사진'
            />
          </ProfileImageButton>
          <NicknameContainer onSubmit={nicknameSubmitHandler} width={width}>
            {isEditing ? (
              <input
                type='text'
                value={inputNickname}
                onChange={nicknameChangeUtil}
                onBlur={blurHandler}
                //placeholder='10자 이하로 입력해주세요!'
                maxLength={10}
                onInput={dynamicWidth}
              />
            ) : (
              <span>{nickname}</span>
            )}
            <NicknameImageButton type='submit'>
              {!isEditing ? (
                <img
                  className='pencilButton'
                  src={`${process.env.PUBLIC_URL}assets/svgs/pencil.svg`}
                  alt='닉네임 바꾸기'
                />
              ) : null}
            </NicknameImageButton>
          </NicknameContainer>
          <span>{loginId}</span>
        </ProfileContainer>
        <ButtonContainer>
          <button
            className={`passwordChange ${loginType === 'kakao' ? 'hidden' : ''}`}
            onClick={() => navigate('/pwchange')}
          >
            비밀번호 변경
          </button>
          <div>
            <button className='memberOut' onClick={() => setMemberOutModal(true)}>
              회원탈퇴
            </button>
            <span>|</span>
            <button className='logout' onClick={logoutHandler}>
              로그아웃
            </button>
          </div>
        </ButtonContainer>
      </MypageContainer>
      {profileModal ? (
        <MyPageProfileModal
          setProfileModal={setProfileModal}
          imageUploadInput={imageUploadInput}
          deleteProfileImage={deleteProfileImage}
        />
      ) : memberOutModal ? (
        <MemberOutModal
          setMemberOutModal={setMemberOutModal}
          memberOutHandler={memberOutHandler}
        />
      ) : (
        <Foot>
          <Footer />
        </Foot>
      )}
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const MypageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  margin-top: 9vh;

  span {
    color: #959595;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ProfileImageButton = styled.button`
  position: relative;
  width: 100%;
  height: auto;
  background: transparent;
  border: none;

  .profileImage {
    display: block;
    width: 31vh;
    height: 31vh;
    border-radius: 100%;
    object-fit: cover;
  }

  .cameraIcon {
    position: absolute;
    top: 80%;
    left: 77%;
  }
`;

const NicknameContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  input {
    min-width: 63px;
    max-width: 224px;
    width: ${(props) => props.width}px;
    height: 29px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #cecece;
    color: #4c4c4c;
    font-size: 24px;
    font-weight: 700;
    padding: 0 1px;
    outline: none;
    transition: width 0.2s;
    &::placeholder {
      font-size: 16px;
    }
  }

  span {
    color: #4c4c4c;
    font-size: 24px;
    font-weight: 700;
  }
`;

const NicknameImageButton = styled.button`
  background: transparent;
  border: none;

  .pencilButton {
    width: 18px;
    height: 18px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  margin-top: 20vh;
  @media (max-height: 750px) {
    margin-top: 15vh;
  }

  button {
    background: transparent;
    border: none;
    font-weight: 600;
  }

  .passwordChange {
    border-bottom: 1px solid #4c4c4c;
    color: #4c4c4c;
    font-size: 16px;
  }

  .hidden {
    visibility: hidden;
    pointer-events: none;
  }

  div {
    display: flex;
    gap: 8px;

    .memberOut,
    .logout {
      color: #b9b9b9;
      font-size: 14px;
    }
    span {
      color: #b9b9b9;
    }
  }
`;

const Foot = styled.div`
  position: fixed;
  bottom: 0;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
