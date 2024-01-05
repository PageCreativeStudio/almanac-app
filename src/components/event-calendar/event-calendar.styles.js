import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Box } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  background-color: ${props.theme.colors.light};
  border-radius: 1.2rem;
  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props.theme.spacing[3]};
    @media screen and (max-width: 900px) {
      margin-bottom: ${props.theme.spacing[1]};
    }
  }

  button.react-calendar__navigation__label {
    flex-grow: 0 !important;  
    font-weight: ${props.theme.fontWeights.black};
    text-transform: uppercase;
    background: none;
    border: none;
    font-size: ${props.theme.fontSizes[6]};
    color: ${props.theme.colors.primary};
    margin: 0 ${props.theme.spacing[0]};
    @media screen and (max-width: 900px) {
      font-size: ${props.theme.fontSizes[3]};
    }
  }

  .react-calendar__navigation__arrow {
    background: none;
    border: none;
    cursor: pointer;
  }
  .react-calendar__month-view__days {
    @media screen and (max-width: 900px) {
      margin-bottom: ${props.theme.spacing[1]};
    }
  }

  button.react-calendar__tile {
    flex: auto !important;
    width: 14% !important;
    position: relative;
    background: none;
    border: none;
    height: 8rem;
    font-weight: ${props.theme.fontWeights.medium};
    color: ${props.theme.colors.dark};
    @media screen and (max-width: 900px) {
      height: 5rem;
      font-size: ${props.theme.fontSizes[0]};
      padding: 0;
    }
    abbr {
      position: relative;
      z-index: 1;
      width: 3.6rem;
      height: 3.6rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50rem;
      @media screen and (max-width: 900px) {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: ${props.theme.spacing[1]};
  }

  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    font-weight: ${props.theme.fontWeights.semibold};
    text-transform: uppercase;
    color: ${props.theme.colors.dark};
    font-size: ${props.theme.fontSizes[2]};
    @media screen and (max-width: 900px) {
      font-size: ${props.theme.fontSizes[0]};
    }
    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.2;
  }
  ${mapColours(props)}
  .gradient-color {
    position: relative;
    abbr {
      cursor: pointer;
      color: ${props.theme.colors.light};
      font-weight: ${props.theme.fontWeights.semibold};
      background: rgb(226,55,52);
      background: linear-gradient(93deg, rgba(226,55,52,1) 0%, rgba(55,199,210,1) 100%) !important;
    }
    &:before {
      transition: 0.3s;
      border-radius: 50rem;
      color: ${props.theme.colors.light};
      font-weight: ${props.theme.fontWeights.semibold};
      opacity: 0;
      content: '';
      width: 3.6rem;
      height: 3.6rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    @media screen and (max-width: 900px) {
      &:before {
      transition: 0.3s;
      border-radius: 50rem;
      color: ${props.theme.colors.light};
      font-weight: ${props.theme.fontWeights.semibold};
      opacity: 0;
      content: '';
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      }
    }
    &.active {
      &:before {
        transition: 0.3s;
        border-radius: 50rem;
        background: rgb(226,55,52);
        background: linear-gradient(93deg, rgba(226,55,52,1) 0%, rgba(55,199,210,1) 100%) !important;
        opacity: 0.3;
        content: '';
        width: 5rem;
        height: 5rem;
        @media screen and (max-width: 900px) {
          width: 3.4rem;
          height: 3.4rem;
        }
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
      }
    }
  }
`

const mapColours = (props) => {
  let styles = ""
  props.colors.forEach((color, i) => {
    styles += `.C${color.replace(/^#/, "")} {
      position: relative;
      &:before {
        transition: 0.3s;
        border-radius: 50rem;
        background: ${color};
        opacity: 0;
        content: '';
        width: 3.6rem;
        height: 3.6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      @media screen and (max-width: 900px) {
        &:before {
        transition: 0.3s;
        border-radius: 50rem;
        background: ${color};
        opacity: 0;
        content: '';
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        }
      }
      &.active {
        &:before {
          transition: 0.3s;
          border-radius: 50rem;
          background: ${color};
          opacity: 0.3;
          content: '';
          width: 5rem;
          height: 5rem;
          @media screen and (max-width: 900px) {
            width: 3.4rem;
            height: 3.4rem;
          }
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%)
        }
      }
      abbr {
        cursor: pointer;
        background: ${color};
        color: ${props.theme.colors.light};
        font-weight: ${props.theme.fontWeights.semibold};
      }
    }`
  })
  return styles
}

const hiddenStyling = () => css`
  display: none;
`

const circleStyling = (props) => css`
  height: 1rem;
  width: 1rem;
  border-radius: 50rem;
  background-color: ${props.colour};
  margin-right: 0.5rem;
  flex-shrink: 0;
`

const absoluteStyling = () => css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  height: 100%;
`

export const Wrapper = styled(Box)(wrapperStyling);
export const Hidden = styled.div(hiddenStyling);
export const Absolute = styled.div(absoluteStyling);
export const Circle = styled.div(circleStyling);
