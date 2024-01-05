import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex, Box } from 'reflexbox'

// Set default styles for component
const accordianStyling = (props) => css`
  padding: ${props.theme.spacing[1]} ${props.theme.spacing[2]};
  background-color: ${props.theme.colors.light};
  color: ${props.theme.colors.dark};
  cursor: pointer;
  width: 100%;
  border: none;
  outline: none;
  width: 100%;
  transition: 0.3s;
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[3]};
  margin-bottom: ${props.theme.spacing[1]};
  &:hover {
    color: ${props.theme.colors.primary};
  }
`

const panelStyling = (props) => css`
  display: ${props.active ? "block" : "none"};
  width: 100%;
  padding: ${props.theme.spacing[2]};
  background-color: ${props.theme.colors.light};
`

export const AccordianTitle = styled(Flex)(accordianStyling);
export const Panel = styled(Box)(panelStyling);
