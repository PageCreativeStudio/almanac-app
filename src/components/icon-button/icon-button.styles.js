import styled from '@emotion/styled/macro';
import { css } from '@emotion/react/macro';
import { Link } from 'react-router-dom';
import { Box } from 'reflexbox';

// Set default styles for component
const iconButtonStyling = (props) => css`
  position: relative; 
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 1000rem;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  color: ${props.theme.colors.dark}; 
  font-size: 1.2rem;
  background:${props.theme.colors.light};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  min-width: 32px;
  padding: 0 1.2rem;
  height: 32px;
  justify-content: start;
  transition: 0.3s;
  &:visited  {
    background: ${props.theme.colors.primary}; 
  }
`

// Styles for button when dropdown is active
const iconButtonDropdownActiveStyling = (props) => {
  if(!props.dropdownActive) return
  return css`
    background: ${props.theme.colors.primary};
    ${IconWrapper} {
      filter: brightness(0) invert(1);
    }
  `
}

//Icon Wrapper Styles
const iconWrapperStyling = (props) => css`
  color: ${props.theme.colors.light}; 
  transition:  min-width 0.3s;
  width: 0.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  line-height: 0;
  justify-content: center;  
`

//Icon Styles
const iconAbsoluteStyling = (props) => css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const hoverTextStyling = (props) => css`
  padding-left: 0.5rem;
  position: absolute;
	left: 2.5rem;
	top: 0.5rem;
  opacity: 0;
  transition-delay: 0.3s;
  transition:  0.3s;
  white-space: nowrap;
`

const hoverDefaults = (props) => css`
    &:hover {
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.15);
    }
  `;
  
const hoverWithText = (props) =>
  (props.hoverText) &&
  css`
    &:hover {
      min-width: calc(${props.hoverTextWidth}px + 0.5rem + 2.4rem + 2rem);
      ${HoverText} {
        opacity: 1;
        left: 3rem;
        transition-delay: 0s;
      }
    }
  `;

const dropdownStyling = (props) => css`
  position: absolute;
	top: 3.5rem;
  opacity: 0;
  visibility: hidden;
  font-weight: ${props.theme.fontWeights.semibold};
  width: max-content;
  padding: ${props.theme.spacing[0]} ${props.theme.spacing[1]};
  background: ${props.theme.colors.light};
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  transition:  0.3s;
  ${Option}:last-child {
    margin-bottom: 0;
  }
`

const dropdownPositionStyling = (props) => {
  if (props.alignRight) {
    return css`
      right: 0rem;
    `
  } else {
    return css`
      left: 0rem;
    `
  }
}

const dropdownActiveStyling = (props) =>
  (props.dropdownActive) &&
  css`
    top: 4rem;
    visibility: visible;
    opacity: 1;
  `;

const dropdownOptionStyling = (props) => css`
  color: ${props.theme.colors.dark}; 
  background: ${props.theme.colors.light};
  font-size: ${props.theme.fontSizes[1]};
  line-height: ${props.theme.lineHeights.medium};
  transition:  0.3s;
  text-align: right;
`

const wrapperStyling = (props) => css`
  position: relative;
  display: inline-block;
`

export const StyledLink = styled(Link)(iconButtonStyling, hoverDefaults, hoverWithText);
export const Button = styled.button(iconButtonStyling, hoverDefaults, hoverWithText, iconButtonDropdownActiveStyling);
export const IconWrapper = styled.span(iconWrapperStyling);
export const IconAbsolute = styled.span(iconAbsoluteStyling);
export const HoverText = styled.span(hoverTextStyling);
export const DropDown = styled.div(dropdownStyling, dropdownPositionStyling, dropdownActiveStyling);
export const Option = styled.span(dropdownOptionStyling);
export const Wrapper = styled(Box)(wrapperStyling);