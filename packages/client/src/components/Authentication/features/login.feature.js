import React, { useState, useEffect } 	from 'react';
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import { Formik, Form } from "formik";
import FormikTextInput	from "../../../formik/textInput";

import { loginFormSchema } 					from '../schema/formSchematics';
import formikLoginValidationSchema 	from "../validation/formik.login.validationSchema";

import Notification from "../../layout/Notification";

import {
  EMAIL_MIN_LEN, EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN, PASSWORD_MAX_LEN
} from '../validation/formik.validation.constants';

import {
  loginUser
} from "../../../redux/actions/auth.actions";
import {useDispatch} from "react-redux";

const LoginFeature = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    userLogin = useSelector(state => state.userLogin),
    [globalError, setGlobalError] = useState(null),
    { loading: authLoading, error: authError, auth } = userLogin;

  useEffect(() => { // Request Check
    if (auth !== null) { // Already Logged-In. Redirect To Home
      navigate({ pathname: `/` })
    }
  }, []);

  useEffect(() => {
    if (typeof authError === 'string') {
      setGlobalError('Invalid Credentials. Please Try Again...');
    } else {
      setGlobalError(null);
    }
  }, [userLogin]);

  return (
    <Formik
      initialValues={loginFormSchema}
      validationSchema={formikLoginValidationSchema}
      onSubmit={async (formData, { setSubmitting }) => {
        setSubmitting(true);
        await dispatch(loginUser(formData));
        setSubmitting(false);
      }}
    >
      <Form className="form-box form-wrap content-wrapper">
        <div className="section-title-wrap blue">
          <h2 className="section-title medium text-black">
            Login To Your Account
          </h2>
          <div className="section-title-separator">{}</div>
          {globalError && (
            <Notification variant={'danger'} children={globalError} />
          )}
        </div>
        <div className={"field-container"}>
          <div className="form-row">
            <div className="form-item login-form-item">
              <FormikTextInput
                label='Email Address'
                minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                id={'login_email'} name={'login_email'}
                type='email' placeholder='jerry@fricknfish.com'
              />
            </div>
          </div>
          <div className="form-row login-form-item">
            <FormikTextInput
              label='Password'
              minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
              id={'login_pwd'} name={'login_pwd'}
              type='password' placeholder='*****************'
            />
          </div>
        </div>
        <div className="form-actions full py-4 pb-4">
          <button type="submit" className="button full text-black login-btn">
            Login Now!
          </button>
        </div>
        <div className="form-confirm-row">
          <Link to="/forgotPassword" className="link-text-form blue">
            Forgot Password?
          </Link>
        </div>
      </Form>
    </Formik>)
}

export default LoginFeature;