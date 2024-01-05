import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { Global } from "@emotion/react";
import { GlobalStyles } from './App.styles.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Sidebar, Container } from './components';
import CharityRoles from './pages/charity-roles';
import {
  Dashboard,
  Committees,
  Contact,
  Calendar,
  TheCourt,
  CorporateMembership
} from "./pages";
import { MobileHeader } from './components/mobile-header';
import MemberInfo from './pages/member-info';
import useScript from './hooks/useScript';


const App = () => {
  useScript("https://cdn.jsdelivr.net/gh/nwcell/ics.js@0.2.0/ics.deps.min.js")

  const [isMenuActive, setIsMenuActive] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Router>
        <Sidebar onMenuClick={() => setIsMenuActive(false)} onOutsideClick={() => setIsMenuActive(false)} left={!isMenuActive ? '-100%' : '0'} />
        <MobileHeader onClick={() => setIsMenuActive(!isMenuActive)} />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/committees" element={<Committees />} />
            <Route exact path="/the-court" element={<TheCourt />} />
            <Route exact path="/corporate-membership" element={<CorporateMembership />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/charity-roles" element={<CharityRoles />} />
            <Route exact path="/member" element={<MemberInfo />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
