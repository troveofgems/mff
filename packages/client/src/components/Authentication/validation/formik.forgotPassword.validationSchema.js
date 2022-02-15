import React 		from 'react';
import * as Yup from 'yup';
// App Constant Values
import {EMAIL_MAX_LEN, EMAIL_MIN_LEN} from "./formik.validation.constants";

const formikForgotPasswordValidationSchema = Yup.object({
  forgotPassword_email:
    Yup
      .string()
      .email('Invalid Email Address Format')
      .max(EMAIL_MAX_LEN, `Must be less than ${EMAIL_MAX_LEN} chars`)
      .min(EMAIL_MIN_LEN, `Must be greater than ${EMAIL_MIN_LEN} chars`)
      .trim()
      .required('* Email Address Is Required')
});

export default formikForgotPasswordValidationSchema;