import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import Footer from '../../layout/footer/Footer.js';
import Header from '../../components/common/header/Header.jsx';
import { uploadImage } from '../../hooks/uploadImage.js';
import { nicknameCheckHandler, onChangeNicknameHandler } from '../../hooks/userProfileUpload';

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  const navigate = useNavigate();

  const nicknameSubmitHandler = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    if (isEditing) {
      const result = nicknameCheckHandler(nickname, setNicknameError);
      if (result) {
        setNickname(nickname);
        setIsEditing(false);
      }
    }
  }
  const nicknameHandlerHooks = (e) => onChangeNicknameHandler(e, setNickname, setNicknameError);

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file).then((url) => {
        setProfileImage(url);
      });
    }
  };

  return (
    <Wrapper>
      <Header title='마이페이지' />
      <MypageContainer>
        <ProfileContainer>
          <input type='file'
            accept="image/*"
            onChange={imageHandler}
            style={{ display: 'none' }}
            id="hiddenFileInput"
          />
          <ImageButton onClick={() => document.getElementById('hiddenFileInput').click()}>
            <img className='profileImage' src={profileImage || `${process.env.PUBLIC_URL}assets/image/big_user.png`} alt='user' />
          </ImageButton>
          <NicknameContainer>
            {isEditing
              ? (
                <div>
                  <input type='text' value={nickname} onChange={nicknameHandlerHooks} />
                  {nicknameError && <small>{nicknameError}</small>}
                </div>
              )
              : <span>{nickname || '닉네임'}</span>
            }
            <ImageButton onClick={nicknameSubmitHandler}>
              <img className='pencileButton' src={`${process.env.PUBLIC_URL}assets/svgs/pencil.svg`} alt='닉네임 바꾸기' />
            </ImageButton>
          </NicknameContainer>
          <span>memorymingle</span>
        </ProfileContainer>
        <ButtonContainer>
          <button className='passwordChange' onClick={() => navigate('/pwchange')}>비밀번호 변경</button>
          <div>
            <button className='memberOut'>회원탈퇴</button>
            <span>|</span>
            <button className='logout'>로그아웃</button>
          </div>
        </ButtonContainer>
      </MypageContainer>
      <Footer />
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
  margin-top: 10vh;

  span {
    color: #959595;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ImageButton = styled.button`
    background: transparent;
    border: none;

    .profileImage {
      width: 31vh;
      height: 31vh;
      border-radius: 100%;
      object-fit: cover;
    }

    .pencileButton {
      width: 1.125rem;
      height: 1.125rem;
      flex-shrink: 0;
    }
  `;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;

  div {
    display: flex;
    flex-direction: column;

    input {
      width: 50vw;
      background: transparent;
      border: none;
      color: #4c4c4c;
      font-size: 20px;
      font-weight: 700;
      padding: 0 1px;
      outline: none;
      box-shadow: 8px 4px 23px 0px rgba(0, 0, 0, 0.25);
    }
    small {
      width: 90%;
      color: #FF7E62;
      font-size: 0.8125rem;
      font-weight: 600;
    }
  }
  
  span {
    color: #4c4c4c;
    font-size: 24px;
    font-weight: 700;
  }
  
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  margin-top: 20vh;
  @media (max-height : 750px) {
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
    font-size: 1rem;
  }

  div {
    display: flex;
    gap: 2vw;

    .memberOut, .logout {
      color: #b9b9b9;
      font-size: 0.875rem;
    }
    span {
      color: #b9b9b9;
    }
  }
`;
