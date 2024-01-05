import React, { useEffect, useState } from "react";
import { Flex, Box } from "reflexbox";
import { Wrapper, Title, Text, SmallText, Image, TextBold, Circle, EventsWrapper, Events, Link } from "./info-card.styles";
import cal from '../../assets/images/calendar.png'
import formatDate from "../../helpers/format-date";

const InfoCard = ({ width, title, textList, phone1, phone2, email, primary, image, events }) => {

  const [show, setShow] = useState(false)
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
    if (!filteredEvents) return
    const calendarInstace = window.ics();
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
    <Wrapper onClick={() => show && setShow(false)} marginRight={['0', "2rem"]} marginBottom="2rem" flexDirection="column" primary={primary} justifyContent="center" width={width}>
      {image && <Image alt={`Image for ${title}`} src={image} />}
      {title && <Title primary={primary}>{title}</Title>}
      {textList && <Flex marginBottom="1rem" flexWrap="wrap">
        {textList.map((text, i) => <SmallText primary={primary} key={i} dangerouslySetInnerHTML={{ __html: i !== textList.length - 1 ? `${text}&nbsp&nbsp•&nbsp&nbsp` : text }} />)}
      </Flex>}
      <Flex flexWrap="wrap">
        {phone1 && <Text primary={primary}>{phone1}</Text>}
        {(phone1 && phone2) && <Text primary={primary}><Box margin="0 0.5rem">|</Box></Text>}
        {phone2 && <Text primary={primary}>{phone2}</Text>}
      </Flex>
      {email && <a href={`mailto:${email}`}><Text primary={primary}>{email}</Text></a>}
      {filteredEvents && <EventsWrapper onClick={() => setShow(true)} marginTop="1rem">
        <img style={{ width: '2.5rem', marginRight: '0.5rem' }} alt="calendar" src={cal} />
        <TextBold primary={primary}>Upcoming Events</TextBold>
        <Events show={show}>
          {filteredEvents.map(event => (
            <Flex marginBottom="0.5rem" key={event.id}>
              <Circle color={event.acf.category[0]?.acf.colour} />
              <Flex flexDirection="column">
                <SmallText primary={primary}>
                  {`${formatDate(event.acf.date_from)} ${event.acf.time}`}
                </SmallText>
                <Text primary={primary}>{event.acf.title}</Text>
              </Flex>
            </Flex>
          ))}
          <Link onClick={onDownloadClick} primary={primary}>
            Download
          </Link>
        </Events>
      </EventsWrapper>
      }
    </Wrapper>
  )
}

export default InfoCard;