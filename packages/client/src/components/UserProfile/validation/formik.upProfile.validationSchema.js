import React from 'react';
import * as Yup from 'yup';
import { // App Constant Values
  FIRST_NAME_MIN_LEN, FIRST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
} from "./formik.validation.constants";

const formikUPProfileValidationSchema = Yup.object({
  update_firstName:
    Yup
      .string()
      .max(FIRST_NAME_MAX_LEN, `Must be less than ${FIRST_NAME_MAX_LEN} chars`)
      .min(FIRST_NAME_MIN_LEN, `Must be greater than ${FIRST_NAME_MIN_LEN} chars`)
      .trim()
      .required('* First Name Is Required'),
  update_lastName:
    Yup
      .string()
      .max(LAST_NAME_MAX_LEN, `Must be less than ${LAST_NAME_MAX_LEN} chars`)
      .min(LAST_NAME_MIN_LEN, `Must be greater than ${LAST_NAME_MIN_LEN} chars`)
      .trim()
      .required('* Last Name Is Required'),
  update_birth_month:
    Yup
      .number()
      .required('* Your Birth Month Is Required'),
  update_remember_my_address:
    Yup
      .boolean()
      .required('You must provide a selection')
});

export default formikUPProfileValidationSchema;