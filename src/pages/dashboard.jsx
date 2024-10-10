import React, { useEffect, useState } from "react";
import { Box, Flex } from "reflexbox";
import { H1Title, LargeH1Title, PText, Image } from "../components/styles";
import getData from "../helpers/get-data";
import { eventsEndpoint, categoriesEndpoint } from "../api-endpoints/wordpress";
import formatDate from "../helpers/format-date";
import { EventTimelineHorizontal } from "../components/events-timeline-horizontal";
import { Link } from "react-router-dom";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";

const Dashboard = () => {
  const [eventsFormatted, setEventsFormatted] = useState(null);

  const [events, setEvents] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [eventsCategories, setEventsCategories] = useState(null);

  // Fetch page data
  useEffectOnce(() => {
    getData(null, 366, setPageData).catch(console.error);
    getData(eventsEndpoint, null, setEvents).catch(console.error);
    getData(categoriesEndpoint, null, setEventsCategories).catch(console.error);
  }, []);

  // Format and filter events
  useEffect(() => {
    if (!eventsCategories || !events) return;

    const formattedEvents = events.map((x) => {
      let indexColor = eventsCategories.findIndex((category) => {
        if (!x.acf.category) return false;
        return category.name === x.acf.category[0].name;
      });
      return {
        id: x.id,
        name: x.acf.title,
        start: x.acf.date_from,
        end: x.acf.date_to,
        time: x.acf.time,
        image: x.acf.image ? x.acf.image.url : null,
        description: x.acf.description ? x.acf.description : null,
        eventCategory: x.acf.category ? x.acf.category[0].name : 'default',
        color: eventsCategories[indexColor] && eventsCategories[indexColor].acf.colour,
        active: false,
      };
    })
    .sort((a, b) => {
      return new Date(`${a.start} ${a.time}`) - new Date(`${b.start} ${b.time}`);
    })
    .filter(event => {
      const eventDate = new Date(event.start);
      const currentdate = new Date();
      const cur_month = currentdate.getMonth() + 1;
      const cur_year = currentdate.getFullYear();
      const eventMonth = eventDate.getMonth() + 1;
      const eventYear = eventDate.getFullYear();

      // Return events for the current month and year
      return eventMonth === cur_month && eventYear === cur_year;
    });

    setEventsFormatted(formattedEvents);
  }, [events, eventsCategories]);

  return (
    <>
      {!pageData && !eventsFormatted ? (
        <Loading />
      ) : (
        <>
          <Flex flexWrap="wrap" marginBottom="5rem">
            {pageData?.acf?.title && (
              <Box width={['100%', '100%', '100%', 'calc(25% - 5rem)']} marginRight={['0', '0', '0', '5rem']}>
                <LargeH1Title>{pageData.acf.title}</LargeH1Title>
              </Box>
            )}
            {pageData?.acf?.text_1 && (
              <Box marginBottom={['2.5rem']} width={['100%', '100%', '100%', 'calc(37.5% - 5rem)']} marginRight={['0', '0', '0', '5rem']}>
                <PText dangerouslySetInnerHTML={{ __html: pageData.acf.text_1 }} />
              </Box>
            )}
            {pageData?.acf?.welcome_image && (
              <Box width={['100%', '100%', '100%', 'calc(37.5% - 5rem)']}>
                <Image src={pageData.acf.welcome_image.url} alt="welcome" />
                <b>
                  <PText dangerouslySetInnerHTML={{ __html: pageData.acf.welcome_image.title }} />
                </b>
              </Box>
            )}
          </Flex>
          {eventsFormatted && eventsFormatted.length > 0 && (
            <Box>
              <Flex flexWrap="wrap" justifyContent="space-between">
                <H1Title>THIS MONTH'S EVENTS</H1Title>
                <Link to="/calendar">
                  <Flex marginBottom={["2rem"]} alignItems="center">
                    <Box marginRight="1rem">View all events</Box>
                    <svg id="Group_118" data-name="Group 118" xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36">
                      <rect id="Rectangle_18" data-name="Rectangle 18" width="35" height="36" fill="none" />
                      <line id="Line_6" data-name="Line 6" x2="24" transform="translate(6 18)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path id="Path_10" data-name="Path 10" d="M40,56,50.074,66.074,40,76.148" transform="translate(-19.852 -48.165)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </Flex>
                </Link>
              </Flex>
              <EventTimelineHorizontal events={eventsFormatted} />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
