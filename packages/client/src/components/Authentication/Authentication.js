import React, { useState }	from 'react';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

// Feature Imports
import LoginFeature 				from "./features/login.feature";
import RegistrationFeature 	from "./features/registration.feature";

// Styles Imports
import "./style/Authentication.scss";
const Authentication = () => {
  const
    [toggleAuthenticationView, setToggleAuthenticationView] = useState(false), // default => login
    navigate = useNavigate(),
    userLogin = useSelector(state => state.userLogin),
    { auth } = userLogin;

  if (auth !== null) { // Already Logged-In. Redirect To Home
    navigate({ pathname: `/` }); // TODO: Possible need to route to shipping here too...
  }

  const handleStyleChange = (switchVal) => {
    if (switchVal) {
      document
        .getElementById('registerTile')
        .classList
        .add('selected');
      document
        .getElementById('loginTile')
        .classList
        .remove('selected');
    } else {
      document
        .getElementById('loginTile')
        .classList
        .add('selected');
      document
        .getElementById('registerTile')
        .classList
        .remove('selected');
    }
    setToggleAuthenticationView(switchVal);
  }

  return (
    <>
      <div id="tab-login-register">
        <div className="tab-header items-2 border-top d-flex mb-3">
          <div id="loginTile" className="tab-header-item mt-3 selected">
            <p className="tab-header-item-text"
               onClick={() => handleStyleChange(false)}
            >Login
            </p>
          </div>
          <div id="registerTile" className="tab-header-item mt-3">
            <p className="tab-header-item-text"
               onClick={() => handleStyleChange(true)}
            >Register
            </p>
          </div>
        </div>
        {toggleAuthenticationView ? (
          <RegistrationFeature/>
        ) : (
          <LoginFeature/>
        )}
      </div>
    </>
  );
}

export default Authentication;