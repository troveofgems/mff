import React 		from 'react';
import * as Yup from 'yup';
// App Constant Values
import {
  EMAIL_MIN_LEN, EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN, PASSWORD_MAX_LEN
} from './formik.validation.constants';

const formikLoginValidationSchema = Yup.object({
  login_email:
    Yup
      .string()
      .email('Invalid Email Address Format')
      .max(EMAIL_MAX_LEN, `Must be less than ${EMAIL_MAX_LEN} chars`)
      .min(EMAIL_MIN_LEN, `Must be greater than ${EMAIL_MIN_LEN} chars`)
      .trim()
      .required('* Email Shipping Is Required'),
  login_pwd:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Password Is Required'),
});

export default formikLoginValidationSchema;