import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-bootstrap";

import './Checkout.breadcrumb.scss';
const CheckoutBreadcrumb = ({ step_1, step_2, step_3, step_4, sa }) => {
  const userLogin = useSelector(state => state.userLogin);

  //console.log(userLogin); TODO: Configure logic for step 1 to check for guest or logged in user

  return (
    <Nav className={"justify-content-center mb-4"}>
      <Nav.Item>
        {step_1 ? (
          <Nav.Link>
            Guest Checkout
          </Nav.Link>
        ): <Nav.Link disabled>Guest Checkout</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step_2 ? (
          <NavLink to={"/shipping"} className={(sa === 1 && "activeStep")}>
            Shipping
          </NavLink>
        ): <Nav.Link disabled>Shipping</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step_3 ? (
          <NavLink to={"/payment"} className={(sa === 2 && "activeStep")}>
            Payment Details
          </NavLink>
        ): <Nav.Link disabled style={{color: "black"}}>Payment Details</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step_4 ? (
          <NavLink to={"/placeOrder"} className={(sa === 3 && "activeStep")}>
            Place Order
          </NavLink>
        ): <Nav.Link disabled style={{color: "black"}}>Place Order</Nav.Link>}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutBreadcrumb;