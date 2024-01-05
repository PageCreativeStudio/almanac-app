import React, { useEffect, useState } from 'react';
import { AccordianTitle, Panel } from './accordian.styles';
import { Box, Flex } from 'reflexbox';
import { withTheme } from '@emotion/react'
import cal from '../../assets/images/calendar.png'
import minus from '../../assets/svgs/minus';
import plus from '../../assets/svgs/plus';
import { InfoPopup } from '../info-popup';
import { Events, EventsWrapper, Link, SmallText,Text, TextBold, Circle } from '../info-card/info-card.styles';
import formatDate from '../../helpers/format-date';

const Accordian = ({theme, title, children, width="100%", active = false, infoBox, events}) => {

  // setup active state to track if accordian is active so we can conditonally set css styles
  const [isActive, setIsActive] = useState(active);
  const [showCalendar, setShowCalendar] = useState(false);

  // Toggle active state when this function is run
  const handleOnClick = () => {
    setIsActive(!isActive)
  }

  const [filteredEvents, setFilteredEvents] = useState(null)
  const [calendar, setCalendar] = useState(null)

  useEffect(() => {
    if (!events) return
    setFilteredEvents(events.sort((a, b) => {
      return new Date(`${a.acf.date_from}:${a.acf.time}`) - new Date(`${b.acf.date_from}:${b.acf.time_end ? b.acf.time_end : '00:00'}`);
    }).filter(event => {
      var currentdate = new Date();
      return currentdate.getTime() <= new Date(event.acf.date_from).getTime()
    }))
  }, [events])

  useEffect(() => {
    if(!filteredEvents) return
    const calendarInstace = window.ics();
    console.log(filteredEvents)
    filteredEvents.forEach(event => {
      calendarInstace.addEvent(event.acf.title, event.acf.description, "", `${event.acf.date_from} ${event.acf.time ? event.acf.time : '00:00'}`, `${event.acf.date_to ? event.acf.date_to : event.acf.date_from} ${event.acf.time_end ? event.acf.time_end : '00:00'}`);
    });
    setCalendar(calendarInstace)
  }, [filteredEvents])
  
  const onDownloadClick = () => {
    if (!calendar) return
    calendar.download(`${title} FMC Events`);
  }

  return (
    <Box onClick={() => showCalendar && setShowCalendar(false)} marginBottom={theme.spacing[1]} width={width}>
      {title && <AccordianTitle alignItems="center" justifyContent="space-between" onClick={handleOnClick}>
        <Flex alignItems="center">
          {title}
          {infoBox &&<Box marginLeft="1rem">
            <InfoPopup width="37rem">
              {infoBox}
            </InfoPopup>
          </Box>}
        </Flex>
        {
          isActive ? minus : plus
        }
      </AccordianTitle>}
      <Panel active={isActive}>
        {filteredEvents &&<EventsWrapper onClick={() => setShowCalendar(true)} marginTop="1rem" marginBottom="3rem">
          <img style={{width:'2.5rem', marginRight: '0.5rem'}} alt="calendar" src={cal} />
          <TextBold primary={false}>Upcoming Events</TextBold>
        <Events show={showCalendar}>
          {filteredEvents.map(event => (
              <Flex marginBottom="0.5rem" key={event.id}>
                <Circle color={event.acf.category[0]?.acf.colour} /> 
                <Flex flexDirection="column">
                  <SmallText primary={false}>
                    {`${formatDate(event.acf.date_from )} ${event.acf.time}`}
                  </SmallText>
                  <Text primary={false}>{event.acf.title}</Text>
                </Flex>
              </Flex>
            ))}
            <Link onClick={onDownloadClick} primary={false}>
              Download
            </Link>
          </Events>
        </EventsWrapper>
        }
        {children && children}
      </Panel>
    </Box>
  )
}
export default withTheme(Accordian);