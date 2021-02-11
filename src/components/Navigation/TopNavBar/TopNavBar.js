import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import NavigationItem from '../NavigationItem/NavigationItem';
import useWindowSize from '../../../hooks/useWindowSize/useWindowSize';
import obLogo from '../../../assets/SVGs/OB.svg';
import bigObLogo from '../../../assets/SVGs/OBSolutions.svg';

import './topNavBar.css';

const TopNavBar = props => {
  const {width} = useWindowSize ();

  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand className="ml-5">
          {width > 780
            ? <img
                className="top-nav-bar-big-logo"
                src={bigObLogo}
                alt="OB Solutions Logo"
              />
            : <img
                className="top-nav-bar-small-logo"
                src={obLogo}
                alt="OB Solutions Logo"
              />}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {/* <NavigationItem classes="mt-2 mr-3"  link="/" exact >Fuar Sözleşme</NavigationItem>
      <NavigationItem classes="mt-2 mr-3" link="/custom-contract">Sözleşme</NavigationItem>
      <NavigationItem classes="mt-2 mr-3" link="/plugins">Plugins</NavigationItem> */}
      <NavigationItem classes="mt-2 mr-3" exact link="/">Anasayfa</NavigationItem>
            <NavDropdown className="mr-3" title="Eklentiler" id="basic-nav-dropdown">
              <NavDropdown  className="mr-3" title="Word" id="basic-nav-dropdown" >
                <NavigationItem classes="ml-4" link="/custom-contract">
                  Teklif Taslağı
                </NavigationItem>
                <NavigationItem classes="ml-4" link="/expo-contract">
                  Alan Taslağı
                </NavigationItem>
              </NavDropdown>
            </NavDropdown>
                {/* <NavDropdown.Divider />
        <NavigationItem classes="ml-4"  link="/services">All Services</NavigationItem> */}         
              {/* <NavDropdown.Divider />
        <NavigationItem classes="ml-4"  link="/services">All Services</NavigationItem> */}
            <NavigationItem classes="mt-2" link="/contact">
              İletişim
            </NavigationItem>

          </Nav>
          {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavBar;
