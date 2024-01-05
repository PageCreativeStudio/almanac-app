import emotionReset from 'emotion-reset';
import { css } from "@emotion/react";

export const GlobalStyles = (props) =>  css`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap');
  ${emotionReset}
  html, body {
    font-size: 10px;
    font-family: Montserrat, sans-serif;
    color: ${props.colors.dark};
    line-height: ${props.lineHeights.base};
    background: ${props.colors.primaryLight};
    background: ${props.gradients.main};
  }
  * {
    box-sizing: border-box;
    font-size: ${props.fontSizes[2]};
  }
  a {
    text-decoration: none;
    font-size: ${props.fontSizes[2]};
    color: ${props.colors.dark};
  }
`