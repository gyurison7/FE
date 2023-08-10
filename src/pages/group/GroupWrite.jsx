import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';
import { DatePicker } from 'antd';
import moment from 'moment';

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

  console.log('-------------------');
  console.log('groupName', groupName);
  console.log('place', places);
  console.log('startDate', startDate);
  console.log('endDate', endDate);
  console.log('participants', selectedFriends);
  console.log('image', thumbnailUrl);
  console.log('searchResult', searchResult);
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
  const submitHandler = async () => {
    const payload = {
      groupName: groupName,
      thumbnailUrl:
        'https://assets.weforum.org/article/image/responsive_large_webp_ns5Qu2SktVwSiHNWgMsKjEucTivc9vfJYYa7lW63NNA.webp',
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

  //이미지 처리한는 로직
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('thumpnail', file);

      try {
        const result = await api.post(''.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const tumbnail_URL = result.data.url;
        setThumbnailUrl(tumbnail_URL);
      } catch (error) {
        console.log('upload failed');
      }
    };
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
    setSelectedFriends((prevfri) =>
      prevfri.filter((item) => item.userId !== id)
    );
  };

  const isUserSelected = (loginId) => {
    return selectedFriends.some((friend) => friend.loginId === loginId);
  };

  return (
    <>
      <StWriteHeader>
        <div>
          <button onClick={backButtonHandler}>back</button>
        </div>
        <div>구룹 만들기</div>
        <div>
          <button onClick={submitHandler}>확인</button>
        </div>
      </StWriteHeader>

      <StWriteBody>
        <div>
          <StGroupInput
            theme="underLine"
            name="groupName"
            type="text"
            value={groupName}
            placeholder="그룹 이름을 입력해주세요"
            onChange={universalHandler}
          />
        </div>
        <StThumbNail onClick={imageHandler}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/image/photo.png`}
            alt="thumbnail"
          />
          <p> 썸네일 추가하기</p>
        </StThumbNail>
        함께한 추억 장소
        <PlaceInputWrapper>
          <GroupWriteInput
            name="place"
            placeholder="장소"
            value={place}
            onChange={universalHandler}
          />
          {place && (
            <button className="button" onClick={placeButtonHandler}>
              {' '}
              추가
            </button>
          )}
        </PlaceInputWrapper>
        <ul>
          {places.map((place, index) => (
            <li key={index}>
              {place}
              <button onClick={() => deletePlaceHandler(index)}>삭제</button>
            </li>
          ))}
        </ul>
        함께한 추억 기간
        <StDateWrapper>
          <DatePicker.RangePicker
            className="my-picker"
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
        함께한 친구들
        <div>
          <GroupWriteInput
            name="participants"
            placeholder="친구 아이디"
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
                  <StProfileImage src={item.profileUrl} alt={item.nickname} />
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
      </StWriteBody>
    </>
  );
}

export default GroupWrite;

const StWriteHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  background-color: #f8f8f8;
  align-items: center;
`;

const StWriteBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: scroll;
`;

const StProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
`;

const StThumbNail = styled.button`
  width: 100%;
  height: 20vh;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 12px;

  img {
    height: 40px;
    margin-bottom: 5px;
  }

  p {
    color: #707070;
  }
`;

const StGroupInput = styled.input`
  width: 100%;
  padding: 15px 60px 15px 0px;
  font-size: 20px;
  line-height: 21px;
  border: none;
  color: rgb(41, 41, 41);
  font-weight: bold;
  border-bottom: 1px solid black;
  background-color: transparent;

  &::placeholder {
    color: rgba(119, 116, 116, 0.786);
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

  .button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background-color: #f5f5f5;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    background-color: #e0e0e0;
  }
`;
