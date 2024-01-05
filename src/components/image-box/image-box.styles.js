import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  padding: ${props.theme.spacing[1]};
  background-color: ${props.theme.colors.light};
  position: relative;
  height: 25rem;
  width: 25rem;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const overlayStyling = (props) => css`
  padding: ${props.theme.spacing[0]} ${props.theme.spacing[1]};
  background-color: ${props.theme.colors.primary};
  transition: 0.3s;
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  &:hover {
    opacity: 1;
  }
`

const titleStyling = (props) => css`
  color: ${props.theme.colors.light};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  margin-bottom: ${props.theme.spacing[0]};
  font-size: ${props.theme.fontSizes[4]};
`

const textStyling = (props) => css`
  color: ${props.theme.colors.light};
  font-weight: ${props.theme.fontWeights.body};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[1]};
  margin-bottom:  ${props.theme.spacing[0]};
`

const imageStyling = () => css`
  max-width: 100%;
`

const linkStyling = () => css`
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`


export const Wrapper = styled(Flex)(wrapperStyling);
export const Overlay = styled(Flex)(overlayStyling);
export const Image = styled.img(imageStyling);
export const Title = styled.h4(titleStyling);
export const Text = styled.span(textStyling);
export const Link = styled.a(linkStyling);
