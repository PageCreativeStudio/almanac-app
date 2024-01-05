import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'
import { lighten } from 'polished';

// Set default styles for component
const wrapperStyling = (props) => css`
  padding: ${props.theme.spacing[1]} ${props.theme.spacing[2]};
  background-color: ${props.primary ? props.theme.colors.primary : props.theme.colors.light};
  outline: ${props.primary ? 'none' : `0.1rem solid ${props.theme.colors.dark}`};
  border-radius: 1rem;
`

const titleStyling = (props) => css`
  color: ${props.primary ? props.theme.colors.light : props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  margin-bottom: ${props.theme.spacing[0]};
  font-size: ${props.theme.fontSizes[3]};
`

const textStyling = (props) => css`
  color: ${props.primary ?  lighten('0.44', `${props.theme.colors.primary}`) : props.theme.colors.darkGrey};
  font-weight: ${props.theme.fontWeights.body};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[1]};
  word-break: break-all;
  @media screen and (max-width: 600px) {
    font-size: ${props.theme.fontSizes[0]};
  }
`

const textBoldStyling = (props) => css`
  display: block;
  width: 100%;
  color: ${props.primary ?  lighten('0.44', `${props.theme.colors.primary}`) : props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.bold};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[1]};
  margin-top: 0.4rem;
  word-break: break-all;
  @media screen and (max-width: 600px) {
    font-size: ${props.theme.fontSizes[0]};
  }
`


const smallTextStyling = (props) => css`
  color: ${props.primary ?  lighten('0.44', `${props.theme.colors.primary}`) : props.theme.colors.darkGrey};
  font-weight: ${props.theme.fontWeights.bold};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[0]};
`

const imageStyling = (props) => css`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 100rem;
  margin-bottom: 1rem;
`

const circleStyle = (props) => css`
  width: 0.8rem;
  height: 0.8rem;
  object-fit: cover;
  border-radius: 100rem;
  background-color: ${props.color};
  display:block;
  margin-top: 0.2rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
`

const eventsWrapperStyling = (props) => css`
  position: relative;
  cursor: pointer;
`

const eventsStyling = (props) => css`
  transition: 0.3s;
  opacity: ${props.show ? '1' : '0'};
  position: absolute;
  width: 24rem;
  top: calc(100% + 0.5rem);
  left: 0;
  border-radius: 0rem 0rem 1rem 1rem;
  box-shadow: 0px 2px 15px rgba(0, 0 , 0, 0.15);
  background: ${props.theme.colors.light};
  padding: ${props.theme.spacing[0]} ${props.theme.spacing[20]};
  border-top: 2px solid ${props.theme.colors.primary};
`

const linkStyling = (props) => css`
  color: ${!props.primary ?  props.theme.colors.primary : props.theme.colors.darkGrey};
  text-decoration: underline;
  font-weight: ${props.theme.fontWeights.bold};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[1]};
  margin-top: 0.4rem;
  word-break: break-all;
  @media screen and (max-width: 600px) {
    font-size: ${props.theme.fontSizes[0]};
  }
`






export const Wrapper = styled(Flex)(wrapperStyling);
export const EventsWrapper = styled(Flex)(eventsWrapperStyling);
export const Events = styled.div(eventsStyling);
export const Title = styled.h4(titleStyling)
export const TextBold = styled.span(textBoldStyling);
export const Text = styled.span(textStyling);
export const Circle = styled.div(circleStyle);
export const Link = styled.div(linkStyling);
export const SmallText = styled.span(smallTextStyling);
export const Image = styled.img(imageStyling);
