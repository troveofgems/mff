import React, { useState }	from 'react';
import { connect } 		 			from 'react-redux';
import { Redirect } 				from 'react-router-dom';
import PropTypes 						from 'prop-types';
import { login, register } 	from '../../redux/actions/auth.actions';

// Feature Imports
import LoginForm 						from "./features/login.feature";
import RegistrationFeature 	from "./features/registration.feature";

// Styles Imports
import './style/Authentication.scss';
const Authentication = ({ register, login, isAuthenticated }) => {
  const [toggleAuthenticationView, setToggleAuthenticationView] = useState(false); // default => login

  if (isAuthenticated) { //Redirect if Already Logged In
    return <Redirect to="/home" />
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
      <div className="layout-content-full grid-limit grid-limit-infile" style={{marginTop: "5%"}}>
        <div className="grid2-1col centered">
          <div id="tab-login-register" className="tab-wrap">
            <div className="tab-header items-2 border-top mb-4">
              <div id="loginTile" className="tab-header-item gold selected">
                <p className="tab-header-item-text"
                   onClick={() => handleStyleChange(false)}
                >Login
                </p>
              </div>

              <div id="registerTile" className="tab-header-item red">
                <p className="tab-header-item-text"
                   onClick={() => handleStyleChange(true)}
                >Register
                </p>
              </div>
            </div>
            {(!!toggleAuthenticationView === false) && (
              <LoginForm login={login} />
            )}
            {(toggleAuthenticationView) && (
              <RegistrationFeature register={register} />
            )}
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
}

Authentication.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, register })(Authentication);