import React, { useState } from 'react';
import { DateInput } from '../group/styleContainer';
import DatePicker from '../../components/common/modal/DatePicker.jsx';
import Footer from '../../layout/footer/Footer';
import { styled } from 'styled-components';

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateModal, setDateModal] = useState(false);

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
