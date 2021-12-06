import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = ({ auth = null }) => {
  const
    guestLinks = (
      <>
        <NavLink to="/login" className={"navlinkTag"}>
          <i className={"fas fa-user"} />{' '}
          Sign In
        </NavLink>
      </>
    ),
    authenticatedLinks = (
      <>
        <NavLink to="/logout" className={"navlinkTag"}>
          <i className={"fas fa-sign-out-alt"} />{' '}
          Logout
        </NavLink>
      </>
    );

  return (
    <header>
      <Navbar expand="lg" className={"navbar-dark bg-dark"}>
        <Navbar.Brand className={"ps-3"}>
          Frickn' Fish
        </Navbar.Brand>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-2 my-lg-0 w-100"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavLink to="/cart" className={"navlinkTag"}>
                <i className={"fas fa-shopping-cart"} />{' '}
                Cart
              </NavLink>
              {!auth && guestLinks}
              {auth && authenticatedLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  auth: PropTypes.object
};

export default Header;