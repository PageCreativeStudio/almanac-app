import React from "react";
import { Flex } from "reflexbox";
import { Image, Wrapper, Title, Text, Circle, ContentWrapper, OverflowWrapper, BackArrow } from "./event-info.styles";
import { withTheme } from "@emotion/react";

const EventInfo = ({ theme, title, date, dateEnd, time, timeEnd, description, image, colour = theme.colors.primary, onClick }) => {

  const formatICSDate = (date, time) => {
    const dateObj = new Date(date);
  
    if (time) {
      const timeParts = time.match(/(\d+):(\d+)\s*([ap]m)/i);
      if (timeParts) {
        let hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const period = timeParts[3].toLowerCase();
        if (period === "pm" && hours !== 12) hours += 12;
        dateObj.setHours(hours, minutes);
      } else {
        console.error(`Failed to parse time: ${time}`);
      }
    } else {
      // Set to 00:00 local time if no time is provided
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

  const generateCalendarData = (startDate, endDate, startTime, endTime) => {
    const formattedStartDate = formatICSDate(startDate, startTime);
    let formattedEndDate;
    if (endDate) {
      formattedEndDate = formatICSDate(endDate, endTime || startTime); // Use start time if end time is not provided
    } else {
      formattedEndDate = formatICSDate(startDate, endTime || startTime); // Use start time if end time is not provided
    }
    
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

  const handleDownload = () => {
    const startDateString = date ? date.split(" ") : [];
    const endDateString = dateEnd ? dateEnd.split(" ") : [];
    const months = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };

    let startDateStringWithoutTime;
    let endDateStringWithoutTime;

    if (startDateString.length === 4) {
      startDateStringWithoutTime = `${startDateString[3]}-${months[startDateString[2]]}-${startDateString[1].slice(0, -2)}`;
    } else if (startDateString.length === 5) {
      const startTime = startDateString[4].split(":");
      startDateStringWithoutTime = `${startDateString[3]}-${months[startDateString[2]]}-${startDateString[1].slice(0, -2)}T${startTime[0].padStart(2, '0')}${startTime[1].padStart(2, '0')}`;
    }

    if (endDateString.length === 4) {
      endDateStringWithoutTime = `${endDateString[3]}-${months[endDateString[2]]}-${endDateString[1].slice(0, -2)}`;
    } else if (endDateString.length === 5) {
      const endTime = endDateString[4].split(":");
      endDateStringWithoutTime = `${endDateString[3]}-${months[endDateString[2]]}-${endDateString[1].slice(0, -2)}T${endTime[0].padStart(2, '0')}${endTime[1].padStart(2, '0')}`;
    } else {
      console.warn("No end date provided for event. Using start date as end date.");
      endDateStringWithoutTime = startDateStringWithoutTime;
    }

    if (endDateStringWithoutTime) {
      const calendarDataUrl = generateCalendarData(
        new Date(startDateStringWithoutTime),
        new Date(endDateStringWithoutTime),
        time,
        timeEnd
      );
      window.open(calendarDataUrl, '_blank');
    } else {
      console.warn("No end date provided for event.");
    }
  };

  return (
    <Wrapper colour={colour}>
      {image && <Image backgroundImage={image} />}
      <ContentWrapper>
        <BackArrow marginBottom={theme.spacing[0]}>
          <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="49" height="50" viewBox="0 0 49 50">
            <g id="Group_118" data-name="Group 118" transform="translate(-0.955)">
              <rect id="Rectangle_18" data-name="Rectangle 18" width="49" height="50" transform="translate(0.955)" fill="none" />
              <line id="Line_6" data-name="Line 6" x1="34" transform="translate(7.955 25)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path id="Path_10" data-name="Path 10" d="M53.992,56,40,69.992,53.992,83.984" transform="translate(-32.021 -45.117)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </BackArrow>
        {(date || time) && <Text>{date && date} {time && <>, {time}</>} {timeEnd && <> - {timeEnd}</>} {dateEnd && <> - {dateEnd}</>}</Text>}
        {title && <Title><Flex paddingRight={theme.spacing[2]} alignItems="start"><Circle colour={colour} /> {title}</Flex></Title>}
        {description && <OverflowWrapper scroll={image ? "scroll" : "auto"} height={image ? "8rem" : "auto"}><Text dangerouslySetInnerHTML={{ __html: description.replace(/<a\b([^>]*)>(.*?)<\/a>/g, '<a style="font-size: inherit; text-decoration: underline 2px #e23734; text-underline-offset: 2px;" $1>$2</a>') }} /></OverflowWrapper>}
        <Flex><Text style={{ marginTop: "1.5rem", fonSize: "19px", textDecoration: "underline 2px #e23734", textUnderlineOffset: "5px" }}><a style={{ color: "#e23734", fontWeight: 400 }} href="#" onClick={handleDownload}>iCal Download</a></Text></Flex>
      </ContentWrapper>
    </Wrapper>
  );
};

export default withTheme(EventInfo);
