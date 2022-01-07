import React, { useState, useEffect } 	from 'react';

import { Formik, Form } from "formik";
import FormikTextInput	from "../../../formik/textInput";

import { forgotPasswordFormSchema }	from '../schema/formSchematics';

import Notification from "../../layout/Notification";

import { EMAIL_MIN_LEN, EMAIL_MAX_LEN } from '../validation/formik.validation.constants';
//import {useDispatch} from "react-redux";

const ForgotPasswordFeature = () => {
  const
    //dispatch = useDispatch(), // Need state to track password reset
    [globalError, setGlobalError] = useState(null);

  return (
    <Formik
      initialValues={forgotPasswordFormSchema}
      validationSchema={null}
      onSubmit={async (formData, { setSubmitting }) => {
        setSubmitting(true);
        //await dispatch(loginUser(formData));
        setSubmitting(false);
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
            <div className="form-item login-form-item">
              <FormikTextInput
                label='Email Address'
                minLength={EMAIL_MIN_LEN} maxLength={EMAIL_MAX_LEN}
                id={'login_email'} name={'login_email'}
                type='email' placeholder='jerry@fricknfish.com'
              />
            </div>
          </div>
        </div>
        <div className="form-actions full py-4 pb-4">
          <button type="submit" className="button full text-black login-btn">
            Send Reset Email
          </button>
        </div>
      </Form>
    </Formik>)
}

export default ForgotPasswordFeature;