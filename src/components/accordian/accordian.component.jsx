import React, { useEffect, useState } from 'react';
import { AccordianTitle, Panel } from './accordian.styles';
import { Box, Flex } from 'reflexbox';
import { withTheme } from '@emotion/react';
import cal from '../../assets/images/calendar.png';
import minus from '../../assets/svgs/minus';
import plus from '../../assets/svgs/plus';
import DownloadIcon from '../../assets/svgs/download-event';
import { InfoPopup } from '../info-popup';
import { Events, EventsWrapper, DownloadButton, Link, SmallText, Text, TextBold, Circle } from '../info-card/info-card.styles';
import formatDate from '../../helpers/format-date';

const Accordian = ({ theme, title, children, width = "100%", active = false, infoBox, events }) => {
  const [isActive, setIsActive] = useState(active);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(null);

  // Toggle active state
  const handleOnClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (!events) return;
    setFilteredEvents(
      events
        .sort((a, b) => {
          return new Date(`${a.acf.date_from}:${a.acf.time}`) - new Date(`${b.acf.date_from}:${b.acf.time_end ? b.acf.time_end : '00:00'}`);
        })
        .filter((event) => {
          var currentdate = new Date();
          return currentdate.getTime() <= new Date(event.acf.date_from).getTime();
        })
    );
  }, [events]);

  // Format date and time to ICS format
  const formatICSDate = (date, time) => {
    const dateObj = new Date(date);
    if (time) {
      const timeParts = time.match(/(\d+):(\d+)\s*([ap]m)/i);
      if (timeParts) {
        let hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const period = timeParts[3].toLowerCase();
        if (period === 'pm' && hours !== 12) hours += 12;
        dateObj.setHours(hours, minutes);
      }
    } else {
      dateObj.setHours(0, 0, 0, 0);
    }

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  // Generate ICS file for a single event
  const generateCalendarData = (startDate, endDate, startTime, endTime, title, description) => {
    const formattedStartDate = formatICSDate(startDate, startTime);
    const formattedEndDate = formatICSDate(endDate || startDate, endTime || startTime); // Use start time if end time is not provided

    const calendarData = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:CALENDAR
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${formattedStartDate}
DTEND:${formattedEndDate}
DESCRIPTION:${description || ""}
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    return window.URL.createObjectURL(blob);
  };

  // Handle download for each event
  const handleDownload = (event) => {
    const { date_from, date_to, time, time_end, title, description } = event.acf;
    const calendarDataUrl = generateCalendarData(date_from, date_to, time, time_end, title, description);
    window.open(calendarDataUrl, '_blank');
  };

  return (
    <Box onClick={() => showCalendar && setShowCalendar(false)} marginBottom={theme.spacing[1]} width={width}>
      {title && (
        <AccordianTitle alignItems="center" justifyContent="space-between" onClick={handleOnClick}>
          <Flex alignItems="center">
            {title}
            {infoBox && (
              <Box marginLeft="1rem">
                <InfoPopup width="37rem">{infoBox}</InfoPopup>
              </Box>
            )}
          </Flex>
          {isActive ? minus : plus}
        </AccordianTitle>
      )}
      <Panel active={isActive}>
        {filteredEvents && (
          <EventsWrapper onClick={() => setShowCalendar(true)} marginTop="1rem" marginBottom="3rem">
            <img style={{ width: '2.5rem', marginRight: '0.5rem' }} alt="calendar" src={cal} />
            <TextBold primary={false}>Upcoming Events</TextBold>
            <Events show={showCalendar} style={{ padding: "1rem 2rem" }}>
              {filteredEvents.map((event) => (
                <Flex marginBottom="0.5rem" key={event.id} justifyContent="space-between" alignItems="center">
                  <Flex style={{ maxWidth: "24rem", marginRight: "4rem" }}>
                    <Circle color={event.acf.category[0]?.acf.colour} />
                    <Flex flexDirection="column">
                      <SmallText style={{ fontSize: "14px", color: "Black", paddingBottom: "6px" }} primary={false}>{`${formatDate(event.acf.date_from)} ${event.acf.time}`}</SmallText>
                      <Text primary={false}>{event.acf.title}</Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <DownloadButton style={{display:"Block"}} onClick={() => handleDownload(event)}>
                      <DownloadIcon />
                    </DownloadButton>
                  </Flex>
                </Flex>
              ))}
            </Events>
          </EventsWrapper>
        )}
        {children && children}
      </Panel>
    </Box>
  );  
};

export default withTheme(Accordian);




//Original old code
// import React, { useEffect, useState } from 'react';
// import { AccordianTitle, Panel } from './accordian.styles';
// import { Box, Flex } from 'reflexbox';
// import { withTheme } from '@emotion/react';
// import cal from '../../assets/images/calendar.png';
// import minus from '../../assets/svgs/minus';
// import plus from '../../assets/svgs/plus';
// import { InfoPopup } from '../info-popup';
// import { Events, EventsWrapper, Link, SmallText, Text, TextBold, Circle } from '../info-card/info-card.styles';
// import formatDate from '../../helpers/format-date';

// const Accordian = ({ theme, title, children, width = "100%", active = false, infoBox, events }) => {

//   // setup active state to track if accordian is active so we can conditionally set css styles
//   const [isActive, setIsActive] = useState(active);
//   const [showCalendar, setShowCalendar] = useState(false);

//   // Toggle active state when this function is run
//   const handleOnClick = () => {
//     setIsActive(!isActive);
//   };

//   const [filteredEvents, setFilteredEvents] = useState(null);
//   const [calendar, setCalendar] = useState(null);

//   useEffect(() => {
//     if (!events) return;
//     setFilteredEvents(events.sort((a, b) => {
//       return new Date(`${a.acf.date_from}:${a.acf.time}`) - new Date(`${b.acf.date_from}:${b.acf.time_end ? b.acf.time_end : '00:00'}`);
//     }).filter(event => {
//       var currentdate = new Date();
//       return currentdate.getTime() <= new Date(event.acf.date_from).getTime();
//     }));
//   }, [events]);

//   useEffect(() => {
//     if (!filteredEvents) return;
//     const calendarInstance = window.ics();
//     console.log(filteredEvents);
//     filteredEvents.forEach(event => {
//       calendarInstance.add(event.acf.title, event.acf.description, "", `${event.acf.date_from} ${event.acf.time ? event.acf.time : '00:00'}`, `${event.acf.date_to ? event.acf.date_to : event.acf.date_from} ${event.acf.time_end ? event.acf.time_end : '00:00'}`);
//     });
//     setCalendar(calendarInstance);
//   }, [filteredEvents]);

//   const onDownloadClick = () => {
//     if (!calendar) return;
//     calendar.download(`${title} FMC Events`);
//   };

//   return (
//     <Box onClick={() => showCalendar && setShowCalendar(false)} marginBottom={theme.spacing[1]} width={width}>
//       {title && (
//         <AccordianTitle alignItems="center" justifyContent="space-between" onClick={handleOnClick}>
//           <Flex alignItems="center">
//             {title}
//             {infoBox && (
//               <Box marginLeft="1rem">
//                 <InfoPopup width="37rem">
//                   {infoBox}
//                 </InfoPopup>
//               </Box>
//             )}
//           </Flex>
//           {isActive ? minus : plus}
//         </AccordianTitle>
//       )}
//       <Panel active={isActive}>
//         {filteredEvents && (
//           <EventsWrapper onClick={() => setShowCalendar(true)} marginTop="1rem" marginBottom="3rem">
//             <img style={{ width: '2.5rem', marginRight: '0.5rem' }} alt="calendar" src={cal} />
//             <TextBold primary={false}>Upcoming Events</TextBold>
//             <Events show={showCalendar}>
//               {filteredEvents.map(event => (
//                 <Flex marginBottom="0.5rem" key={event.id}>
//                   <Circle color={event.acf.category[0]?.acf.colour} />
//                   <Flex flexDirection="column">
//                     <SmallText primary={false}>
//                       {`${formatDate(event.acf.date_from)} ${event.acf.time}`}
//                     </SmallText>
//                     <Text primary={false}>{event.acf.title}</Text>
//                   </Flex>
//                 </Flex>
//               ))}
//               <Link onClick={onDownloadClick} primary={false}>
//                 Download
//               </Link>
//             </Events>
//           </EventsWrapper>
//         )}
//         {children && children}
//       </Panel>
//     </Box>
//   );
// };

// export default withTheme(Accordian);
