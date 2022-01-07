import React from 'react';
import * as Yup from 'yup';
import { // App Constant Values
  EMAIL_MIN_LEN, EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN, PASSWORD_MAX_LEN,
  BIRTH_YEAR_MIN_LEN,
} from "./formik.validation.constants";

const formikUPLoginValidationSchema = Yup.object({
  update_email:
    Yup
      .string()
      .email('Invalid Email Shipping Format')
      .max(EMAIL_MAX_LEN, `Must be less than ${EMAIL_MAX_LEN} chars`)
      .min(EMAIL_MIN_LEN, `Must be greater than ${EMAIL_MIN_LEN} chars`)
      .trim(),
  old_password:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Your old password is required'),
  update_pwd:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Password is required'),
  update_pwd_repeat:
    Yup
      .string()
      .oneOf([Yup.ref('register_pwd')],'Passwords Do Not Match')
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Retyping your password accurately is required')
});

export default formikUPLoginValidationSchema;