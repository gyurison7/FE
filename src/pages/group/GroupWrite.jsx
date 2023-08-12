import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';
import { DatePicker } from 'antd';
import moment from 'moment';
import { uploadImage } from '../../hooks/uploadImage.js';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';

function GroupWrite() {
  const [groupName, setGroupName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [place, setPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [participants, setParticipant] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  console.log('imgurl=>', thumbnailUrl);
  const searchUser = async (nickname) => {
    try {
      const response = await api.get(`/nickname/${nickname}`, {
        withCredentials: true,
      });

      const userData = response.data;
      console.log('nickname', response);
      console.log(userData);
      setSearchResult(response.data.findByNicknameData);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message === '로그인이 필요한 기능입니다.'
      ) {
        console.error('User needs to log in to access this feature.');
      } else {
        console.error('Error fetching user data:', error);
      }
    }
  };

  //데이터 보내는 로직
  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      groupName: groupName,
      thumbnailUrl: thumbnailUrl,
      place: places,
      participant: selectedFriends.map((friend) => friend.userId.toString()),
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await api.post('/group', payload, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate('/groupmain');
    } catch (error) {
      console.error('Error sending group data:', error);
    }
  };

  const universalHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'groupName':
        setGroupName(value);
        break;
      case 'place':
        setPlace(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'participants':
        setParticipant(value);
        searchUser(value);
        break;
      default:
        break;
    }
  };

  //이미지 처리하는 로직
  const imageHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      uploadImage(file).then((url) => {
        setThumbnailUrl(url);
      });
    }
  };

  const deletePlaceHandler = (indexToDelete) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((_, index) => index !== indexToDelete)
    );
  };

  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate('/groupmain');
  };

  const placeButtonHandler = () => {
    const newPlaces = place;
    setPlaces((prevPlaces) => [...prevPlaces, newPlaces]);
    setPlace('');
  };

  const addFriendHandler = (item) => {
    const newFriend = {
      userId: item.userId,
      loginId: item.loginId,
      nickname: item.nickname,
      profileUrl: item.profileUrl,
    };
    setSelectedFriends((prevFriend) => [...prevFriend, newFriend]);
    setParticipant('');
    setSearchResult([]);
  };

  const removeFriendHandler = (id) => {
    setSelectedFriends((prevfri) => prevfri.filter((item) => item.userId !== id));
  };

  const isUserSelected = (loginId) => {
    return selectedFriends.some((friend) => friend.loginId === loginId);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <WriteHeader>
          <div>
            <BackButton onClick={backButtonHandler}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/svgs/VectorLeft.svg`}
                alt='left'
              />
            </BackButton>
          </div>
          <div>앨범 만들기</div>
          <div>
            <SubmitButton type='submit'>확인</SubmitButton>
          </div>
        </WriteHeader>

        <WriteBody>
          <GroupInput
            theme='underLine'
            name='groupName'
            type='text'
            value={groupName}
            placeholder='앨범 이름을 입력해주세요'
            onChange={universalHandler}
            required
          />
          <WriteImageWrapper>
            {thumbnailUrl ? (
              <ThumbnailWrapper>
                <ThumbedImage src={thumbnailUrl} alt='Uploaded Thumbnail' />
                <ImageInput type='file' accept='image/*' onChange={imageHandler} />
              </ThumbnailWrapper>
            ) : (
              <WriteImageUpload
                height='20vh'
                onImageChange={imageHandler}
                bgcolor='rgba(245, 246, 248, 1)'
              >
                썸네일 추가하기
              </WriteImageUpload>
            )}
          </WriteImageWrapper>
          함께한 추억 기간
          <StDateWrapper>
            <DatePicker.RangePicker
              className='my-picker'
              value={[
                startDate ? moment(startDate) : null,
                endDate ? moment(endDate) : null,
              ]}
              onChange={(dates, dateStrings) => {
                setStartDate(dateStrings[0]);
                setEndDate(dateStrings[1]);
              }}
              style={{ width: '100%' }}
            />
          </StDateWrapper>
          함께한 추억 장소
          <PlaceInputWrapper>
            <GroupWriteInput
              name='place'
              placeholder='장소'
              value={place}
              onChange={universalHandler}
            />
            {place && (
              <PlaceAddButton className='button' onClick={placeButtonHandler}>
                추가
              </PlaceAddButton>
            )}
            {places.map((place, index) => (
              <PlaceResult key={index}>
                {place}
                <PlaceRemoveButton onClick={() => deletePlaceHandler(index)}>
                <img
                src={`${process.env.PUBLIC_URL}/assets/image/cancleplace.png`}
                alt='left'
              />
                </PlaceRemoveButton>
              </PlaceResult>
            ))}
          </PlaceInputWrapper>
          함께한 친구들
          <div style={{ width: '100%' }}>
            <GroupWriteInput
              name='participants'
              placeholder='친구 닉네임'
              value={participants}
              onChange={universalHandler}
            />
            {searchResult
              .filter((item) => !isUserSelected(item.loginId))
              .map((item) => {
                return (
                  <div key={item.userId}>
                    {item.loginId}
                    {item.nickname}
                    <button onClick={() => addFriendHandler(item)}> 추가</button>
                  </div>
                );
              })}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {selectedFriends &&
              selectedFriends.map((item) => {
                return (
                  <div key={item.userId}>
                    <ProfileImage src={item.profileUrl} alt={item.nickname} />
                    <div> {item.nickname} </div>
                    <p> {item.loginId}</p>
                    <button onClick={() => removeFriendHandler(item.userId)}>
                      {' '}
                      제거
                    </button>
                  </div>
                );
              })}
          </div>
        </WriteBody>
      </Form>
    </>
  );
}

export default GroupWrite;

const Form = styled.form`
  width: 100%;
`;

const WriteHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  background-color: #fff;
  align-items: center;
`;

const WriteBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: scroll;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
`;

const GroupInput = styled.input`
  width: 100%;
  padding: 15px 60px 15px 0px;
  font-size: 20px;
  line-height: 21px;
  border: none;
  color: rgb(41, 41, 41);
  font-weight: bold;
  border-bottom: 1px solid rgba(88, 115, 254, 1);
  background-color: transparent;

  &::placeholder {
    color: rgba(119, 116, 116, 0.786);
    font-size: 16px;
    font-weight: 600;
  }

  &:focus {
    outline: none;
  }
`;

const StDateWrapper = styled.div`
  width: 100%;

  &&.ant-picker-dropdown .ant-picker-panels > .ant-picker-panel:nth-of-type(1) {
    display: none !important;
  }
`;

const GroupWriteInput = styled.input`
  width: 100%;
  height: 44px;
  padding-right: 50px;
  border-radius: 7px;
  background-color: #f5f5f5;
  border: none;

  &:focus {
    outline: none;
  }
`;

const PlaceInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SubmitButton = styled.button`
  border: none;
  background-color: transparent;
  color: rgba(88, 115, 254, 1);
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  margin-right: 20px;
`;

const BackButton = styled.button`
  margin-left: 20px;
`;

const WriteImageWrapper = styled.div`
  width: 100%;
`;

const ThumbedImage = styled.img`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  border-radius: 7px;
`;

const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
`;

const PlaceResult = styled.div`
  margin-left: 5px;
  margin-top: 15px;
  height: 30px;
  display: inline-flex;
  background-color: #5873fe;
  border-radius: 20px;
  color: #fff;
  padding: 8px 8px 8px 10px;
  font-size: 14px;
  align-items: center;
  gap: 4px;
`;

const PlaceRemoveButton = styled.button`
  padding-top: 2px;
  align-items: center;
  border: none;
  background-color: transparent;
`;

const PlaceAddButton = styled.button`
  position: absolute;
  top: 30%;
  right: 10px;
  transform: translateY(-50%);
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
`;
