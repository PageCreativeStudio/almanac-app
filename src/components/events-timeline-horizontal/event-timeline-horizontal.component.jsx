import React from "react";
import { Box } from "reflexbox";
import { Circle, Line, Title, Wrapper, Text, DateWrapper } from "./event-timeline-horizontal.styles";
import { withTheme } from "@emotion/react";

const EventTimelineHorizontal = ({ theme, events, title }) => {
  // Function to format the date in British English
  const formatDate = (dateStr) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };

  // Function to format the time
  const formatTime = (timeStr) => {
    // Check if the time is valid
    const time = new Date(`2000-01-01T${timeStr}`);
    if (isNaN(time)) {
      return timeStr; // Use the original time if it's not valid
    }

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return time.toLocaleTimeString("en-GB", options);
  };

  return (
    <Box>
      {title && (
        <Box marginBottom={theme.spacing[1]}>
          <Title>{title}</Title>
        </Box>
      )}
      <Wrapper>
        {events && events.map((event) => (
          <DateWrapper
            flexDirection="column"
            key={event.id}
            minWidth="20rem"
            width="24rem"
            marginBottom={theme.spacing[1]}
            marginRight={theme.spacing[1]}
          >
            <Box maxWidth="24rem" marginBottom={theme.spacing[0]}>
              <Circle colour={event.color} />
            </Box>
            <Box>
              {(event.start || event.time) && (
                <Text>
                  {event.start && formatDate(event.start)}
                  {event.start && event.time && (
                    `, ${formatTime(event.time)}`
                  )}
                </Text>
              )}
              {event.name && <Title>{event.name}</Title>}
            </Box>
          </DateWrapper>
        ))}
        <Line />
      </Wrapper>
    </Box>
  );
};

export default withTheme(EventTimelineHorizontal);
