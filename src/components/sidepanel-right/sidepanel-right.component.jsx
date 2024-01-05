import React, { useRef } from 'react'
import useOutsideAlerter from '../../hooks/click-outside-component'
import { Wrapper } from './sidepanel.styles'

const SidepanelRight = ({width="40rem", children, right="0", onOutsideClick}) => {

  const sidebarRef = useRef(null)
  useOutsideAlerter(sidebarRef, onOutsideClick)
  
  return <Wrapper ref={sidebarRef} right={right} alignItems="center" flexWrap="wrap" width={width}>{children}</Wrapper>
}

export default SidepanelRight