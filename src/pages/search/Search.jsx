import React, { useEffect, useState } from 'react';
import { DateInput, DateInputWraper } from '../group/styleContainer';
import DatePicker from '../../components/common/modal/DatePicker.jsx';
import Footer from '../../layout/footer/Footer';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchResult } from '../../recoil/Atom'; 

import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateModal, setDateModal] = useState(false);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const navigate = useNavigate();
  const setSearchResult = useSetRecoilState(SearchResult);
  const searchResult = useRecoilValue(SearchResult);
  console.log(searchResult);

  const getdayNames = (dateStr) => {
    const dateObj = new Date(dateStr);
    const dayIndex = dateObj.getDay();
    return dayNames[dayIndex];
  };

  const fetchGroupByDate = async (searchDate) => {
    try {
      const response = await api.get(`/group/search/${searchDate}`, {
        withCredentials: true,
      });
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const searchDate = `${startDate}~${endDate}`;
    if (startDate && endDate) {
      fetchGroupByDate(searchDate)
        .then((data) => {
          setSearchResult(data.searchDateData);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, [startDate, endDate]);

  const groupByStartDate = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.startDate]) {
        acc[item.startDate] = [];
      }
      acc[item.startDate].push(item);
      return acc;
    }, {});
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
          <IconComponents iconType='date' stroke='#4C4C4C' className='inputIcon' />
          <DateInput
            value={startDate && endDate ? `${startDate} ~ ${endDate}` : ''}
            onClick={() => setDateModal(!isDateModal)}
            placeholder='추억을 나눈 날짜를 설정해주세요'
            readOnly
          />
        </DateInputWraper>
      </InputWrapper>
      <div>
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
      </div>
      <div>
        {sortedEntries.map(([date, items]) => {
          const slicedDate = date.slice(0, 10);
          const day = getdayNames(slicedDate);

          return (
            <SearchResutContainer key={date}>
              <p>{`${slicedDate} (${day})`}</p>
              <ThumbnailWrapper>
                {items.map((item) => (
                  <ThumbNail
                    key={item.groupId}
                    src={item.thumbnailUrl}
                    alt='thumbnail'
                    onClick={() => navigate(`/postmain/${item.groupId}`)}
                  />
                ))}
              </ThumbnailWrapper>
            </SearchResutContainer>
          );
        })}
      </div>
      <FootWraper>
        <Footer />
      </FootWraper>
    </SearchPage>
  );
}

export default Search;

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
const SearchResutContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  p {
    padding-left: 20px;
    padding-top: 12px;
    color: rgba(83, 83, 83, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const ThumbnailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 12px;
`;

const ThumbNail = styled.img`
  flex: 1;
  cursor: pointer;
  max-width: calc(
    33.3333% - 2px
  );
  margin: 1px;
  height: 125px;
  object-fit: cover;

  &:hover {
    transform: scale(1.1); 
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
  padding-bottom: 14px;
  padding-top: 12px;
  border-bottom: 1px solid #ddd;
`;
