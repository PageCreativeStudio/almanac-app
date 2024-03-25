import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Box } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  height: 100%;
  border-top: 1rem solid ${props.colour};
  width: 100%;
`

const contentWrapperStyling = (props) => css`
  width: 100%;  
  padding: ${props.theme.spacing[3]} ${props.theme.spacing[3]};
  @media screen and (max-width: 900px) {
    padding: ${props.theme.spacing[1]} ${props.theme.spacing[1]};
    overflow-y: scroll;
    height: 60vh;
  }
`

const titleStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  margin-bottom: ${props.theme.spacing[1]};
  text-transform: uppercase;
  font-size: ${props.theme.fontSizes[6]};
  @media screen and (max-width: 900px) {
    font-size: ${props.theme.fontSizes[4]};
  }
`
export const DescriptionLink = styled.span`
  a {
    color: rgb(226, 55, 52);
    text-decoration: underline;
    cursor: pointer;
  }
`;


const textStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.light};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[3]};
  margin-bottom: 0.5rem;
`

const circleStyling = (props) => css`
  height: 2rem;
  width: 2rem;
  border-radius: 50rem;
  background-color: ${props.colour};
  margin-right: ${props.theme.spacing[0]};
  margin-top: 0.7rem;
  flex-shrink: 0;
  @media screen and (max-width: 900px) {
    height: 1.4rem;
    width: 1.4rem;
    margin-top: 0.5rem;
  }
`

const imageStyling = (props) => css`
  height: 35%;
  width: 100%;
  background-image: url(${props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const overflowWrapperStyling = (props) => css `
  height: ${props.height};
  overflow-y: ${props.scroll};
  @media screen and (max-width: 900px) {
    overflow-y: initial;
    height: auto;
  }
  padding-right: ${props.theme.spacing[0]};
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

const backArrowStyling = (props) => css `
  cursor: pointer;
`


export const Wrapper = styled(Box)(wrapperStyling);
export const Title = styled.h4(titleStyling);
export const Text = styled.p(textStyling);
export const BackArrow = styled(Box)(backArrowStyling);
export const Circle = styled.div(circleStyling);
export const Image = styled.div(imageStyling);
export const ContentWrapper = styled(Box)(contentWrapperStyling);
export const OverflowWrapper = styled(Box)(overflowWrapperStyling);

