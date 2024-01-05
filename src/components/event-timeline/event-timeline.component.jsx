import React from "react"
import { Box, Flex } from "reflexbox"
import { Circle, Line, Title, Wrapper, Text } from "./event-timeline.styles"
import { withTheme } from "@emotion/react"

const EventTimeline = ({theme, events, title, onClick}) => {
  return (
    <Box padding={`0 ${theme.spacing[3]}`}>
      {title && <Box marginBottom={theme.spacing[1]}>
        <Title>{title}</Title>
      </Box>}
      <Wrapper paddingTop={theme.spacing[1]}>
        {(events && events.length > 0) && <Line />}
        {(events && events.length > 0) ? events.map(({id, date, time, title, colour=theme.colors.primary}) => <Flex style={{cursor: 'pointer'}} onClick={() => onClick(id)} key={id} width="100%" marginBottom={theme.spacing[1]}>
          <Box marginRight={theme.spacing[0]}>
            <Circle colour={colour ? colour : theme.colors.primary} />
          </Box>
          <Box>
            {(date || time) && <Text>{date && date}{time && <>, {time}</>}</Text>}
            {title && <Title>{title}</Title>}
          </Box>
        </Flex>)
        :
        <Text>No events to show</Text>
        }
      </Wrapper>
    </Box>
  )
}

export default withTheme(EventTimeline)