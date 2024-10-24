import React, { useState } from "react";
import { Box } from "reflexbox";
import { H1Title, PText, FlexContainer } from "../components/styles";
import getData from "../helpers/get-data";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";
import { withTheme } from "@emotion/react";
import DownloadIcon from '../assets/svgs/download-event';
import PrintIcon from '../assets/svgs/print';
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

    return `${weekday} ${day}${getOrdinalSuffix(day)} ${month} ${year}${time ? ` | ${time}` : ''}`;
};

const parseDateTime = (date, time) => {
    const dateObj = new Date(date);
    if (time) {
        const timeParts = time.match(/(\d+):(\d+)\s*([ap]m)/i);
        if (timeParts) {
            let hours = parseInt(timeParts[1], 10);
            const minutes = parseInt(timeParts[2], 10);
            const period = timeParts[3].toLowerCase();
            if (period === "pm" && hours !== 12) hours += 12;
            if (period === "am" && hours === 12) hours = 0;
            dateObj.setHours(hours, minutes);
        }
    } else {
        dateObj.setHours(23, 59, 59, 999); // End of day if no time specified
    }
    return dateObj;
};

const isEventAvailable = (event) => {
    const now = new Date();
    const startDateTime = parseDateTime(event.date_from, event.time);
    const endDateTime = parseDateTime(event.date_to || event.date_from, event.time_end || event.time);
    
    return endDateTime >= now;
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

    const handlePrint = () => {
        const availableEvents = updates?.acf?.updated_events?.filter(isEventAvailable);
        
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow pop-ups to print the events.');
            return;
        }
    
        const printContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Print Events</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            margin: 0;
                        }
                        h1 { 
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .event { 
                            margin: 20px 0; 
                            border-bottom: 1px solid #cccccc; 
                            padding-bottom: 10px; 
                        }
                        .event-title { 
                            font-weight: bold; 
                            font-size: 20px; 
                        }
                        .event-date { 
                            font-size: 15px; 
                            color: #555; 
                        }
                        .event-description { 
                            font-size: 17px; 
                            font-weight: 200; 
                            line-height: 1.5;
                            color: #555; 
                        }
                        @media print {
                            body { 
                                width: 100%;
                                margin: 0;
                                padding: 15px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <h1>Calendar Event Updates Log</h1>
                    ${availableEvents?.length > 0
                        ? availableEvents.map(event => `
                            <div class="event">
                                <div class="event-title">${event.title}</div>
                                <div class="event-date">
                                    ${event.date_from || event.time ? `
                                        <span style="font-size: 15px; padding-right: 3rem; font-weight: 700; margin-bottom: 15px;">
                                            ${formatEventDate(event.date_from)}
                                            ${event.date_to ? ` - ${formatEventDate(event.date_to)}` : ''}
                                            ${event.time || event.time_end ? ` | ${event.time}${event.time_end ? ` - ${event.time_end}` : ''}` : ''}
                                        </span>
                                    ` : ''}
                                </div>
                                ${event.description ? `
                                    <div class="event-description">
                                        <span>${event.description.replace(/<\/?[^>]+(>|$)/g, " ")}</span>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')
                        : '<p>No upcoming events available.</p>'}
                    <script>
                        window.onload = function() {
                            window.print();
                            setTimeout(function() {
                                window.close();
                            }, 500);
                        }
                    </script>
                </body>
            </html>
        `;
    
        printWindow.document.write(printContent);
        printWindow.document.close();
    };

    const availableEvents = updates?.acf?.updated_events?.filter(isEventAvailable) || [];
    const hasAvailableEvents = availableEvents.length > 0;

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
                                {hasAvailableEvents && (
                                    <button
                                        onClick={handlePrint}
                                        style={{
                                            marginLeft: "1rem",
                                            border: "none",
                                            background: "none",
                                            textDecoration: "underline",
                                            color: "#e23734",
                                            fontSize: "19px",
                                            textDecorationOffset: "4px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <PrintIcon />
                                    </button>
                                )}
                            </H1Title>
                            <PText>
                                {updates.acf.description}
                            </PText>
                        </Box>
                    )}
                    {hasAvailableEvents ? (
                        availableEvents.map((event, index) => (
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
                                                        {event.date_to && ` - ${formatEventDate(event.date_to)}`}
                                                        {(event.time || event.time_end) && ` | ${event.time}${event.time_end ? ` - ${event.time_end}` : ''}`}
                                                    </Text>
                                                )}
                                                {event.description && (
                                                    <OverflowWrapper scroll="auto">
                                                        <Text style={{ fontSize: "17px", fontWeight: "400", textTransform: "none", lineHeight: "27px", maxWidth: "57rem" }} dangerouslySetInnerHTML={{ __html: event.description }} />
                                                    </OverflowWrapper>
                                                )}
                                            </Title>
                                            <a style={{ placeSelf: "baseline" }} href="#" onClick={(e) => { e.preventDefault(); handleDownload(event); }}>
                                                <DownloadIcon />
                                            </a>
                                        </FlexContainer>
                                    )}
                                </ContentWrapper>
                            </Wrapper>
                        ))
                    ) : (
                        <PText>No events available at this time.</PText>
                    )}
                </Box>
            )}
        </>
    );
};

export default withTheme(Updates);
