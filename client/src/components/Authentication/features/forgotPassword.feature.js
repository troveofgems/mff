import React, { useState, useEffect } 	from 'react';

import { Formik, Form } from "formik";
import FormikTextInput	from "../../../formik/textInput";

import { forgotPasswordFormSchema }	from '../schema/formSchematics';
import formikForgotPasswordValidationSchema from '../validation/formik.forgotPassword.validationSchema';

import Notification from "../../layout/Notification";

import { EMAIL_MIN_LEN, EMAIL_MAX_LEN } from '../validation/formik.validation.constants';
import {useDispatch} from "react-redux";

import {sendEmailToResetPassword} from "../../../redux/actions/auth.actions";

import "../style/Login.scss";
const ForgotPasswordFeature = () => {
  const
    dispatch = useDispatch(),
    [globalError, setGlobalError] = useState(null),
    [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <Formik
      initialValues={forgotPasswordFormSchema}
      validationSchema={formikForgotPasswordValidationSchema}
      onSubmit={async (formData, { setSubmitting }) => {
        setSubmitting(true);
        let dtp = {login_email: formData.forgotPassword_email};
        await dispatch(sendEmailToResetPassword(dtp));
        setSubmitting(false);
        setFormSubmitted(true);
      }}
    >
      <Form className="form-box form-wrap content-wrapper text-center">
        <div className="section-title-wrap blue">
          <h2 className="section-title medium text-black">
            {!formSubmitted ? ("Send A Request To Reset Your Password") : ("Request Submitted Successfully")}
          </h2>
          <div className="section-title-separator">{}</div>
          {globalError && (
            <Notification variant={'danger'} children={globalError} />
          )}
        </div>
        <div className={"field-container"}>
          <div className="form-row">
            {!formSubmitted && (
              <div className="form-item login-form-item mb-3">
                <FormikTextInput
                  label='Email Address' inputstyle={"input-field-class"}
                  minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                  id={'forgotPassword_email'} name={'forgotPassword_email'}
                  type='email' placeholder='jerry@fricknfish.com'
                />
                <div className="form-actions full py-4 pb-4">
                  <button type="submit" className="button full text-black login-btn login-form-item">
                    Send Reset Email
                  </button>
                </div>
              </div>
            )}
            {formSubmitted && (
              <>
                <p className={"input-field-class"}>
                    If your account exists with the supplied email address, you should receive an email within
                    the next 3 minutes that contains instructions with how to change your password.
                </p>
                <p className={"input-field-class"}>
                    Otherwise,
                </p>
                <p className={"input-field-class"}>
                    If you no longer have access to your email address, we understand...it happens.
                  Please reach out to our support staff to help recover your account.
                </p>
              </>
            )}
          </div>
        </div>
      </Form>
    </Formik>)
}

export default ForgotPasswordFeature;