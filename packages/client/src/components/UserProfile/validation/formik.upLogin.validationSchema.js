import React from 'react';
import * as Yup from 'yup';
import { // App Constant Values
  EMAIL_MIN_LEN, EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN, PASSWORD_MAX_LEN
} from "./formik.validation.constants";

const formikUPLoginValidationSchema = Yup.object({
  updateRegistrationId: Yup.string(),
  update_email:
    Yup
      .string()
      .email('Invalid Email Address Format')
      .max(EMAIL_MAX_LEN, `Must be less than ${EMAIL_MAX_LEN} chars`)
      .min(EMAIL_MIN_LEN, `Must be greater than ${EMAIL_MIN_LEN} chars`)
      .trim(),
  showChangePasswordSection:
    Yup
      .boolean(),
  old_pwd:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .when("showChangePasswordSection", {
        is: true,
        then: Yup.string().required('* Your old password is required')
      }),
  update_pwd:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .when("showChangePasswordSection", {
        is: true,
        then: Yup.string().required('* Your new password is required')
      }),
  update_pwd_confirmation:
    Yup
      .string()
      .oneOf([Yup.ref('update_pwd')],'Passwords Do Not Match')
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .when("showChangePasswordSection", {
        is: true,
        then: Yup.string().required('* You Must Confirm Your New Password')
      }),
  showChangeSessionLengthSection:
    Yup
      .boolean()
});

export default formikUPLoginValidationSchema;