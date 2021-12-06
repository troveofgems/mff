import React 		from 'react';
import * as Yup from 'yup';
// App Constant Values
import {MAX_EMAIL_LEN, MAX_PASSWORD_LEN} from "../../../validation/constants/max.len";
import {MIN_EMAIL_LEN, MIN_PASSWORD_LEN} from "../../../validation/constants/min.len";

const formikLoginValidationSchema = Yup.object({
  login_email:
    Yup
      .string()
      .email('Invalid Email Address Format')
      .max(MAX_EMAIL_LEN, `Must be less than ${MAX_EMAIL_LEN} chars`)
      .min(MIN_EMAIL_LEN, `Must be greater than ${MIN_EMAIL_LEN} chars`)
      .trim()
      .required('* Email Address Is Required'),
  login_pwd:
    Yup
      .string()
      .max(MAX_PASSWORD_LEN, `Must be less than ${MAX_PASSWORD_LEN} chars`)
      .min(MIN_PASSWORD_LEN, `Must be greater than ${MIN_PASSWORD_LEN} chars`)
      .required('* Password Is Required'),
});

export default formikLoginValidationSchema;