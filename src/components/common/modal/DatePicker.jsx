import React, { useState, useEffect } from 'react';
import { css, keyframes, styled } from 'styled-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const el = document.getElementById('portal-root');
  return ReactDOM.createPortal(children, el);
};

function DatePicker({
  ismodalopen,
  onClose, 
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Determine the initial year and month either from startDate, endDate, or the current date
  const initialYear = startDate
    ? new Date(startDate).getFullYear()
    : endDate
    ? new Date(endDate).getFullYear()
    : currentYear;
  const initialMonth = startDate
    ? new Date(startDate).getMonth()
    : endDate
    ? new Date(endDate).getMonth()
    : currentMonth;

  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [days, setDays] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const startDay = new Date(selectedYear, selectedMonth, 1).getDay() || 7;

    const daysArray = Array(daysInMonth + startDay - 1)
      .fill(null)
      .map((_, index) => (index >= startDay - 1 ? index - startDay + 2 : null));
    setDays(daysArray);
  }, [selectedYear, selectedMonth]);

  const handleDayClick = (day) => {
    const clickedDate = new Date(selectedYear, selectedMonth, day);

    if (
      !startDate ||
      (startDate && endDate) ||
      formatDate(clickedDate) === startDate
    ) {
      setStartDate(formatDate(clickedDate));
      setEndDate(null);
    } else if (new Date(clickedDate) < new Date(startDate)) {
      setStartDate(formatDate(clickedDate));
    } else if (new Date(clickedDate) > new Date(startDate)) {
      setEndDate(formatDate(clickedDate));
    }
  };

  const isBetween = (day) => {
    const currentDate = new Date(selectedYear, selectedMonth, day);
    if (startDate && endDate) {
      return currentDate > new Date(startDate) && currentDate < new Date(endDate);
    }
    return false;
  };

  const onResetHandler = () => {
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setStartDate(null);
    setEndDate(null);
  };

  const applyHandler = () => {
    onClose();
  };

  return (
    <Portal>
      <DatePickerWrap isopen={ismodalopen}>
        <ModalButtonWrapper>
          <ModalButton onClick={onClose}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/line.png`}
              alt='line'
            />
          </ModalButton>
        </ModalButtonWrapper>
        <Header>
          <MonthContainer>
            <MonthSelector
              value={selectedYear}
              onChange={(e) => setSelectedYear(+e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </MonthSelector>
          </MonthContainer>
          <YearContainer>
            <YearSelector
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(+e.target.value)}
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </YearSelector>
          </YearContainer>
        </Header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
          }}
        >
          {dayNames.map((dayName) => (
            <div
              key={dayName}
              style={{
                fontWeight: 'bold',
                padding: '8px',
                border: '1px solid gray',
                background: '#e0e0e0',
              }}
            >
              {dayName}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              id={
                startDate && day === new Date(startDate).getDate()
                  ? 'selectedDate'
                  : ''
              }
              style={{
                padding: '8px',
                border: '1px solid gray',
                background:
                  (startDate &&
                    day === new Date(startDate).getDate() &&
                    selectedYear === new Date(startDate).getFullYear() &&
                    selectedMonth === new Date(startDate).getMonth()) ||
                  (endDate &&
                    day === new Date(endDate).getDate() &&
                    selectedYear === new Date(endDate).getFullYear() &&
                    selectedMonth === new Date(endDate).getMonth())
                    ? 'lightblue'
                    : isBetween(day)
                    ? 'lightyellow'
                    : 'white',
                cursor: day ? 'pointer' : 'default',
              }}
              onClick={() => day && handleDayClick(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <div>
          <button onClick={onResetHandler}> 초기회하기 </button>
          <button onClick={applyHandler}> 적용하기</button>
        </div>
      </DatePickerWrap>
    </Portal>
  );
}

export default DatePicker;

const shouldForwardProp = (prop) => !['isopen'].includes(prop);
const DatePickerWrap = styled.div.withConfig({ shouldForwardProp })`
  padding: 16.9px;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: ${({ isopen }) => (isopen ? '-32%' : '-100%')};
  background-color: #fff;
  padding: 1rem;
  z-index: 10;
  transition: bottom 0.4s ease-out;
  animation: ${({ isopen }) =>
    isopen
      ? css`
          ${slideUp} 0.8s
        `
      : css`
          ${slideDown} 1s
        `};
  height: 100%;
  border-radius: 30px;
  box-shadow: 0px -10px 14px 0px rgba(199, 199, 199, 0.25);
  overflow: scroll;
`;

const slideUp = keyframes`
    0% {
      bottom: -100%;
    }
    100% {
      bottom: -32%;
    }
    `;

const slideDown = keyframes`
    from {
      bottom: -32%;
    }
    to {
      bottom: -100%;
    }
    `;

const Header = styled.div`
  display: flex;
  margin-bottom: 8px;
  gap: 16px;
`;

const MonthContainer = styled.div`
  width: 50%;
  height: 35px;
`;
const YearContainer = styled.div`
  width: 50%;
`;

const MonthSelector = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  padding: 8px;
`;
const YearSelector = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  padding: 8px;
`;

const ModalButton = styled.button`
  border: none;
  background-color: transparent;
  align-items: center;
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

DatePicker.propTypes = {
  onClose: PropTypes.func,
  ismodalopen: PropTypes.bool,
  startDate: PropTypes.string, 
  setStartDate: PropTypes.func,
  endDate: PropTypes.string, 
  setEndDate: PropTypes.func,
};

DatePicker.defaultProps = {
  startDate: null,
  endDate: null,
};
