import React from "react";
import { Logo } from "../sidebar/sidebar.style";
import img from '../../assets/images/logo.jpg'
import { Wrapper } from "./mobile-header-styles";
import { Link } from "react-router-dom";

const MobileHeader = ({onClick}) => {  
  return (
    <Wrapper alignItems="center" justifyContent="space-between">
      <Link to="/">
        <Logo src={img} alt="FMC Logo" />
      </Link>
      <svg onClick={onClick && onClick} xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20">
          <g id="Group_145" data-name="Group 145" transform="translate(-115.5 -769.5)">
            <line id="Line_13" data-name="Line 13" x2="24" transform="translate(116.5 770.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2"/>
            <line id="Line_14" data-name="Line 14" x2="24" transform="translate(116.5 779.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2"/>
            <line id="Line_15" data-name="Line 15" x2="24" transform="translate(116.5 788.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2"/>
          </g>
      </svg>
    </Wrapper>
  )
}

export default MobileHeader