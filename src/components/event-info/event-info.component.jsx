import React from "react";
import { Flex } from "reflexbox";
import { Image, Wrapper, Title, Text, Circle, ContentWrapper, OverflowWrapper, BackArrow } from "./event-info.styles";
import { withTheme } from "@emotion/react";

const EventInfo = ({ theme, title, date, dateEnd, time, timeEnd, description, image, colour = theme.colors.primary, onClick }) => {
  // Improved date parsing function with better error handling
  const parseDateTime = (dateStr, timeStr) => {
    try {
      if (!dateStr) return null;
      
      const dateParts = dateStr.split(" ");
      const months = {
        January: '01', February: '02', March: '03', April: '04',
        May: '05', June: '06', July: '07', August: '08',
        September: '09', October: '10', November: '11', December: '12',
      };

      // Handle different date formats
      let year, month, day;
      if (dateParts.length >= 3) {
        day = dateParts[1].replace(/\D/g, '').padStart(2, '0');
        month = months[dateParts[2]] || '01';
        year = dateParts[3] || new Date().getFullYear().toString();
      } else {
        throw new Error("Invalid date format");
      }

      // Create date string
      let dateTimeStr = `${year}-${month}-${day}`;

      // Add time if provided
      if (timeStr) {
        const timeParts = timeStr.match(/(\d+):(\d+)\s*([ap]m)?/i);
        if (timeParts) {
          let [_, hours, minutes, period] = timeParts;
          hours = parseInt(hours, 10);
          if (period && period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
          if (period && period.toLowerCase() === 'am' && hours === 12) hours = 0;
          dateTimeStr += `T${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
        }
      }

      return new Date(dateTimeStr);
    } catch (error) {
      console.error("Error parsing date/time:", error);
      return null;
    }
  };

  const formatICSDate = (dateObj) => {
    if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) {
      return '';
    }

    return dateObj.toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  const generateCalendarData = (startDate, endDate, startTime, endTime) => {
    try {
      const start = parseDateTime(startDate, startTime);
      const end = parseDateTime(endDate || startDate, endTime || startTime);

      if (!start) throw new Error("Invalid start date/time");
      
      // If no end time/date provided, set end time to start time + 1 hour
      const defaultEnd = new Date(start.getTime() + (60 * 60 * 1000));
      const finalEnd = end || defaultEnd;

      const formattedStartDate = formatICSDate(start);
      const formattedEndDate = formatICSDate(finalEnd);

      const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventInfo//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:${title.replace(/[,\\;]/g, '')}
DTSTART:${formattedStartDate}
DTEND:${formattedEndDate}
DESCRIPTION:${(description || '').replace(/[,\\;]/g, '')}
END:VEVENT
END:VCALENDAR`.trim();

      const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
      return window.URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error generating calendar data:", error);
      return null;
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    
    try {
      const calendarDataUrl = generateCalendarData(date, dateEnd, time, timeEnd);
      
      if (!calendarDataUrl) {
        throw new Error("Failed to generate calendar data");
      }

      // Create hidden anchor for better mobile compatibility
      const link = document.createElement('a');
      link.href = calendarDataUrl;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_event.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(calendarDataUrl);
    } catch (error) {
      console.error("Error handling download:", error);
      alert("Sorry, there was an error creating the calendar event. Please try again.");
    }
  };

  return (
    <Wrapper colour={colour}>
      {image && (
        <Image 
          backgroundImage={image}
          role="img"
          aria-label={title ? `Image for ${title}` : 'Event image'}
        />
      )}
      <ContentWrapper>
        <BackArrow marginBottom={theme.spacing[0]}>
          <svg 
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg" 
            width="49" 
            height="50" 
            viewBox="0 0 49 50"
            role="button"
            aria-label="Go back"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onClick()}
          >
            <g transform="translate(-0.955)">
              <rect width="49" height="50" transform="translate(0.955)" fill="none" />
              <line x1="34" transform="translate(7.955 25)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M53.992,56,40,69.992,53.992,83.984" transform="translate(-32.021 -45.117)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </BackArrow>
        
        {(date || time) && (
          <Text role="time">
            {date && date}{' '}
            {time && <>, {time}</>}{' '}
            {timeEnd && <> - {timeEnd}</>}{' '}
            {dateEnd && <> - {dateEnd}</>}
          </Text>
        )}

        {title && (
          <Title>
            <Flex paddingRight={theme.spacing[2]} alignItems="start">
              <Circle colour={colour} role="presentation" />
              {title}
            </Flex>
          </Title>
        )}

        {description && (
          <OverflowWrapper 
            scroll={image ? "scroll" : "auto"} 
            height={image ? "8rem" : "auto"}
          >
            <Text
              dangerouslySetInnerHTML={{
                __html: description.replace(
                  /<a\b([^>]*)>(.*?)<\/a>/g,
                  '<a style="font-size: inherit; text-decoration: underline 2px #e23734; text-underline-offset: 2px;" $1>$2</a>'
                )
              }}
            />
          </OverflowWrapper>
        )}

        <Flex>
          <Text style={{ 
            marginTop: "1.5rem",
            fontSize: "19px",
            textDecoration: "underline 2px #e23734",
            textUnderlineOffset: "5px",
            touchAction: "manipulation"
          }}>
            <a
              href="#"
              onClick={handleDownload}
              style={{ 
                color: "#e23734", 
                fontWeight: 400,
                padding: "8px 0", 
                textDecoration: "underline 2px #e23734", 
                display: "inline-block"
              }}
            >
              iCal Download
            </a>
          </Text>
        </Flex>
      </ContentWrapper>
    </Wrapper>
  );
};

export default withTheme(EventInfo);
