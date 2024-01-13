import { useContext, useState } from 'react';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import { MONTHS } from '../shared/months';

const MonthsComponent = () => {

 const { setCurrentDate, currentDate, datesWithEvents } = useContext(CalendarContext);

 const click = (index) => {
  setCurrentDate((preCurrentDate) => {
   const newDate = new Date(preCurrentDate);
   newDate.setMonth(index);
   return newDate;
  });
 };

 return (
  <div className='months-wrapper content-wrapper'>
   <div className='header'>{MONTHS[currentDate.getMonth()]}</div>
   {
    MONTHS.map((month, i) => {
        const allDatesStr = datesWithEvents.map(date => {
            delete date.day
            return JSON.stringify(date)
        })
        const strDate = JSON.stringify({year: currentDate.getFullYear() + "", month: i + 1 + ""})
        return (
        <div
            className='month content-item'
            onClick={() => click(i)}
            style={{ 'color': allDatesStr.includes(strDate) ? 'green' : 'white' }}
            >{month}
        </div>
        )
    })
   }
  </div >
 );
};

export default MonthsComponent;