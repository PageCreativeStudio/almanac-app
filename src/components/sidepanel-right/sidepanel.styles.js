import styled from '@emotion/styled'
import {css} from '@emotion/react'
import { Flex } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  height: 100vh;
  background-color: ${props.theme.colors.light};
  box-shadow: 0 15px 65px rgba(219, 230, 240, 0.16);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000;
  transition: 0.3s;
  @media screen and (max-width: 1023px) {
    right: ${props.right};
  }
  @media screen and (min-width: 1024px) and (max-width: 1350px) {
    width: 32%;
  }
`

export const Wrapper = styled(Flex)(wrapperStyling);