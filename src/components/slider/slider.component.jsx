import React from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { Box, Flex } from 'reflexbox';

const arrowRight = <svg id="Group_107" data-name="Group 107" xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34">
  <rect id="Rectangle_18" data-name="Rectangle 18" width="33" height="34" fill="none"/>
  <line id="Line_6" data-name="Line 6" x2="23" transform="translate(5 16)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  <path id="Path_10" data-name="Path 10" d="M40,56l9.378,9.378L40,74.755" transform="translate(-21.39 -48.706)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
</svg>

const arrowLeft = <svg id="Group_31" data-name="Group 31" xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34">
  <rect id="Rectangle_18" data-name="Rectangle 18" width="33" height="34" fill="none"/>
  <line id="Line_6" data-name="Line 6" x1="23" transform="translate(5 16)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  <path id="Path_10" data-name="Path 10" d="M49.378,56,40,65.378l9.378,9.378" transform="translate(-34.988 -48.706)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
</svg>

const Slider = ({label, slides}) => {
  return (
    <>
      <Splide
        hasTrack={ false }
        options={{
          type   : 'slide',
          perPage: 4,
          gap    : '2rem',
          pagination: false,
          arrows: true,
          breakpoints : {
            1600: {
              perPage: 3,
            },
            1200: {
              perPage: 2,
            },
            767: {
              perPage: 1,
            }
          }
          
        }}
        aria-label={label}
        >
        <SplideTrack>
          {slides && slides.map((slides, i) => <SplideSlide key={i}>
            {slides}
          </SplideSlide>)}
        </SplideTrack>
        <Flex marginTop="2rem" justifyContent="end" className="splide__arrows">
          <Box padding="0 1rem" className="splide__arrow--prev" role="button">
            {arrowLeft}
          </Box>
          <Box padding="0 1rem" className="splide__arrow--next" role="button">
            {arrowRight}
          </Box>
        </Flex>
      </Splide>
    </> 
  )
}

export default Slider