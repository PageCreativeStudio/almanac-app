import React, { useEffect, useState } from "react";
import { Flex, Box } from "reflexbox";
import Accordian from "../components/accordian/accordian.component";
import { InfoCard } from "../components/info-card";
import { InfoPopup } from "../components/info-popup";
import { Loading } from "../components/loading";
import { H1Title } from "../components/styles";
import getData from "../helpers/get-data";
import { useEffectOnce } from "../hooks/use-effect-once";
import PrintIcon from '../assets/svgs/print';
import formatDate from '../helpers/format-date';

const Committees = () => {
  const [committees, setCommittees] = useState(null);
  const [accordianEvents, setAccordianEvents] = useState([]); 

  // Fetch page data
  useEffectOnce(() => {
    getData(null, 359, setCommittees).catch(console.error);
  }, []);

  useEffect(() => {
    if (committees && committees.acf && committees.acf.areas) {
      const today = new Date();
      const filteredEvents = committees.acf.areas
        .flatMap((area) => area.events || [])
        .filter(event => {
          const eventDate = new Date(event.acf?.date_from);
          return eventDate >= today; // Only include future events
        });
      setAccordianEvents(filteredEvents);
    }
  }, [committees]);

  const handlePrint = () => {
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
          <title>Committees Events Print</title>
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
          <h1>Committees Events</h1>
          ${accordianEvents.length > 0
        ? accordianEvents.map(event =>
          `<div class="event">
                <div class="event-title">${event.post_title}</div>
                <div class="event-date">
                  ${event.acf?.date_from ?
            `<span style="font-size: 15px; padding-right: 3rem; font-weight: 700; margin-bottom: 15px;">
                      ${formatDate(event.acf.date_from)}
                      ${event.acf.date_to ? ` - ${formatDate(event.acf.date_to)}` : ''}
                      ${event.acf.time || event.acf.time_end ? ` | ${event.acf.time}${event.acf.time_end ? ` - ${event.acf.time_end}` : ''}` : ''}
                    </span>`
            : ''}
                </div>
                ${event.acf?.description ?
            `<div class="event-description">
                    <span>${event.acf.description.replace(/<\/?[^>]+(>|$)/g, " ")}</span>
                  </div>`
            : ''}
              </div>`
        ).join('')
        : '<p>No events available.</p>'}
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

  const hasAvailableEvents = committees?.acf?.areas?.some(area => area.events?.length > 0);

  return (
    <>
      {!committees ? (
        <Loading />
      ) : (
        (committees && committees.acf) && (
          <H1Title>
            <Flex alignItems="center" flexWrap="wrap">
              <Flex alignItems="center">
                COMMITTEES
                <Box marginLeft="1.5rem">
                  <InfoPopup width="37rem">
                    {committees.acf.infobox_text}
                  </InfoPopup>
                </Box>
              </Flex>
              {hasAvailableEvents && (
                <Flex alignItems="center">
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
                </Flex>
              )}
            </Flex>
          </H1Title>
        )
      )}

      {(committees && committees.acf && committees.acf.areas) && committees.acf.areas.map(({ title, member, events }) => (
        <Accordian events={events} key={title} title={title} showPastEvents={true}>
          {member && (
            <Flex flexWrap="wrap">
              {member.map(({ acf: { image, name, phone_1, phone_2, email, roles, events } }, i) => (
                <InfoCard key={name}
                  primary={false}
                  width={['100%', '100%', '100%', 'calc(50% - 2rem)']}
                  image={image ? image.url : null}
                  title={name}
                  phone1={phone_1}
                  phone2={phone_2}
                  email={email}
                  events={events}
                  textList={roles && roles.map(role => role.role)}
                />
              ))}
            </Flex>
          )}
        </Accordian>
      ))}
    </>
  );
}

export default Committees;
