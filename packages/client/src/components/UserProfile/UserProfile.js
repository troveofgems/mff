import React, { useState, useEffect }	from 'react';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

// Feature Imports
import HomeFeature from "./features/home.feature";
import ProfileFeature from "./features/profile.feature";
import LoginFeature from "./features/login.feature";
import SettingsFeature from "./features/settings.feature";

// Styles Imports
import "./style/UserProfile.scss";
const UserProfile = () => {
  const
    [toggleAuthenticationView, setToggleAuthenticationView] = useState(false), // default => login
    navigate = useNavigate(),
    userLogin = useSelector(state => state.userLogin),
    { auth } = userLogin;

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

export default UserProfile;