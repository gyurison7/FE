import React, { useState, useEffect } from 'react';
import { css, keyframes, styled } from 'styled-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { useToast } from '../../../hooks/useToast.jsx';

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
  onSearchClick,
}) {
  const { showToast } = useToast();
  useEffect(() => {
    if (ismodalopen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [ismodalopen]);

  const handleStop = (e, data) => {
    if (data.y > 100) {
      onClose();
    }
  };

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
    if (!startDate && !endDate) {
      showToast('시작 날짜와 종료 날짜를 설정해주세요');
      return;
    }

    if (startDate && !endDate) {
      showToast('종료날짜도 설정해주세요');
      return;
    }
    onSearchClick?.();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <Portal>
      <Overlay onClick={handleOverlayClick} />
      <Draggable
        axis='y'
        bounds={{ top: 0 }}
        handle='.drag-handle'
        onStop={(e, data) => handleStop(e, data)}
      >
        <DatePickerWrap isopen={ismodalopen}>
        <div
            style={{
              width: '100%',
              padding: '6px',
            }}
            className='drag-handle'
          >
          </div>
          <ModalButtonWrapper >
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
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(+e.target.value)}
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </MonthSelector>
            </MonthContainer>
            <YearContainer>
              <YearSelector
                value={selectedYear}
                onChange={(e) => setSelectedYear(+e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </YearSelector>
            </YearContainer>
          </Header>
          <DaysNameWrapper>
            {dayNames.map((dayName) => (
              <DaysName key={dayName}>{dayName}</DaysName>
            ))}
          </DaysNameWrapper>
          <DaysWrapper>
            {days.map((day, index) => (
              <ButtonDays
                key={index}
                id={
                  startDate && day === new Date(startDate).getDate()
                    ? 'selectedDate'
                    : ''
                }
                day={day}
                startdate={startDate}
                enddate={endDate}
                selectedyear={selectedYear}
                selectedmonth={selectedMonth}
                isbetween={String(isBetween(day))}
                onClick={() => day && handleDayClick(day)}
              >
                <span className='dateText'>{day}</span>
              </ButtonDays>
            ))}
          </DaysWrapper>
          <Footer>
            <FotterButton onClick={onResetHandler} color='rgba(148, 163, 184, 1)'>
              {' '}
              초기화하기{' '}
            </FotterButton>
            <FotterButton onClick={applyHandler} color='rgba(88, 115, 254, 1)'>
              {' '}
              적용하기
            </FotterButton>
          </Footer>
        </DatePickerWrap>
      </Draggable>
    </Portal>
  );
}

export default DatePicker;
// props 경고창 해결
const customProps = [
  'day',
  'startdate',
  'enddate',
  'selectedyear',
  'selectedmonth',
  'isbetween',
];
const filterProps = (prop) => !customProps.includes(prop);

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
`;

// styled-component
const shouldForwardProp = (prop) => !['isopen'].includes(prop);
const DatePickerWrap = styled.div.withConfig({ shouldForwardProp })`
  @media (max-width: 428px) {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
  @media (min-width: 429px) {
    width: 428px;
    height: 100vh;
    margin: 0 auto;
  }
  padding: 16.9px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ isopen }) => (isopen ? '-25%' : '-100%')};
  background-color: #fff;
  padding: 1rem;
  z-index: 10;
  transition: bottom 0.1s ease-in;
  animation: ${({ isopen }) =>
    isopen
      ? css`
          ${slideUp} 0.8s
        `
      : css`
          ${slideDown} 1s
        `};
  height: 100%;
  border-radius: 30px 30px 0 0;
  box-shadow: 0px -10px 14px 0px rgba(199, 199, 199, 0.25);
`;

const slideUp = keyframes`
    0% {
      bottom: -100%;
    }
    100% {
      bottom: -25%;
    }
    `;

const slideDown = keyframes`
    from {
      bottom: -25%;
    }
    to {
      bottom: -100%;
    }
    `;

const Header = styled.div`
  display: flex;
  margin-top: 14px;
  margin-bottom: 8px;
  gap: 16px;
`;

const YearContainer = styled.div`
  width: 50%;
  height: 35px;
`;
const MonthContainer = styled.div`
  width: 50%;
`;

const YearSelector = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  padding: 8px;
`;
const MonthSelector = styled.select`
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
  padding-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

DatePicker.defaultProps = {
  startDate: null,
  endDate: null,
};

// days button
const isSelected = (day, date, selectedyear, selectedmonth) =>
  date &&
  day === new Date(date).getDate() &&
  selectedyear === new Date(date).getFullYear() &&
  selectedmonth === new Date(date).getMonth();

const ButtonDays = styled('button').withConfig({
  shouldForwardProp: filterProps,
})`
  cursor: ${({ day }) => (day ? 'pointer' : 'default')};
  width: 100%;
  height: 6vh;
  border: none;
  background: ${({
    day,
    startdate,
    enddate,
    selectedyear,
    selectedmonth,
    isbetween,
  }) => {
    if (isSelected(day, startdate, selectedyear, selectedmonth) && !enddate) {
      return 'none ';
    }
    if (isSelected(day, startdate, selectedyear, selectedmonth)) {
      return 'linear-gradient(to left, rgba(148, 165, 254, 0.6) 29px, transparent 10px)';
    }
    if (isSelected(day, enddate, selectedyear, selectedmonth)) {
      return 'linear-gradient(to right, rgba(148, 165, 254, 0.6) 29px, transparent 10px)';
    }
    return isbetween === 'true' ? 'rgb(148,165,254,0.6)' : 'white';
  }};
  color: ${({ day, startdate, selectedyear, selectedmonth, isbetween }) =>
    isSelected(day, startdate, selectedyear, selectedmonth) || isbetween === 'true'
      ? 'white'
      : 'black'};
  border-radius: ${({
    day,
    startdate,
    enddate,
    selectedyear,
    selectedmonth,
    isbetween,
  }) => {
    if (isSelected(day, startdate, selectedyear, selectedmonth)) {
      return '20px 0 0 20px';
    }
    if (isSelected(day, enddate, selectedyear, selectedmonth)) {
      return '0 20px 20px 0';
    }
    return isbetween ? '0%' : '50%';
  }};

  .dateText {
    position: relative;
    z-index: 2;
  }

  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% - 8px);
    height: calc(100% - 0px);
    transform: translate(-50%, -50%);
    background-color: transparent;
    border-radius: 50%;
    z-index: 1;
  }

  ${({ day, startdate, selectedyear, selectedmonth }) =>
    isSelected(day, startdate, selectedyear, selectedmonth) &&
    `
    &::before {
        
      background-color: rgba(61,92,255);
    }
`}

  ${({ day, enddate, selectedyear, selectedmonth }) =>
    isSelected(day, enddate, selectedyear, selectedmonth) &&
    `
    &::before {
        
      background-color: rgba(61,92,255);
    }
`}
`;

const DaysName = styled.div`
  color: var(--gray-400, #94a3b8);
  text-align: center;
  font-size: 14.63px;
  font-style: normal;
  font-weight: 600;
  line-height: 20.257px;
  text-transform: capitalize;
`;

const DaysNameWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 12px;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 20px;
  row-gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
  margin-bottom: 30px;
`;

const FotterButton = styled.button`
  display: flex;
  width: 159px;
  height: 59px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 35px;
  background-color: ${(props) => props.color || 'defaultColor'};
  color: white;
`;

// props validation

DatePicker.propTypes = {
  onClose: PropTypes.func,
  ismodalopen: PropTypes.bool,
  startDate: PropTypes.string,
  setStartDate: PropTypes.func,
  endDate: PropTypes.string,
  setEndDate: PropTypes.func,
  onSearchClick: PropTypes.func,
};
