import React 		from 'react';
import * as Yup from 'yup';
// App Constant Values
import {
  FIRST_NAME_MIN_LEN, FIRST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  EMAIL_MIN_LEN, EMAIL_MAX_LEN
} from './formik.validation.constants';

const formikEditUserValidationSchema = Yup.object({
  admin_update_first_name:
    Yup
      .string()
      .max(FIRST_NAME_MAX_LEN, `Must be less than ${FIRST_NAME_MAX_LEN} chars`)
      .min(FIRST_NAME_MIN_LEN, `Must be greater than ${FIRST_NAME_MIN_LEN} chars`)
      .trim()
      .required('* First Name Is Required'),
  admin_update_last_name:
    Yup
      .string()
      .max(LAST_NAME_MAX_LEN, `Must be less than ${LAST_NAME_MAX_LEN} chars`)
      .min(LAST_NAME_MIN_LEN, `Must be greater than ${LAST_NAME_MIN_LEN} chars`)
      .trim()
      .required('* Last Name Is Required'),
  admin_update_email:
    Yup
      .string()
      .max(EMAIL_MAX_LEN, `Must be less than ${EMAIL_MAX_LEN} chars`)
      .min(EMAIL_MIN_LEN, `Must be greater than ${EMAIL_MIN_LEN} chars`)
      .trim()
      .required('* An Email Address Is Required'),
  admin_update_birth_month:
    Yup
      .number()
      .required('* Please Set A Valid Value For Birth Month'),
  admin_update_account_lockout:
    Yup
      .boolean(),
  update_account_ban_length:
    Yup
      .number(),
  banLengthDesc:
    Yup
      .string(),
  privilegeDesc:
    Yup
      .number(),
  password_override:
    Yup.string()
});

export default formikEditUserValidationSchema;