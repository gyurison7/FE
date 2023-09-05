import React, { useCallback, useState } from 'react';
import { DateInput, DateInputWraper } from '../group/styleContainer';
import DatePicker from '../../components/common/modal/DatePicker.jsx';
import Footer from '../../layout/footer/Footer';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchResult } from '../../recoil/Atom';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import SearchDate from './SearchDate.jsx';
import PlaceResults from './SearchPlace.jsx';
import AlbumResults from './SearchAlbum.jsx';
import NoSearch from '../../components/common/nosearchresult/NoSearch.jsx';

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isDateModal, setDateModal] = useState(false);
  const [searchPlace, setSearchPlace] = useState('');
  const [searchAlbum, setSearchAlbum] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputPlaceholder, setInputPlaceholder] =
    useState('추억을 나눈 날짜를 설정해주세요');
  const [inputIcon, setInputIcon] = useState(
    `${process.env.PUBLIC_URL}/assets/image/calander.png`
  );
  const [activeNav, setActiveNav] = useState({
    date: true,
    album: false,
    place: false,
  });
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const navigate = useNavigate();
  const setSearchResult = useSetRecoilState(SearchResult);
  const searchResult = useRecoilValue(SearchResult);

  const getdayNames = (dateStr) => {
    const dateObj = new Date(dateStr);
    const dayIndex = dateObj.getDay();
    return dayNames[dayIndex];
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (activeNav.place) {
      setSearchPlace(value);
      debouncedPlaceSearch(value);
    } else if (activeNav.album) {
      setSearchAlbum(value);
      debouncedAlbumSearch(value);
    }
  };

  const handleNavClick = (navName) => {
    setSearchResult([]);
    setStartDate(null);
    setEndDate(null);
    setSearchAlbum('');
    setSearchPlace('');
    setHasSearched(false);

    setActiveNav({
      date: navName === 'date',
      album: navName === 'album',
      place: navName === 'place',
    });

    if (navName === 'date') {
      setInputValue(startDate && endDate ? `${startDate} ~ ${endDate}` : '');
      setInputPlaceholder('추억을 나눈 날짜를 설정해주세요');
      setInputIcon(`${process.env.PUBLIC_URL}/assets/image/calander.png`);
    } else if (navName === 'album') {
      setInputPlaceholder('앨범명을 입력해주세요');
      setInputValue(searchAlbum);
      setInputIcon(null);
    } else if (navName === 'place') {
      setInputValue(searchPlace);
      setInputPlaceholder('장소를 입력해주세요');
      setInputIcon(null);
    }
  };
  console.log('result', searchResult);
  const fetchGroupByDate = async (searchDate) => {
    try {
      const response = await api.get(`/group/search/date/${searchDate}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchGroupByPlace = async (place) => {
    console.log(`Fetching data for place: ${place}`);
    try {
      const response = await api.get(`/group/search/place/${place}`, {
        withCredentials: true,
      });
      console.log(`Success fetching data for place: ${place}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for place: ${place}`, error);
      throw error;
    }
  };

  const fetchGroupByAlbum = async (searchGroup) => {
    try {
      const response = await api.get(`/group/search/groupName/${searchGroup}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const debouncedPlaceSearch = useCallback(
    debounce(async (searchPlace) => {
      setHasSearched(false);
      try {
        const data = await fetchGroupByPlace(searchPlace);
        setSearchResult(data.searchPlaceData);
        setHasSearched(true);
      } catch (error) {
        console.error('Error fetching data by place:', error);
        setHasSearched(true);
      }
    }, 600),
    []
  );

  const debouncedAlbumSearch = useCallback(
    debounce(async (searchAlbum) => {
      setHasSearched(false);
      try {
        const data = await fetchGroupByAlbum(searchAlbum);
        setSearchResult(data.searchGroupNameData);
        setHasSearched(true);
      } catch (error) {
        console.error('Error fetching data by album:', error);
        setHasSearched(true);
      }
    }, 600),
    []
  );

  const groupByStartDate = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.startDate]) {
        acc[item.startDate] = [];
      }
      acc[item.startDate].push(item);
      return acc;
    }, {});
  };

  // 날짜검색할때
  const searchHandler = async () => {
    setHasSearched(false);
    try {
      if (!activeNav.date) return;

      const searchDate = `${startDate}~${endDate}`;
      const data = await fetchGroupByDate(searchDate);

      setSearchResult(data.searchDateData);
      console.log('data', data);
      setHasSearched(true);
    } catch (error) {
      console.log('Error:', error);
      setHasSearched(true);
    }
  };

  const groupedData = groupByStartDate(searchResult);
  const sortedEntries = Object.entries(groupedData).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  return (
    <SearchPage>
      <Top>
        <IconComponents
          iconType='vectorLeft'
          stroke='#4C4C4C'
          onClick={() => navigate(-1)}
        />
        <Title>
          <span>검색</span>
        </Title>
        <div></div>
      </Top>
      <InputWrapper>
        <DateInputWraper width='90%'>
          {activeNav.date && (
            <img className='inputIcon' src={inputIcon} alt='input icon' />
          )}
          <DateInput
            value={
              activeNav.date
                ? inputValue
                : activeNav.album
                ? searchAlbum
                : searchPlace
            }
            onClick={() => activeNav.date && setDateModal(!isDateModal)}
            placeholder={inputPlaceholder}
            onChange={handleInputChange}
            readOnly={activeNav.date ? true : false}
            paddingleft={activeNav.album || activeNav.place ? '12px' : undefined}
          />
        </DateInputWraper>
      </InputWrapper>
      <NavBar>
        <NavButton
          active={activeNav.date ? 'true' : undefined}
          onClick={() => handleNavClick('date')}
        >
          날짜
        </NavButton>
        <NavButton
          active={activeNav.album ? 'true' : undefined}
          onClick={() => handleNavClick('album')}
        >
          앨범
        </NavButton>
        <NavButton
          active={activeNav.place ? 'true' : undefined}
          onClick={() => handleNavClick('place')}
        >
          장소
        </NavButton>
      </NavBar>
      <div>
        {isDateModal && (
          <DatePicker
            ismodalopen={isDateModal}
            onClose={() => setDateModal(false)}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onSearchClick={searchHandler}
          />
        )}
      </div>
      <div>
        {hasSearched && (
          <>
            {activeNav.date &&
              (sortedEntries.length > 0 ? (
                sortedEntries.map(([date, items]) => {
                  const slicedDate = date.slice(0, 10);
                  const day = getdayNames(slicedDate);
                  return (
                    <SearchDate
                      key={date}
                      slicedDate={slicedDate}
                      day={day}
                      items={items}
                      navigate={navigate}
                      onChange={searchHandler}
                    />
                  );
                })
              ) : (
                <NoSearch />
              ))}

            {activeNav.place &&
              (sortedEntries.length > 0 ? (
                sortedEntries.map(([date, items]) => {
                  const slicedDate = date.slice(0, 10);
                  const day = getdayNames(slicedDate);
                  return (
                    <PlaceResults
                      key={date}
                      slicedDate={slicedDate}
                      day={day}
                      items={items}
                      navigate={navigate}
                      onChange={searchHandler}
                    />
                  );
                })
              ) : (
                <NoSearch />
              ))}

            {activeNav.album &&
              (searchResult.length > 0 ? (
                <AlbumResults items={searchResult} navigate={navigate} />
              ) : (
                <NoSearch />
              ))}
          </>
        )}
      </div>
      <FootWraper>
        <Footer />
      </FootWraper>
    </SearchPage>
  );
}

export default React.memo(Search);

const SearchPage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60px;
  background-color: white;
`;

const FootWraper = styled.div`
  position: fixed;
  bottom: 0;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 50px 5px 20px;
`;

const Title = styled.div`
  text-align: center;
  span {
    color: #4c4c4c;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  p {
    color: #c3c3c3;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 15px;
  padding-top: 12px;
`;

const NavBar = styled.div`
  width: 100%;
  display: flex;
  padding-left: 23px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dddddd;
`;

const NavButton = styled.button`
  width: 59px;
  height: 31px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  color: #c2c2c2;

  border-bottom: ${(props) => (props.active ? ' 1px solid #5873FE;' : 'none')};
  color: ${(props) => (props.active ? '#5873FE' : '#C2C2C2')};
`;
