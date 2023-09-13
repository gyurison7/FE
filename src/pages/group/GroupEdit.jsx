import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index.jsx';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import Input from '../../components/common/input/Input.jsx';
import FriendSearchModal from '../../components/common/modal/NicknameModal.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import {
  BackButton,
  DateInput,
  DateInputWraper,
  DivHeaderText,
  ErrorText,
  Form,
  FriendSearchButton,
  FriendSearchInput,
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
  TitleWraper,
  WordCount,
  WriteBody,
  WriteHeader,
  WriteImageWrapper,
} from './styleContainer.js';
import DatePicker from '../../components/common/modal/DatePicker.jsx';
import { useMutation, useQueryClient } from 'react-query';
import { editGroup } from '../../api/groupMainApi.js';
import { useToast } from '../../hooks/useToast.jsx';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner.jsx';
import { debounce } from '../../hooks/debounce.js';
import { fetchNickname } from '../../api/searchApi.js';

function GroupWrite() {
  const storedUserId = localStorage.getItem('userId');
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    api.get(`group/${id}`, { withCredentials: true }).then((res) => {
      setGroupName(res.data.groupName);
      const formattedStartDate = res.data.startDate.slice(0, 10);
      const formattedEndDate = res.data.endDate.slice(0, 10);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      const filteredFriends = res.data.participants.filter(
        (participant) => participant.userId !== Number(storedUserId)
      );
      setSelectedFriends(filteredFriends);
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

  //error state
  const [groupNameError, setGroupNameError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [placeError, setPlaceError] = useState(false);

  const debounceNicknameSearch = useCallback(
    debounce(async (searchAlbum) => {
      setHasSearched(false);
      try {
        const data = await fetchNickname(searchAlbum);
        setSearchResult(data.findByNicknameData);
        setHasSearched(true);
      } catch (error) {
        console.error('Error fetching data by album:', error);
        setHasSearched(true);
      }
    }, 600),
    []
  );

  console.log('parti', selectedFriends);

  //데이터 보내는 로직
  const queryClient = useQueryClient();

  const mutation = useMutation(editGroup, {
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries('groupList');
      navigate('/groupmain');
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setGroupNameError(false);
    setThumbnailError(false);
    setDateError(false);
    setPlaceError(false);

    let validationPassed = true;

    if (!groupName) {
      setGroupNameError(true);
      validationPassed = false;
    }

    if (!thumbnailUrl) {
      setThumbnailError(true);
      validationPassed = false;
    }

    if (!startDate || !endDate) {
      setDateError(true);
      validationPassed = false;
    }

    if (!places || places.length === 0) {
      setPlaceError(true);
      validationPassed = false;
    }

    if (!validationPassed) return;

    const payload = {};

    if (chosenFile) {
      payload.thumbnailUrl = '';
    } else if (thumbnailUrl) {
      payload.thumbnailUrl = thumbnailUrl;
    }

    payload.groupName = groupName;
    payload.place = JSON.stringify(places);
    payload.participant = JSON.stringify(
      selectedFriends.map((friend) => friend.userId.toString())
    );
    payload.startDate = startDate;
    payload.endDate = endDate;

    mutation.mutate({ data: payload, id, chosenFile });

  };

  const placeEnterAdd = (e) => {
    if (e.key === 'Enter' && place.trim() !== '') {
      placeButtonHandler(e);
      e.preventDefault();
    }
  };

  const preventForceBack = (e) => {
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
        if (value.length <= 25) {
          setGroupName(value);
        }
        break;
      case 'place':
        setPlace(value);
        break;
      case 'participants':
        setParticipant(value);
        debounceNicknameSearch(value);
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

  const placeButtonHandler = (e) => {
    e.preventDefault();
    const newPlaces = place;
    if (places.includes(place)) {
      showToast('이미 추가하신 장소 입니다');
      return;
    }
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

  return (
    <>
      <Form onSubmit={submitHandler} onKeyPress={preventForceBack}>
        {mutation.isLoading ? <LoadingSpinner /> : null}
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
          <TitleWraper>
            <Input
              color='#4C4C4C'
              theme='underLine'
              name='groupName'
              type='text'
              value={groupName}
              placeholder='앨범 이름을 입력해주세요'
              onChange={universalHandler}
              required
            />
            <WordCount>{groupName.length}/25</WordCount>
            {groupNameError && <ErrorText>앨범 이름을 입력해주세요</ErrorText>}
          </TitleWraper>
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
            {thumbnailError && <ErrorText>썸네일을 추가해주세요</ErrorText>}
          </WriteImageWrapper>
          <StDateWrapper>
            <DivHeaderText>함께한 추억 기간 </DivHeaderText>
            <DateInputWraper>
              <img
                className='inputIcon'
                src={`${process.env.PUBLIC_URL}/assets/image/calander.png`}
                alt='calander'
              />
              <DateInput
                value={startDate && endDate ? `${startDate} ~ ${endDate}` : ''}
                onClick={() => setDateModal(!isDateModal)}
                placeholder='추억을 나눈 날짜를 설정해주세요'
                readOnly
              />
            </DateInputWraper>
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
            {dateError && <ErrorText>날짜를 설정해주세요</ErrorText>}
          </StDateWrapper>
          <PlaceContainer>
            <DivHeaderText>함께한 추억 장소</DivHeaderText>
            <PlaceInputWrapper>
              <img
                className='inputIcon'
                src={`${process.env.PUBLIC_URL}/assets/image/locationicon.png`}
                alt='calander'
              />
              <GroupWriteInput
                name='place'
                placeholder='추억을 나눈 장소를 입력해주세요'
                value={place}
                onChange={universalHandler}
                onKeyPress={placeEnterAdd}
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
                <PlaceRemoveButton
                  type='button'
                  onClick={() => deletePlaceHandler(index)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/image/cancleplace.png`}
                    alt='left'
                  />
                </PlaceRemoveButton>
              </PlaceResult>
            ))}
            {placeError && <ErrorText>추억장소를 추가해주세요</ErrorText>}
          </PlaceContainer>
          <div style={{ width: '100%' }}>
            <DivHeaderText>함께한 친구들 </DivHeaderText>
            <FriendSearchButton onClick={() => setModalOpen(!isModalOpen)}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/friendsearchicon.png`}
                alt='left'
              />
              <FriendSearchInput placeholder='추억을 나눈 친구를 검색해주세요' />
            </FriendSearchButton>
            {isModalOpen && (
              <FriendSearchModal
                ismodalopen={isModalOpen}
                onClose={() => setModalOpen(false)}
                universalHandler={universalHandler}
                searchResult={searchResult}
                addFriendHandler={addFriendHandler}
                participants={participants}
                hasSearched={hasSearched}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {selectedFriends &&
              selectedFriends
                .filter((item) => item.userId !== Number(storedUserId))
                .map((item) => (
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
                ))}
          </div>
        </WriteBody>
      </Form>
    </>
  );
}

export default GroupWrite;
