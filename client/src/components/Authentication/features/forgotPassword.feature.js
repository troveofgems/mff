import React, { useState, useEffect } 	from 'react';

import { Formik, Form } from "formik";
import FormikTextInput	from "../../../formik/textInput";

import { forgotPasswordFormSchema }	from '../schema/formSchematics';
import formikForgotPasswordValidationSchema from '../validation/formik.forgotPassword.validationSchema';

import Notification from "../../layout/Notification";

import { EMAIL_MIN_LEN, EMAIL_MAX_LEN } from '../validation/formik.validation.constants';
import {useDispatch} from "react-redux";

import {sendEmailToResetPassword} from "../../../redux/actions/auth.actions";

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
            Send A Request To Reset Your Password
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
                  label='Email Address'
                  minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                  id={'forgotPassword_email'} name={'forgotPassword_email'}
                  type='email' placeholder='jerry@fricknfish.com'
                />
                <div className="form-actions full py-4 pb-4">
                  <button type="submit" className="button full text-black login-btn">
                    Send Reset Email
                  </button>
                </div>
              </div>
            )}
            {formSubmitted && (
              <>
                <p>
                  <small>
                    If your account exists with the supplied email address, you should receive an email within
                    the next 3 minutes that contains instructions with how to change your password.
                  </small>
                </p>
                <p>
                  <small>
                    Otherwise,
                  </small>
                </p>
                <p>
                  <small>
                    No longer have access to your email address? It happens. Please reach out to our support staff.
                  </small>
                </p>
              </>
            )}
          </div>
        </div>
      </Form>
    </Formik>)
}

export default ForgotPasswordFeature;