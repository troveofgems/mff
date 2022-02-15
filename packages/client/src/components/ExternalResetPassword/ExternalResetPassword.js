import React, { useState, useEffect } 	from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

import { Formik, Form } from "formik";
import FormikTextInput	from "../../formik/textInput";

import { resetPasswordFormSchema }	from './schema/formSchematics';
import formikResetPasswordValidationSchema from './validation/formik.resetPassword.validationSchema';

import Notification from "../layout/Notification";

import {PASSWORD_MAX_LEN , PASSWORD_MIN_LEN } from './validation/formik.validation.constants';

import {sendUpdateToUserAccountPwd} from "../../redux/actions/auth.actions";

const ExternalResetPassword = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation(),
    [globalError, setGlobalError] = useState(null),
    [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      if (location && location.pathname) {
        let urlToken = location.pathname.split('/')[2];
        setToken(urlToken);
      }
    }
  }, []);

  return (
    <Formik
      initialValues={resetPasswordFormSchema}
      validationSchema={formikResetPasswordValidationSchema}
      onSubmit={async (formData, { setSubmitting }) => {
        setSubmitting(true);
        let dtp = {password: formData.reset_password};
        await dispatch(sendUpdateToUserAccountPwd(token, dtp));
        setSubmitting(false);
        setToken(null);
        navigate('/resetPasswordSuccess');
      }}
    >
      <Form className="form-box form-wrap content-wrapper text-center">
        <div className="section-title-wrap blue">
          <h2 className="section-title medium text-black">
            Reset Your Password
          </h2>
          <div className="section-title-separator">{}</div>
          {globalError && (
            <Notification variant={'danger'} children={globalError} />
          )}
        </div>
        <div className={"field-container"}>
              <div className="form-row">
                <div className="form-item registration-form-item">
                  <FormikTextInput
                    label='Password'
                    id={'reset_password'} name={'reset_password'}
                    type='password' placeholder='Your New Password Here...'
                    minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                  />
                </div>
              </div>

              <div className="form-row pb-3">
                <div className="form-item registration-form-item">
                  <FormikTextInput
                    label='Repeat Password'
                    id={'reset_password_repeat'} name={'reset_password_repeat'}
                    type='password' placeholder='Retype New Your Password Here...'
                    minLength={PASSWORD_MIN_LEN} maxLength={PASSWORD_MAX_LEN}
                  />
                </div>
              </div>
            </div>
        <div className="form-actions full py-4 pb-4">
          <button type="submit" className="button full text-black login-btn">
            Reset Password
          </button>
        </div>
      </Form>
    </Formik>)
}

export default ExternalResetPassword;