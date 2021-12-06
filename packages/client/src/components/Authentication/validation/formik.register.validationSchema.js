import React 		from 'react';
import * as Yup from 'yup';
import { // App Constant Values
  MAX_ALIAS_LEN,
  MAX_EMAIL_LEN,
  MAX_FIRST_NAME_LEN,
  MAX_LAST_NAME_LEN,
  MAX_PASSWORD_LEN
} from "../../../validation/constants/max.len";
import {
  MIN_ALIAS_LEN,
  MIN_EMAIL_LEN,
  MIN_FIRST_NAME_LEN,
  MIN_LAST_NAME_LEN,
  MIN_PASSWORD_LEN
} from "../../../validation/constants/min.len";
import {IGL_USER_ID_REGEX} from "../../../validation/constants/regex.constants";

const formikRegisterValidationSchema = Yup.object({
  register_firstName:
    Yup
      .string()
      .max(MAX_FIRST_NAME_LEN, `Must be less than ${MAX_FIRST_NAME_LEN} chars`)
      .min(MIN_FIRST_NAME_LEN, `Must be greater than ${MIN_FIRST_NAME_LEN} chars`)
      .trim()
      .required('* First Name Is Required'),
  register_lastName:
    Yup
      .string()
      .max(MAX_LAST_NAME_LEN, `Must be less than ${MAX_LAST_NAME_LEN} chars`)
      .min(MIN_LAST_NAME_LEN, `Must be greater than ${MIN_LAST_NAME_LEN} chars`)
      .trim()
      .required('* Last Name Is Required'),
  register_email:
    Yup
      .string()
      .email('Invalid Email Address Format')
      .max(MAX_EMAIL_LEN, `Must be less than ${MAX_EMAIL_LEN} chars`)
      .min(MIN_EMAIL_LEN, `Must be greater than ${MIN_EMAIL_LEN} chars`)
      .trim()
      .required('* Email Address Is Required'),
  register_username:
    Yup
      .string()
      .max(MAX_ALIAS_LEN, `Must be less than ${MAX_ALIAS_LEN} chars`)
      .min(MIN_ALIAS_LEN, `Must be greater than ${MIN_ALIAS_LEN} chars`)
      .trim()
      .matches(IGL_USER_ID_REGEX, 'Please Select A Valid Username')
      .required('* Username Is Required'),
  register_pwd:
    Yup
      .string()
      .max(MAX_PASSWORD_LEN, `Must be less than ${MAX_PASSWORD_LEN} chars`)
      .min(MIN_PASSWORD_LEN, `Must be greater than ${MIN_PASSWORD_LEN} chars`)
      .required('* Password Is Required'),
  register_pwd_repeat:
    Yup
      .string()
      .oneOf([Yup.ref('register_pwd')],'Passwords Do Not Match')
      .max(MAX_PASSWORD_LEN, `Must be less than ${MAX_PASSWORD_LEN} chars`)
      .min(MIN_PASSWORD_LEN, `Must be greater than ${MIN_PASSWORD_LEN} chars`)
      .required('* Retyping your password accurately is required'),
  register_ageConfirmation:
    Yup
      .bool()
      .oneOf([true], "You must confirm that you are over the age of 13 at the time of account creation"),
  register_privacyPolicyConfirmation:
    Yup
      .bool()
      .oneOf([true], "You must read and agree to IGLeague's Privacy Policy"),
  register_termsOfUseConfirmation:
    Yup
      .bool()
      .oneOf([true], "You must accept IGLeague's Terms Of Use")
});

export default formikRegisterValidationSchema;