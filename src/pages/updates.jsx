import React, { useState } from "react";
import { Box } from "reflexbox";
import { H1Title, PText, FlexContainer } from "../components/styles";
import getData from "../helpers/get-data";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";
import { withTheme } from "@emotion/react";
import DownloadIcon from '../assets/svgs/download-event';
import { Image, Wrapper, Title, Text, ContentWrapper, OverflowWrapper } from "../components/event-info/event-info.styles";

const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

const formatEventDate = (dateString, timeString) => {
    const dateObj = new Date(dateString);

    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(dateObj);
    const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(dateObj);
    const year = dateObj.getFullYear();

    let time = '';
    if (timeString) {
        const timeParts = timeString.match(/(\d+):(\d+)\s*([ap]m)/i);
        if (timeParts) {
            time = `${timeParts[1]}${timeParts[3].toLowerCase()}`;
        }
    }

    return `${weekday} ${day}${getOrdinalSuffix(day)} ${month} ${year} ${time ? `| ${time}` : ''}`;
};

const Updates = () => {
    const [updates, setUpdates] = useState(null);

    useEffectOnce(() => {
        getData(null, 1627, setUpdates).catch(console.error);
    }, []);

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

    const generateCalendarData = (startDate, endDate, startTime, endTime, title, description) => {
        const formattedStartDate = formatICSDate(startDate, startTime);
        const formattedEndDate = formatICSDate(endDate || startDate, endTime || startTime);

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

    const handleDownload = (event) => {
        const { date_from, date_to, time, time_end, title, description } = event;

        const calendarDataUrl = generateCalendarData(
            date_from,
            date_to || date_from,
            time,
            time_end || time,
            title,
            description
        );

        window.open(calendarDataUrl, '_blank');
    };

    // Current date and time for comparison
    const currentDate = new Date();

    return (
        <>
            {!updates ? (
                <Loading />
            ) : (
                <Box maxWidth="100rem">
                    {(updates && updates.acf) && (
                        <Box marginBottom="5rem">
                            <H1Title>
                                CALENDAR EVENT UPDATES LOG
                            </H1Title>
                            <PText>
                                {updates.acf.description}
                            </PText>
                        </Box>
                    )}
                    {updates?.acf?.updated_events?.map((event, index) => {
                        // Create a date object for the event end date and time
                        const eventEndDate = new Date(event.date_from);
                        if (event.time_end) {
                            const timeParts = event.time_end.match(/(\d+):(\d+)\s*([ap]m)/i);
                            if (timeParts) {
                                let hours = parseInt(timeParts[1], 10);
                                const minutes = parseInt(timeParts[2], 10);
                                const period = timeParts[3].toLowerCase();
                                if (period === "pm" && hours !== 12) hours += 12;
                                eventEndDate.setHours(hours, minutes);
                            }
                        } else {
                            // If no end time, default to the start time
                            eventEndDate.setHours(0, 0, 0, 0); // No end time, treat as all day
                        }

                        // Check if the event end time has passed
                        const hasPassed = eventEndDate < currentDate;

                        // Only render upcoming events
                        if (hasPassed) return null;

                        return (
                            <Wrapper key={index} style={{ borderTop: "solid 1px #bbbbbb", maxWidth: "88rem" }}>
                                {event.image && <Image backgroundImage={event.image} />}
                                <ContentWrapper style={{ padding: "3rem 7px 2rem", height: "auto", overflow: "auto" }}>
                                    {event.title && (
                                        <FlexContainer style={{ border: "0" }}>
                                            <Title>
                                                <span style={{ fontWeight: "700", fontSize: "23px", textTransform: "capitalize", color: "rgb(226, 55, 52)", marginBottom: "11px", display: "block" }}>
                                                    {event.title}
                                                </span>
                                                {(event.date_from || event.time) && (
                                                    <Text style={{ fontSize: "15px", paddingRight: "3rem", fontWeight: "700", marginBottom: "15px" }}>
                                                        {formatEventDate(event.date_from)}
                                                        {event.date_to && <> - {formatEventDate(event.date_to)}</>}
                                                        {(event.time || event.time_end) && ` | ${event.time}${event.time_end ? ` - ${event.time_end}` : ''}`}
                                                    </Text>
                                                )}
                                                {event.description && (
                                                    <OverflowWrapper scroll="auto">
                                                        <Text style={{ fontSize: "17px", fontWeight: "400", textTransform: "none", lineHeight: "27px", maxWidth: "57rem" }} dangerouslySetInnerHTML={{ __html: event.description }} />
                                                    </OverflowWrapper>
                                                )}
                                            </Title>
                                            <a style={{ placeSelf: "baseline" }} href="#" onClick={() => handleDownload(event)}>
                                                <DownloadIcon />
                                            </a>
                                        </FlexContainer>
                                    )}
                                </ContentWrapper>
                            </Wrapper>
                        );
                    })}
                </Box>
            )}
        </>
    );
};

export default withTheme(Updates);
