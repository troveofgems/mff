import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Nav} from 'react-bootstrap';
import {NavLink} from "react-bootstrap";

import './Checkout.breadcrumb.scss';

const CheckoutBreadcrumb = ({step_1, step_2, step_3, step_4, sa}) => {
  const
    [firstStepLabel, setFirstStepLabel] = useState("Guest Checkout"),
    userLogin = useSelector(state => state.userLogin);

  useEffect(() => {
    const LoginDNE_Or_InvalidlyFormatted = (userLogin && (userLogin.auth === null || typeof userLogin.auth === "string"));
    if (!LoginDNE_Or_InvalidlyFormatted) {
      setFirstStepLabel("Logged In");
    }
  }, [userLogin]);

  return (
    <Nav className={"justify-content-center mb-4"}>
      <Nav.Item>
        {step_1 ? (
          <Nav.Link style={{letterSpacing: ".15rem"}}>
            {firstStepLabel}
          </Nav.Link>
        ) : <Nav.Link disabled style={{letterSpacing: ".15rem"}}>{firstStepLabel}</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step_2 ? (
          <div style={{textAlign: "center", letterSpacing: ".05rem"}} className={(sa === 1 && "activeStep")}>
            <NavLink to={"/shipping"} style={{letterSpacing: ".15rem"}}>
              Shipping
            </NavLink>
            <i className={(sa === 1 && "activeStep") && "fas fa-caret-up"} style={{fontSize: "2rem"}}/>
          </div>
        ) : <Nav.Link disabled>Shipping</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        {step_3 ? (
          <div style={{textAlign: "center"}} className={(sa === 2 && "activeStep")}>
            <NavLink to={"/payment"} style={{letterSpacing: ".15rem"}}>
              Payment Details
            </NavLink>
            <i className={(sa === 2 && "activeStep") && "fas fa-caret-up"} style={{fontSize: "2rem"}} />
          </div>
        ) : (
          <Nav.Link disabled style={{color: "black", letterSpacing: ".15rem"}}>
            Payment Details
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step_4 ? (
          <div style={{textAlign: "center", letterSpacing: ".15rem"}} className={(sa === 3 && "activeStep")}>
            <NavLink to={"/placeOrder"}>
              Place Order
            </NavLink>
            <i className={(sa === 3 && "activeStep") && "fas fa-caret-up"} style={{fontSize: "2rem"}}/>
          </div>
        ) : <Nav.Link disabled style={{color: "black", letterSpacing: ".15rem"}}>Place Order</Nav.Link>}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutBreadcrumb;