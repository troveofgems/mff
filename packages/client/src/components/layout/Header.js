import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from "react-router-bootstrap/LinkContainer";

import { logoutUser } from '../../redux/actions/auth.actions';
import {CLEAR_LOGGED_IN_USER} from "../../redux/constants/auth.constants";

const Header = () => {
  const
    [sessionLength, setSessionLength] = useState("1:00"),
    [timerStarted, setTimerStarted] = useState(false),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    userLogin = useSelector(state => state.userLogin),
    userLogout = useSelector(state => state.userLogout),
    usersCart = useSelector(state => state.cart),
    { loading: loadingUserLogin, error: loginUserError, auth: userLoginInfo } = userLogin,
    { loading: loadingUserLogout, error: logoutUserError, tokenFlushSuccess } = userLogout;

  const handleLogout = () => {
    dispatch({ type: CLEAR_LOGGED_IN_USER });
    dispatch(logoutUser());
  };

  const setNavigationTitle = () => {
    let titleText = 'Menu';

    const
      authIsNull = userLoginInfo === null,
      authIsObject = typeof userLoginInfo === 'object'; //,
      //authIsString = typeof userLoginInfo === 'string'; // => On Refresh Only Tokens Are Kept.

    if (!authIsNull && authIsObject) {
      titleText = `Welcome ${userLogin.auth.firstName}` + ' ' + `${userLogin.auth.lastName}`; // => "Welcome John Doe"
    }

    return titleText;
  }
  const queueAutoLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser());
      navigate('/login');
    }, (1000 * 10));
  };

  const initiateSessionLife = () => {
    // We Want To Track Session Life Here.
    if (userLoginInfo && !timerStarted) {
      console.log('Begin to track Session Life')
      setTimerStarted(true);
      queueAutoLogout();
    } else {
      console.log('Not Logged In');
    }
  };

  const
    guestLinks = (
      <>
        <NavLink to="/login" className={"navlinkTag"} key={"sign-in"}>
          <i className={"fas fa-user"} />{' '}
          Sign In
        </NavLink>
        <NavLink to="/cart" className={"navlinkTag"} key={"anon-cart"}>
          <i className={"fas fa-shopping-cart"} />{' '}
          Cart ({usersCart.cartItems.length === 1 ? `${usersCart.cartItems.length} Item` : `${usersCart.cartItems.length} Items`})
        </NavLink>
      </>
    ),
    authenticatedLinks = (
      <>
        <NavDropdown
          title={setNavigationTitle()}
          id={"userNavi"}
        >
          <LinkContainer to="/profile">
            <NavDropdown.Item key={"user-profile"}>
              My Profile
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/myOrders">
            <NavDropdown.Item key={"user-orders"}>
              My Orders
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/">
            <NavDropdown.Item onClick={handleLogout} key={"user-logout"}>
              <i className={"fas fa-sign-out-alt"} />{' '}
              Logout
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <NavLink to="/cart" className={"navlinkTag ps-3 pt-2"} key={"user-cart"}>
          <i className={"fas fa-shopping-cart"} />{' '}
          Cart
        </NavLink>
        <div className={"d-flex flex-row align-items-center text-light"} style={{marginLeft: "auto"}}>
          <i className="fas fa-clock">
            <small style={{fontSize: ".5em"}}>{' '}Session Expires In{' '}</small>
            <small style={{paddingLeft: "5px"}}>{sessionLength}</small>
          </i>
        </div>
      </>
    ),
    adminLinks = (
      <>
        <NavDropdown
          title={"Admin Actions"}
          id={"userNavi"}
        >
          <LinkContainer to="/l1ra/orders">
            <NavDropdown.Item>
              Orders
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/l1ra/products">
            <NavDropdown.Item>
              Products
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/l1ra/users">
            <NavDropdown.Item>
              Users
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/l1ra/analytics">
            <NavDropdown.Item>
              Analytics
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </>
    );

  return (
    <header>
      <Navbar expand="lg" className={"navbar-dark bg-dark"}>
        <Navbar.Brand className={"ps-3"}>
          <NavLink to={"/"} aria-label={"Homepage"} className={"brand-link"}>
            Frickn' Fish
          </NavLink>
        </Navbar.Brand>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ml-auto my-2 my-lg-0 w-100"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {!userLoginInfo && guestLinks}
              {userLoginInfo && (userLoginInfo.authLevel === 10 || userLoginInfo.authLevel === 100 || userLoginInfo.authLevel === 1000) && (
                <>
                  {adminLinks}
                  {authenticatedLinks}
                </>
              )}
              {userLoginInfo && typeof userLoginInfo === 'string' && (
                <LinkContainer to="/">
                  <Nav.Item onClick={handleLogout} key={"user-logout"} className={"text-white"}>
                    <i className={"fas fa-sign-out-alt"} />{' '}
                    Logout
                  </Nav.Item>
                </LinkContainer>
              )}
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