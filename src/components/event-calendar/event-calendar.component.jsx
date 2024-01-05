import { withTheme } from '@emotion/react';
import React, { useState } from 'react'
import Calendar from "react-calendar";
import { Flex } from 'reflexbox';
import { Wrapper, Hidden, Circle, Absolute } from './event-calendar.styles';
import { getThisDate } from './helpers';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Text } from '../event-info/event-info.styles';

const EventCalendar = ({theme, events, colors, onClick, categories, categoryClick}) => {

  const [currentDay, setCurrentDay] = useState(new Date())

  const setEvents = (date) => {
    const dateobj = events && getThisDate(events, date)
    if (dateobj.length === 0) return
    if (dateobj.length === 1 ) {
      return dateobj[0] ? `C${dateobj[0].colorName?.replace(/^#/, "")} ${dateobj[0].active ? 'active' : ''}` : "";
    } else {
      return  `gradient-color ${dateobj.find(date => date.active === true) ? 'active' : ''}`;
    }

  };

  const setEventIDs = (date, view) => {
    let thisDatesObj = events && getThisDate(events, date);
    if (thisDatesObj.length === 0) return
    if (thisDatesObj.length === 1 ) {
      return <Hidden className="event-id" data-type="event-id" id={thisDatesObj[0] && thisDatesObj[0].id}/>;
    } else {
      return <div className="event-id-multiple-wrapper" data-type="event-id-multiple-wrapper">
        <Popup
          trigger={<Absolute className="button"></Absolute>}
          position="right center"
          closeOnDocumentClick
        >
          {thisDatesObj.map(date => <Flex style={{cursor: 'pointer'}} alignItems="start" margin="0.25rem 0" onClick={() => onClick(date.id)} key={date.id} id={date.id}>
            <Circle colour={date.color} />
            {date.name}
          </Flex>)}
        </Popup>
      </div>;
    }
  };

  return (
    <Wrapper padding={[`${theme.spacing[1]} ${theme.spacing[2]}`, `${theme.spacing[2]} ${theme.spacing[3]}`, `${theme.spacing[2]} ${theme.spacing[5]}`]} colors={colors && colors}>
      <Calendar
        view="month" 
        prev2Label={null} 
        defaultActiveStartDate={null}
        next2Label={null} 
        prevLabel={
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
            <path id="Polygon_2" data-name="Polygon 2" d="M5,0l5,9H0Z" transform="translate(0 10) rotate(-90)" fill="#8e8e8e"/>
          </svg>
        }
        nextLabel={
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
            <path id="Polygon_1" data-name="Polygon 1" d="M5,0l5,9H0Z" transform="translate(9) rotate(90)" fill="#8e8e8e"/>
          </svg>
        }
        defaultValue={currentDay}
        onClickDay={(value, event) => onClick(event.target.nextSibling.id)}
        tileClassName={({ activeStartDate, date }) => setEvents(date)}
        tileContent={({ activeStartDate, date, view }) => setEventIDs(date,view)}
      />
      <Flex alignItems="center" justifyContent="space-between" padding={["0", "0", "0rem 3rem"]}>
        <Text>Filter by category</Text>
        <Text onClick={() => categoryClick('all')} style={{cursor: 'pointer'}} ><b style={{fontWeight: 'bold'}}>Reset</b></Text>
      </Flex>
      {categories && <Flex flexWrap="wrap" padding={["0", "0", "1rem 3rem"]}>
        {categories &&  categories.map((category) => <Flex style={{cursor: 'pointer'}} onClick={() => categoryClick(category.name)} width={["100%", "calc(50% - 1rem)",  "calc(50% - 1rem)", "calc(33.33% - 1rem)"]} marginBottom="1rem" marginRight="1rem" key={category.name}>
          <Circle colour={category.acf.colour}></Circle>{category.name}
        </Flex>)}
      </Flex>}
    </Wrapper>
  )
}

export default withTheme(EventCalendar)