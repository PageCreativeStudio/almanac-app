import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'
// Set default styles for component
const wrapperStyling = (props) => css`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: ${props.theme.colors.light};
  margin-left: 14rem;
  @media screen and (max-width: 1350px) {
    margin-left: 9rem;
  }
  @media screen and (max-width: 639px) {
    margin-left: 0rem;
  }
`


export const Wrapper = styled(Flex)(wrapperStyling);

