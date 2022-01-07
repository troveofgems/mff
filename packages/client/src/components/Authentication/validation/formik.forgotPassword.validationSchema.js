import React 		from 'react';
import * as Yup from 'yup';
// App Constant Values
import {MAX_EMAIL_LEN} from "../../../validation/constants/max.len";
import {MIN_EMAIL_LEN} from "../../../validation/constants/min.len";

const formikForgotPasswordValidationSchema = Yup.object({
  forgot_email:
    Yup
      .string()
      .email('Invalid Email Shipping Format')
      .max(MAX_EMAIL_LEN, `Must be less than ${MAX_EMAIL_LEN} chars`)
      .min(MIN_EMAIL_LEN, `Must be greater than ${MIN_EMAIL_LEN} chars`)
      .trim()
      .required('* Email Shipping Is Required')
});

export default formikForgotPasswordValidationSchema;