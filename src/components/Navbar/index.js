import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavBarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
        Kingdom Promodoro
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            Home
          </NavLink>
          <NavLink to='/services' activeStyle>
            Profile
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Item Shop
          </NavLink>
          <NavLink to='/' activeStyle>
            Friends
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;