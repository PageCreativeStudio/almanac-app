import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'
import { NavLink } from "react-router-dom";
import { lighten } from 'polished';

// Set default styles for component
const wrapperStyling = (props) => css`
  height: 100vh;
  padding: ${props.theme.spacing[4]} ${props.theme.spacing[1]};
  background-color: ${props.theme.colors.light};
  box-shadow: 0 15px 65px rgba(219, 230, 240, 0.16);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  transition: 0.3s;
  @media screen and (max-width: 1350px) {
    width:9rem;
  }
  @media screen and (max-width:639px) {
    width: 85%;
    left: ${props.left};
    overflow-y: scroll;
  }
`
const titleStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[6]};
  @media screen and (max-width: 1350px) {
    display:none;
  }
  @media screen and (max-width:639px) {
    display:block;
  }
`
const textStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.medium};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[2]};
  @media screen and (max-width: 1350px) {
    display:none;
  }
  @media screen and (max-width:639px) {
    display:block;
  }
`

const logoStyling = (props) => css`
  margin-bottom: ${props.theme.spacing[0]};
`

const navItemStyling = (props) => css`
  padding: 2rem 1.2rem;
  background-color: ${props.theme.colors.light};
  line-height: ${props.theme.lineHeights.base};
  border-radius: 1rem;
  font-weight: ${props.theme.fontWeights.medium};
  color: ${props.theme.colors.darkGrey};
  display: flex;
  align-items: center;
  transition: 0.2s;
  &:hover {
    color: ${props.theme.colors.primary};
  }
  &.active {
    background-color: ${lighten('0.4', `${props.theme.colors.primary}`)};
    color: ${props.theme.colors.primary};
  }
`

const footerLinkStyling = (props) => css`
  margin-bottom: ${props.theme.spacing[0]};
  font-size: ${props.theme.fontSizes[0]};
  color: ${props.theme.colors.darkGrey};
  margin-bottom: ${props.theme.spacing[0]};
  &:hover {
    color: ${props.theme.colors.primary};
  }
`

const footerSocialLinkStyling = (props) => css`
  margin: 0  ${props.theme.spacing[0]};
  display: inherit;
  &:hover {
    color: ${props.theme.colors.primary};
  }
`
const hiddenSmall = (props) => css`
  @media screen and (max-width: 1350px) {
    display:none;
  }
  @media screen and (max-width:639px) {
    display:flex;
  }
`

export const Wrapper = styled(Flex)(wrapperStyling);
export const Title = styled.span(titleStyling);
export const Text = styled.span(textStyling);
export const Logo = styled.img(logoStyling);
export const NavItem = styled(NavLink)(navItemStyling);
export const FooterLink = styled.a(footerLinkStyling);
export const FooterSocialLink = styled.a(footerSocialLinkStyling);
export const FooterWrapper = styled(Flex)(hiddenSmall);
export const HiddenSmall = styled.div(hiddenSmall);

