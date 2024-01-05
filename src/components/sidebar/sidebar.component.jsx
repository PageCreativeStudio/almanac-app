import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Flex, Box } from 'reflexbox'
import { Wrapper, Logo, Title, Text, NavItem, FooterLink, FooterSocialLink, FooterWrapper, HiddenSmall } from "./sidebar.style";
import { withTheme } from '@emotion/react'
import useOutsideAlerter from '../../hooks/click-outside-component';

import img from '../../assets/images/logo.jpg'
import calendarIcon from '../../assets/svgs/calendar-icon';
import committeesIcon from '../../assets/svgs/committees-icon';
import contactIcon from '../../assets/svgs/contact-icon';
import dashboardIcon from '../../assets/svgs/dashboard-icon';
import officersIcon from '../../assets/svgs/officers-icon';
import corporateIcon from '../../assets/svgs/corporate-icon';

import facebookIcon from '../../assets/svgs/facebook';
import youtubeIcon from '../../assets/svgs/youtube';
import linkedinIcon from '../../assets/svgs/linkedin';
import twitterIcon from '../../assets/svgs/twitter';
import instagramIcon from '../../assets/svgs/instagram';


const Sidebar = ({theme, left, onOutsideClick, onMenuClick}) => {
  const sidebarRef = useRef(null)

  useOutsideAlerter(sidebarRef, onOutsideClick,)

  return (
    <Wrapper ref={sidebarRef} left={left} flexWrap="wrap" width={theme.sidebarWidth} alignItems="space-between" justifyContent="center">
      <Box width="100%" className="navbar navbar-expand navbar-dark bg-dark">
        <Box marginBottom={theme.spacing[3]}>
          <NavLink className="navbar-brand" to="/">
            <Flex flexDirection="column" alignItems="center">
              <Logo src={img} alt="FMC Logo" />
              <Title>ALMANAC</Title>
            </Flex>
          </NavLink>
        </Box>
        <nav>
          <ul>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/">
                <Box marginTop="0.1rem" marginRight={theme.spacing[0]}>
                  {dashboardIcon}
                </Box>
                <HiddenSmall>Dashboard</HiddenSmall>
              </NavItem>
            </li>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/calendar">
                <Box marginTop="0.2rem" marginRight={theme.spacing[0]}>
                  {calendarIcon}
                </Box>
                <HiddenSmall>Calendar</HiddenSmall>
              </NavItem>
            </li>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/committees">
                <Box marginRight={theme.spacing[0]}>
                  {committeesIcon}
                </Box>
                <HiddenSmall>Committees</HiddenSmall>
              </NavItem>
            </li>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/corporate-membership">
                <Box marginRight={theme.spacing[0]}>
                  {corporateIcon}
                </Box>
                <HiddenSmall>Corporate Membership</HiddenSmall>
              </NavItem>
            </li>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/the-court">
                <Box marginTop="0.1rem" marginRight={theme.spacing[0]}>
                  {officersIcon}
                </Box>
                <HiddenSmall>The Court</HiddenSmall>
              </NavItem>
            </li>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/charity-roles">
                <Box marginTop="0.1rem" marginRight={theme.spacing[0]}>
                  {committeesIcon}
                </Box>
                <HiddenSmall>Livery and Charity Roles</HiddenSmall>
              </NavItem>
            </li>
            <li>
              <NavItem onClick={onMenuClick && onMenuClick} to="/contact">
                <Box marginTop="0.1rem" marginRight={theme.spacing[0]}>
                  {contactIcon}
                </Box>
                <HiddenSmall>Contact</HiddenSmall>
              </NavItem>
            </li>
          </ul>
        </nav>
      </Box>
      <FooterWrapper flexWrap="wrap" flexDirection="column" justifyContent="flex-end" alignItems="center">
        <FooterLink target="_blank" href="https://www.furnituremakers.org.uk/">furnituremakers.org.uk</FooterLink>
        <FooterLink href="mailto:hello@furnituremakers.org.uk">hello@furnituremakers.org.uk</FooterLink>
        <FooterLink href="tel:02072565558">020 7256 5558</FooterLink>
        <Flex marginTop={theme.spacing[1]} alignItems="center" justifyContent="center">
          <FooterSocialLink target="_blank" href="https://twitter.com/FurnitureMkrsCo">
            {twitterIcon}
          </FooterSocialLink>
          <FooterSocialLink target="_blank" href="https://www.facebook.com/FurnitureMakersCompany">
           {facebookIcon}
          </FooterSocialLink>
          <FooterSocialLink target="_blank" href="https://www.linkedin.com/company/the-furniture-makers-company/">
            {linkedinIcon}
          </FooterSocialLink>
          <FooterSocialLink target="_blank" href="https://www.instagram.com/furnituremakerscompany/">
            {instagramIcon}
          </FooterSocialLink>
          <FooterSocialLink target="_blank" href="https://www.youtube.com/channel/UCcZXA8T0QA25dJ5brUatoRA">
            {youtubeIcon}
          </FooterSocialLink>
        </Flex>
      </FooterWrapper>
    </Wrapper>
  );
}

export default withTheme(Sidebar);
