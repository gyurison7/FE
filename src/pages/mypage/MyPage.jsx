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
import LoadingSpinner from '../../components/common/loading/LoadingSpinner.jsx';
import { useMutation } from 'react-query';
import CropperModal from '../../components/common/modal/CropperModal.jsx';
import { useToast } from '../../hooks/useToast.jsx';

const MyPage = () => {
  const [nickname, setNickname] = useState(''); // 원래 닉네임
  const [newNickname, setNewNickname] = useState(); // 변경한 닉네임
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginType, setLoginType] = useState('');
  const [memberOutModal, setMemberOutModal] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [openCropper, setOpenCropper] = useState(false);

  const navigate = useNavigate();
  const imageUploadInput = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    const getUserProfilefromApi = async () => {
      try {
        const responseData = await getUserProfile();
        setNickname(responseData.nickname);
        setNewNickname(responseData.nickname);
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

  const selectImageHandelr = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectImage(URL.createObjectURL(file));
      setOpenCropper(true);
      setProfileModal(false);
    }
  };

  const mutation = useMutation(updateMyPageProfileImage);

  const imageSubmitHandler = async () => {
    const formData = new FormData();
    formData.append('profileUrl', croppedImage);
    mutation.mutate(formData, {
      onSuccess: (data) => {
        setProfileImage(data);
        setProfileModal(false);
        setOpenCropper(false);
      },
      onError: (error) => {
        showToast('프로필 이미지 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        console.error(error);
      },
    });
  };

  const nicknameChangeUtil = (e) => onChangeNicknameHandler(e, setNewNickname);

  const blurHandler = () => {
    setNewNickname(nickname);
    setIsEditing(false);
  };

  const nicknameSubmitHandler = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const result = nicknameCheckHandler(newNickname);
    if (result) {
      try {
        const responseData = await updateMyPageNickname(newNickname);
        if (responseData) {
          setNickname(newNickname);
          setIsEditing(false);
        }
      } catch (error) {
        showToast('닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
      }
    } catch (error) {
      showToast('프로필 이미지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    try {
      const responseData = await logout();
      if (responseData) {
        localStorage.removeItem('userId');
        localStorage.removeItem('loginId');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const memberOutHandler = async (memberOutCheck) => {
    if (memberOutCheck === '' || memberOutCheck !== '떠날래요') {
      showToast('"떠날래요"를 입력해주세요.');
      return;
    }
    try {
      const responseData = await memberOut(memberOutCheck);
      if (responseData) {
        showToast(
          '탈퇴가 완료되었습니다. 남아있는 추억들을 정리하는데 시간이 조금 소요될 수 있습니다.'
        );
        localStorage.removeItem('userId');
        localStorage.removeItem('loginId');
        navigate('/');
      }
    } catch (error) {
      showToast('회원 탈퇴에 실패했습니다. 확인 후 다시 입력해주세요.');
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {mutation.isLoading && <LoadingSpinner />}
      <Header title='마이페이지' />
      <MypageContainer>
        <ProfileContainer>
          {openCropper && (
            <CropperModal
              imageSubmitHandler={imageSubmitHandler}
              selectImage={selectImage}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              setOpenCropper={setOpenCropper}
            />
          )}
          <input
            type='file'
            ref={imageUploadInput}
            accept='image/*'
            onChange={selectImageHandelr}
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
          <NicknameContainer>
            {isEditing ? (
              <input
                type='text'
                value={newNickname}
                onChange={nicknameChangeUtil}
                onBlur={blurHandler}
                placeholder='10자 이하로 입력해주세요!'
                maxLength={10}
              />
            ) : (
              <span>{nickname}</span>
            )}
            <NicknameImageButton
              onTouchStart={nicknameSubmitHandler}
              onMouseDown={nicknameSubmitHandler}
            >
              {isEditing ? (
                <img
                  src={`${process.env.PUBLIC_URL}assets/svgs/nickname_check.svg`}
                  alt='닉네임 바꾸기'
                />
              ) : (
                <img
                  className='pencilButton'
                  src={`${process.env.PUBLIC_URL}assets/svgs/pencil.svg`}
                  alt='닉네임 바꾸기'
                />
              )}
            </NicknameImageButton>
          </NicknameContainer>
          <span>{`@${loginId}`}</span>
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

const FlexCenter =`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  ${FlexCenter}
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

const MypageContainer = styled.div`
  ${FlexCenter}
  flex-direction: column;
  width: 100%;
  padding-bottom: 13vh;
`;

const ProfileContainer = styled.div`
  ${FlexCenter}
  flex-direction: column;
  margin-top: 9vh;

  span {
    color: #959595;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ProfileImageButton = styled.button`
  position: relative;
  height: auto;
  background: transparent;
  border: none;
  margin-bottom: 3vh;

  .profileImage {
    display: block;
    width: 29vh;
    height: 29vh;
    border-radius: 100%;
    object-fit: cover;
  }

  .cameraIcon {
    position: absolute;
    top: 81%;
    left: 75%;
  }
`;

const NicknameContainer = styled.div`
  ${FlexCenter}
  height: 32px;
  margin-bottom: 2vh;
  gap: 7px;

  input {
    width: 242px;
    height: 32px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #cecece;
    color: #4c4c4c;
    font-size: 24px;
    font-weight: 700;
    padding: 0 2px 3px 2px;
    outline: none;
    &::placeholder {
      font-size: 16px;
    }
  }

  span {
    height: 32px;
    color: #4c4c4c;
    font-size: 24px;
    font-weight: 700;
  }
`;

const NicknameImageButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  .pencilButton {
    width: 21px;
    height: 21px;
  }
`;

const ButtonContainer = styled.div`
  ${FlexCenter}
  flex-direction: column;
  gap: 3vh;
  margin-top: 20vh;
  @media (max-height: 750px) {
    margin-top: 15vh;
  }

  button {
    background: transparent;
    border: none;
    font-weight: 600;
    cursor: pointer;
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
    gap: 9px;

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
