import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Box } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  position: relative;
  max-height: 80vh;
  overflow-y: scroll;
  /* custom scrollbar */
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(205, 205, 205, 0.2);
    border-radius: 20px;
    border: 9px solid #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 20px;
    border: 9px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
` 

const lineStyling = (props) => css`
  position: absolute;
  left: 0.7rem;
  top: 0;
  height: 100%;
  width: 0.1rem;
  background-color: ${props.theme.colors.darkGrey};
  z-index: -1;
`

const titleStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
   font-size: ${props.theme.fontSizes[3]};
`

const textStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.light};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[0]};
  margin-bottom: 0.5rem;
`

const circleStyling = (props) => css`
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50rem;
  background-color: ${props.colour};
`

export const Wrapper = styled(Box)(wrapperStyling);
export const Title = styled.h4(titleStyling);
export const Text = styled.p(textStyling);
export const Circle = styled.div(circleStyling);
export const Line = styled.div(lineStyling);
