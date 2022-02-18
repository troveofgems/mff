import React 		from 'react';
import * as Yup from 'yup';
// App Constant Values
import {PASSWORD_MAX_LEN, PASSWORD_MIN_LEN} from "./formik.validation.constants";

const formikResetPasswordValidationSchema = Yup.object({
  reset_password:
    Yup
      .string()
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Password Is Required'),
  reset_password_repeat:
    Yup
      .string()
      .oneOf([Yup.ref('reset_password')],'Passwords Do Not Match')
      .max(PASSWORD_MAX_LEN, `Must be less than ${PASSWORD_MAX_LEN} chars`)
      .min(PASSWORD_MIN_LEN, `Must be greater than ${PASSWORD_MIN_LEN} chars`)
      .required('* Retyping your password accurately is required')
});

export default formikResetPasswordValidationSchema;