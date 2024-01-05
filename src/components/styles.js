import styled from '@emotion/styled'
import {css} from '@emotion/react';

const titleStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[6]};
  margin-bottom: ${props.theme.spacing[1]};
`

const largeTitleStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[8]};
  margin-bottom: ${props.theme.spacing[1]};
  @media screen and (max-width: 1700px) {
    font-size: ${props.theme.fontSizes[6]};
  }
`

const lightTextStyling = (props) => css`
  color: ${props.theme.colors.darkGrey};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[6]};
  margin-bottom: ${props.theme.spacing[1]};
`

const textStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.body };
  line-height: ${props.theme.lineHeights.medium};
  font-size: ${props.theme.fontSizes[3]};
  b {
    color: ${props.theme.colors.primary};
    font-weight: ${props.theme.fontWeights.bold};
  }
`

const tileStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
   font-size: ${props.theme.fontSizes[3]};
`

const imageStyling = (props) => css`
  width: 100%;
`
export const Image = styled.img(imageStyling);
export const LightText = styled.span(lightTextStyling);
export const H1Title = styled.h1(titleStyling);
export const LargeH1Title = styled.h1(largeTitleStyling);
export const PText = styled.p(textStyling);
export const SpanText = styled.p(textStyling);
export const Title = styled.h4(tileStyling);
