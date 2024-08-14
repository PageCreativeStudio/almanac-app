import React, { useState, useEffect } from "react";
import { EventInfo } from "../components/event-info";
import { SidepanelRight } from "../components/sidepanel-right";
import { H1Title, PText } from "../components/styles";
import { EventTimeline } from "../components/event-timeline";
import { EventCalendar } from "../components/event-calendar";
import { Box, Flex } from "reflexbox";
import { categoriesEndpoint, eventsEndpoint } from "../api-endpoints/wordpress";
import getData from "../helpers/get-data";
import { InfoPopup } from "../components/info-popup";
import formatDate from "../helpers/format-date";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";
import moment from 'moment'

const Calendar = () => {

  // set states for 
  const [events, setEvents] = useState(null)
  const [eventsFormatted, setEventsFormatted] = useState(null)
  const [allFormattedEvents, setAllEventsFormatted] = useState(null)

  const [filter, setFilter] = useState(null)
  const [eventsCategories, setEventsCategories] = useState(null)
  const [eventColors, setEventColors] = useState(null)
  const [indvidualEvent, setIndvidualEvent] = useState(null)
  const [indvidualEventActive, setIndvidualEventActive] = useState(false)

  // Fetch page data
  useEffectOnce(() => {
    getData(eventsEndpoint, null, setEvents).catch(console.error)
    getData(categoriesEndpoint, null, setEventsCategories).catch(console.error)
  }, [])

  useEffect(() => {
    if(!allFormattedEvents || !filter) return
    setEventsFormatted(allFormattedEvents.filter(({eventCategory}) => eventCategory === filter))
    setIndvidualEventActive(true)
  }, [filter, allFormattedEvents])

  // add class for colour to event object and remove irrelivant data from individual events objects
  useEffect(() => {
    if(!events || !eventsCategories || !eventColors) return

    const formattedEvents = events.map((x) => {
      let indexColor = eventsCategories.findIndex((category) => {
        console.log(x);
        if (!x.acf.category) return false
        return category.name === x.acf.category[0].name
      });
      return {
        id: x.id, 
        name: x.acf.title,
        start: x.acf.date_from, 
        end: x.acf.date_to, 
        time: x.acf.time, 
        endTime: x.acf.time_end ? x.acf.time_end : null,
        image: x.acf.image ? x.acf.image.url : null,
        description: x.acf.description ? x.acf.description : null,
        eventCategory: x.acf.category && x.acf.category[0].name, 
        colorName: eventsCategories[indexColor] && eventsCategories[indexColor].acf.colour,
        color: eventsCategories[indexColor] && eventsCategories[indexColor].acf.colour,
        active: false,
      }
    }).sort((a, b) => {
      return moment(`${a.start}${a.time ? ` ${a.time}` : ' 00:00'}`, 'YYYY-MM-DD HH:mm A') - moment(`${b.start}${b.endTime ? ` ${b.endTime}` : ' 00:00'}`, 'YYYY-MM-DD HH:mm A');
    });
    setEventsFormatted(formattedEvents)
    setAllEventsFormatted(formattedEvents)
  }, [events, eventsCategories, eventColors])

  // Set class list for colours
  useEffect(() => {
    if(!eventsCategories) return
    setEventColors(eventsCategories.map((e, i) => `highlighted${i}`))
  }, [eventsCategories])

  const onDateClickHandler = (id) => {
    if(!id || id === '' ) return
    setIndvidualEvent(eventsFormatted.find(event => event.id == id))
    setEventsFormatted(prev => prev.map(event => {
      return {...event, active: event.id == id ? true : false}
    }))
    setIndvidualEventActive(true)
  }

  const onCategoryClickHandler = (category) => {
    if(!category) return 
    if(category === 'all') {
      setFilter(null)
      setEventsFormatted(allFormattedEvents)
      setIndvidualEvent(null)
      setIndvidualEventActive(true)
      return
    }  
    setFilter(category)
  }

  const onBackClickHandler = () => {
    setIndvidualEvent(null)
    setEventsFormatted(prev => prev.map(event => {
      return {...event, active: false}
    }))
    setIndvidualEventActive(false)
  }
  var today = moment()
  return (
    <>
      {!eventsFormatted ?
        <Loading />
      : 
      <>
      <Box marginBottom="4rem" width={["100%", "100%", "100%", "calc(75% - 14rem)"]}>
        <Flex  flexWrap="wrap" alignItems="center" justifyContent="space-between">
          {eventsFormatted && <H1Title>
            <Flex alignItems="center">
              CALENDAR 
              <Box marginLeft="1.5rem">
                <InfoPopup width="42rem">
                The venue for The Furniture Makers’ Company committee meetings is Furniture Makers’ Hall bar regional committees or unless otherwise shown. Guests are very welcome to most social events.
                </InfoPopup>
              </Box>
            </Flex>
          </H1Title>}
          <Box marginTop="-2rem" onClick={() => setIndvidualEventActive(true)}><PText>View All Events</PText></Box>
        </Flex>
        {eventsFormatted && <EventCalendar categoryClick={onCategoryClickHandler} categories={eventsCategories} onClick={(id, type) => onDateClickHandler(id, type)} events={eventsFormatted} colors={eventsCategories && eventsCategories.map((category) => category.acf.colour)} />}
      </Box>
      <SidepanelRight onOutsideClick={() => setIndvidualEventActive(false)} right={indvidualEventActive ? '0' : '-100%'} width={["80%", "70%", "60%", "25%"]}>
        {indvidualEvent ? 
        <>
          <EventInfo 
            onClick={onBackClickHandler}
            image={indvidualEvent.image}
            title={indvidualEvent.name}
            date={formatDate(indvidualEvent.start)}
            dateEnd={indvidualEvent.end ? formatDate(indvidualEvent.end) : ""}
            time={indvidualEvent.time}
            colour={indvidualEvent.color}
            description={indvidualEvent.description}
            timeEnd={indvidualEvent.endTime}
          />
        </>
        :  
        eventsFormatted && 
          <EventTimeline
            title="All Events"
            onClick={onDateClickHandler}
            events={eventsFormatted.filter(event => moment(event.start).diff(today, 'days') >= 0).map(event => {
              return {
                id: event.id,
                title: event.name,
                date: formatDate(event.start),
                time: event.time,
                colour: event.color,
              }
            })}
          />
        }
      </SidepanelRight>
      </>
      }
    </>
  )
}

export default Calendar;