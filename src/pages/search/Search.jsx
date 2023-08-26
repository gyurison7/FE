import React, { useEffect, useState } from 'react';
import { DateInput } from '../group/styleContainer';
import DatePicker from '../../components/common/modal/DatePicker.jsx';
import Footer from '../../layout/footer/Footer';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateModal, setDateModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const navigate = useNavigate();
  console.log(searchData);

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
      return response.data;
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
          setSearchData(data.searchDateData);
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

  const groupedData = groupByStartDate(searchData);
  const sortedEntries = Object.entries(groupedData).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  return (
    <SearchPage>
      <header>검색</header>
      <div>
        <DateInput
          value={startDate && endDate ? `${startDate} ~ ${endDate}` : ''}
          onClick={() => setDateModal(!isDateModal)}
          placeholder='추억을 나눈 날짜를 설정해주세요'
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
    color: rgba(83, 83, 83, 1);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const ThumbnailWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ThumbNail = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
`;
