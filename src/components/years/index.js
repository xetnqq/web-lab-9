import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const YearsComponent = () => {

  const { currentDate, setCurrentDate, datesWithEvents } = useContext(CalendarContext);

  const [year, setYear] = useState(currentDate.getFullYear());

  const halfCount = 12;

  const nextPage = () => {
    setYear((prevYear) => prevYear + 25);
  };
  const prevPage = () => {
    setYear((prevYear) => prevYear - 25);
  };

  const click = (year) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
  };

  return (
    <div className='years-wrapper content-wrapper'>
      <div className='header'>
        <FontAwesomeIcon icon={faArrowLeft} className='arrow-left' onClick={prevPage} />
        {year}
        <FontAwesomeIcon icon={faArrowRight} className='arrow-right' onClick={nextPage} />
      </div>
      {
        Array(halfCount)
          .fill(null)
          .map((_el, index) => {
            const showYear = year - halfCount + index;
            const allDatesStr = datesWithEvents.map(date => date.year)
            return (<div
              className='year content-item'
              onClick={() => click(showYear)}
              style={{ 'background-color': allDatesStr.includes(showYear + 1 + "") ? 'green' : '#282c34' }}
            >{showYear + 1}</div>);
          })
      }
      <div className='year content-item' onClick={() => click(year)} >{year}</div>
      {
        Array(halfCount)
          .fill(null)
          .map((_el, index) => {
            const showYear = year + index + 1;
            const allDatesStr = datesWithEvents.map(date => date.year)
            return (
              <div style={{ 'background-color': allDatesStr.includes(showYear + 1 + "") ? 'green' : '#282c34' }} className='year content-item' onClick={() => click(showYear)} >
                {showYear}
              </div>);
          })
      }
    </div>
  );
};

export default YearsComponent;