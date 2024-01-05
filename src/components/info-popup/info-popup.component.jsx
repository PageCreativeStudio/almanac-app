import React from 'react';
import { Wrapper, HoverText } from './info-popup.styles';

const InfoPopup = ({width = "100%", children}) => {
  return (
    <Wrapper>
      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="7" cy="7.26498" rx="7" ry="7.18491" fill="#433F4D"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.30078 11.3795H7.70081V6.35117H6.30078V11.3795ZM6.30078 4.67609H7.70081V3H6.30078V4.67609Z" fill="white"/>
      </svg>
      <HoverText width={width}>
        {children}
      </HoverText>
    </Wrapper>
  );
}

export default InfoPopup;