import styled from '@emotion/styled/macro';
import {css} from '@emotion/react/macro';
import { Box } from 'reflexbox';

// Set default styles for component
const wapperStyling = (props) => css`
  position: relative;
  display: inline-block;
  z-index: 10;
  &:hover {
    ${HoverText} {
      opacity: 1;
      visibility: visible;
    }
  }
`

const hoverTextStyling = (props) => css`
  position: absolute;
  background-color: ${props.theme.colors.light};
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.semibold};
  transition: 0.3s linear;
  font-size: ${props.theme.fontSizes[1]};
  line-height: ${props.theme.lineHeights.base};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 1.3rem;
  padding: 1.5rem 2rem 1.8rem;
  left: 50%;
  top: calc(100% + 0.5rem);
  transform: translate(-50%, 0);
  opacity: 0;
  visibility: hidden;
`

export const Wrapper = styled(Box)(wapperStyling);
export const HoverText = styled(Box)(hoverTextStyling);
