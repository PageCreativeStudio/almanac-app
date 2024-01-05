import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  position: relative;
  width: 100%;
  overflow-x: scroll;
  /* custom scrollbar */
  ::-webkit-scrollbar {
    height: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(205, 205, 205, 0.2);
    border-radius: 20px;
    border: 9px solid #f8f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 20px;
    border: 9px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }
` 

const lineStyling = (props) => css`
  position: absolute;
  left: 0;
  top: 0.7rem;
  height: 0.1rem;
  width: 100%;
  background-color: ${props.theme.colors.darkGrey};
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

const dateWrapper = (props) => css`
  position: relative;
  z-index: 1;
`

export const Wrapper = styled(Flex)(wrapperStyling);
export const DateWrapper = styled(Flex)(dateWrapper);
export const Title = styled.h4(titleStyling);
export const Text = styled.p(textStyling);
export const Circle = styled.div(circleStyling);
export const Line = styled.div(lineStyling);
