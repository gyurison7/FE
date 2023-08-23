import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index.jsx';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import Input from '../../components/common/input/Input.jsx';
import FriendSearchModal from '../../components/common/modal/NicknameModal.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import {
  BackButton,
  DateInput,
  DivHeaderText,
  Form,
  FriendContentWrap,
  FriendSearchButton,
  FriendSearchImage,
  FriendSearchText,
  GroupWriteInput,
  ImageInput,
  PlaceAddButton,
  PlaceContainer,
  PlaceInputWrapper,
  PlaceRemoveButton,
  PlaceResult,
  ProfileImage,
  SelectFrindRemover,
  SelectFrindWrapper,
  StDateWrapper,
  SubmitButton,
  ThumbedImage,
  ThumbnailWrapper,
  WriteBody,
  WriteHeader,
  WriteImageWrapper,
} from './styleContainer.js';
import DatePicker from '../../components/common/modal/DatePicker.jsx';

function GroupWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    api.get(`group/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setGroupName(res.data.groupName);
      const formattedStartDate = res.data.startDate.slice(0, 10);
      const formattedEndDate = res.data.endDate.slice(0, 10);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      setSelectedFriends(res.data.participants);
      setThumbnailUrl(res.data.thumbnailUrl);
      if (res.data.place) {
        const placesArray = JSON.parse(res.data.place);
        setPlaces(placesArray);
      }
    });
  }, []);

  const [groupName, setGroupName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [place, setPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participants, setParticipant] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const [chosenFile, setChosenFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDateModal, setDateModal] = useState(false);

  console.log(selectedFriends);

  console.log('starDate', startDate);
  console.log('endDate', endDate);

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
    const data = new FormData();
    if (chosenFile) {
      data.append('thumbnailUrl', chosenFile);
    } else if (thumbnailUrl) {
      data.append('thumbnailUrl', thumbnailUrl);
    }
    data.append('groupName', groupName);
    data.append('place', JSON.stringify(places));
    data.append(
      'participant',
      JSON.stringify(selectedFriends.map((friend) => friend.userId.toString()))
    );
    data.append('startDate', startDate);
    data.append('endDate', endDate);

    try {
      const response = await api.put(`/group/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(response.data);
      navigate('/groupmain');
    } catch (error) {
      console.error('Error sending group data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  //이미지 처리하는 로직
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setChosenFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
      };

      reader.readAsDataURL(file);
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
      case 'participants':
        setParticipant(value);
        searchUser(value);
        break;
      default:
        break;
    }
  };

  const deletePlaceHandler = (indexToDelete) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((_, index) => index !== indexToDelete)
    );
  };

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

  const isUserSelected = (userId) => {
    return selectedFriends.some((friend) => friend.userId === userId);
  };

  return (
    <>
      <Form onSubmit={submitHandler} onKeyPress={handleKeyPress}>
        <WriteHeader>
          <div>
            <BackButton onClick={backButtonHandler}>
              <IconComponents iconType='vectorLeft' stroke='#4C4C4C' />
            </BackButton>
          </div>
          <div>앨범 수정하기</div>
          <div>
            <SubmitButton type='submit'>완료</SubmitButton>
          </div>
        </WriteHeader>

        <WriteBody>
          <Input
            color='#4C4C4C'
            theme='underLine'
            name='groupName'
            type='text'
            value={groupName}
            placeholder='앨범 이름을 입력해주세요'
            onChange={universalHandler}
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
          <StDateWrapper>
            <DivHeaderText>함께한 추억 기간 </DivHeaderText>
            <DateInput
              value={
                startDate && endDate
                  ? `${startDate} ~ ${endDate}`
                  : ''
              }
              onClick={() => setDateModal(!isDateModal)}
              readOnly
            />
            {isDateModal && (
              <DatePicker
                ismodalopen={isDateModal}
                onClose={() => setDateModal(false)}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            )}
          </StDateWrapper>
          <PlaceContainer>
            <DivHeaderText>함께한 추억 장소</DivHeaderText>
            <PlaceInputWrapper>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/locationicon.png`}
                alt='placeicon'
                className='inputIcon'
              />
              <GroupWriteInput
                name='place'
                placeholder='추억을 나눈 장소를 입력해주세요'
                value={place}
                onChange={universalHandler}
              />
              {place && (
                <PlaceAddButton className='button' onClick={placeButtonHandler}>
                  추가
                </PlaceAddButton>
              )}
            </PlaceInputWrapper>
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
          </PlaceContainer>
          <div style={{ width: '100%' }}>
            <DivHeaderText>함께한 친구들 </DivHeaderText>
            <FriendSearchButton onClick={() => setModalOpen(!isModalOpen)}>
              <FriendContentWrap>
                <FriendSearchImage
                  src={`${process.env.PUBLIC_URL}/assets/image/friendsearchicon.png`}
                  alt='search'
                />
                <FriendSearchText>
                  {' '}
                  추억을 나눈 친구를 검색해주세요{' '}
                </FriendSearchText>
              </FriendContentWrap>
            </FriendSearchButton>
            {isModalOpen && (
              <FriendSearchModal
                ismodalopen={isModalOpen}
                onClose={() => setModalOpen(false)}
                universalHandler={universalHandler}
                isUserSelected={isUserSelected}
                searchResult={searchResult}
                addFriendHandler={addFriendHandler}
                participants={participants}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {selectedFriends &&
              selectedFriends.map((item) => {
                return (
                  <SelectFrindWrapper key={item.userId}>
                    <ProfileImage src={item.profileUrl} alt={item.nickname} />
                    <p> {item.nickname} </p>
                    <SelectFrindRemover
                      onClick={() => removeFriendHandler(item.userId)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/image/friendremover.png`}
                        alt='remover'
                      />
                    </SelectFrindRemover>
                  </SelectFrindWrapper>
                );
              })}
          </div>
        </WriteBody>
      </Form>
    </>
  );
}

export default GroupWrite;
