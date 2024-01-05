import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  padding: ${props.theme.spacing[0]} ${props.theme.spacing[1]};
  background-color: ${props.theme.colors.light};
  box-shadow: 0 15px 65px rgba(219, 230, 240, 0.16);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 49;
  display: none;
  width: 100%;
  @media screen and (max-width:639px) {
    display: flex;
  }
`

export const Wrapper = styled(Flex)(wrapperStyling);

