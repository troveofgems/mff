import React 		from 'react';
import * as Yup from 'yup';
import { // App Constant Values
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN,
  FIRST_NAME_MIN_LEN,
  FIRST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN,
  LAST_NAME_MAX_LEN,
  PASSWORD_MIN_LEN,
  PASSWORD_MAX_LEN,
  BIRTH_YEAR_MIN_LEN,
  BIRTH_MONTH_MAX_LEN,
  BIRTH_MONTH_MIN_LEN
} from "./formik.validation.constants";

const formikRegisterValidationSchema = Yup.object({
  register_firstName:
    Yup
      .string()
      .max(FIRST_NAME_MAX_LEN, `Must be less than ${FIRST_NAME_MAX_LEN} chars`)
      .min(FIRST_NAME_MIN_LEN, `Must be greater than ${FIRST_NAME_MIN_LEN} chars`)
      .trim()
      .required('* First Name Is Required'),
  register_lastName:
    Yup
      .string()
      .max(LAST_NAME_MAX_LEN, `Must be less than ${LAST_NAME_MAX_LEN} chars`)
      .min(LAST_NAME_MIN_LEN, `Must be greater than ${LAST_NAME_MIN_LEN} chars`)
      .trim()
      .required('* Last Name Is Required'),
  register_email:
    Yup
      .string()
      .email('Invalid Email Address Format')
      .max(EMAIL_MAX_LEN, `Must be less than ${EMAIL_MAX_LEN} chars`)
      .min(EMAIL_MIN_LEN, `Must be greater than ${EMAIL_MIN_LEN} chars`)
      .trim()
      .required('* Email Address Is Required'),
  register_birth_month:
    Yup
      .string()
      .trim()
      .max(BIRTH_MONTH_MAX_LEN, `Must be less than ${10} chars`)
      .min(BIRTH_MONTH_MIN_LEN, `Must be greater than ${5} chars`)
      .required('* Your Birth Month Is Required'),
  register_birth_year:
    Yup
      .string()
      .trim()
      .min(BIRTH_YEAR_MIN_LEN, `Must equal 4 chars`)
      .required('* Your Birth Year Is Required'),
  register_pwd:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Password Is Required'),
  register_pwd_repeat:
    Yup
      .string()
      .oneOf([Yup.ref('register_pwd')],'Passwords Do Not Match')
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Retyping your password accurately is required')
});

export default formikRegisterValidationSchema;