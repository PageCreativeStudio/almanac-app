import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Box } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
position: relative;
@media screen and (max-width: 1350px) {
  margin-left: 9rem;
  padding: 10rem 4rem 0;
}
@media screen and (max-width: 639px) {
  margin-left: 0rem;
  padding: 15rem 2rem 0;
}
}
`

export const Wrapper = styled(Box)(wrapperStyling);
