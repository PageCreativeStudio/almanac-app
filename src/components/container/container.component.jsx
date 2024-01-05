import React from "react";
import { Box } from 'reflexbox'
import { withTheme } from '@emotion/react'
import { Wrapper } from "./container.styles";

const Container = ({children, theme}) => <Wrapper 
  marginLeft={theme.sidebarWidth} 
  paddingTop={theme.spacing[7]} 
  paddingLeft={[theme.spacing[0], theme.spacing[3], theme.spacing[3], theme.spacing[6]]}
  paddingRight={[theme.spacing[0], theme.spacing[3], theme.spacing[3], theme.spacing[6]]}>
    {children}
  </Wrapper>

export default withTheme(Container);