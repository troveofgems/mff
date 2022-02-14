import React from 'react';
import * as Yup from 'yup';
import { // App Constant Values
  ADDRESS_LINE_1_MIN_LEN, ADDRESS_LINE_1_MAX_LEN,
  ADDRESS_LINE_2_MIN_LEN, ADDRESS_LINE_2_MAX_LEN,
  ADDRESS_CITY_MAX_LEN, ADDRESS_CITY_MIN_LEN,
  ADDRESS_POSTAL_CODE_MAX_LEN, ADDRESS_POSTAL_CODE_MIN_LEN
} from './formik.validation.constants';
import {
  FIRST_NAME_MAX_LEN, FIRST_NAME_MIN_LEN,
  LAST_NAME_MAX_LEN, LAST_NAME_MIN_LEN
} from "../../L1RA/User/validation/formik.validation.constants";

const _setFieldSchema = (
  isBillingField,
  billingAddressIsRequired,
  maxVal, minVal,
  customMessage = "* This Field Is Required"
) => {
  if (!isBillingField || (isBillingField && billingAddressIsRequired)) {
    return Yup
      .string()
      .max(maxVal, `Must be less than ${maxVal} chars`)
      .min(minVal, `Must be greater than ${minVal} chars`)
      .trim()
      .required(customMessage);
  } else if (isBillingField) {
    return Yup
      .string()
      .max(maxVal, `Must be less than ${maxVal} chars`)
      .min(minVal, `Must be greater than ${minVal} chars`)
      .trim();
  }
};

const _setFieldSchemaForDropdown = () => {
  return Yup
    .string()
    .trim();
};

const buildValidationSchema = (billingAddressIsRequired) => {
  let addressSchematics = {
    mailing_ship_to_first_name:
      _setFieldSchema(
        false,
        null,
        FIRST_NAME_MAX_LEN, FIRST_NAME_MIN_LEN
      ),
    mailing_ship_to_last_name:
      _setFieldSchema(
        false,
        null,
        LAST_NAME_MAX_LEN, LAST_NAME_MIN_LEN
      ),
    mailing_address_line_1:
      _setFieldSchema(
      false,
      null,
      ADDRESS_LINE_1_MAX_LEN, ADDRESS_LINE_1_MIN_LEN
    ),
    mailing_address_line_2:
      _setFieldSchema(
      true, /*Trick to override without additional code*/
      false,
      ADDRESS_LINE_2_MAX_LEN, ADDRESS_LINE_2_MIN_LEN
    ),
    mailing_city:
      _setFieldSchema(
      false,
      null,
      ADDRESS_CITY_MAX_LEN, ADDRESS_CITY_MIN_LEN
    ),
    mailing_state:
      _setFieldSchemaForDropdown(),
    mailing_postalCode:
      _setFieldSchema(
      false,
      null,
      ADDRESS_POSTAL_CODE_MAX_LEN, ADDRESS_POSTAL_CODE_MIN_LEN
    ),
    mailing_country:
      _setFieldSchemaForDropdown(),
    billing_bill_to_first_name:
      _setFieldSchema(
        true,
        billingAddressIsRequired,
        FIRST_NAME_MAX_LEN, FIRST_NAME_MIN_LEN
      ),
    billing_bill_to_last_name:
      _setFieldSchema(
        true,
        billingAddressIsRequired,
        LAST_NAME_MAX_LEN, LAST_NAME_MIN_LEN
      ),
    billing_address_line_1:
      _setFieldSchema(
      true,
      billingAddressIsRequired,
      ADDRESS_LINE_1_MAX_LEN, ADDRESS_LINE_1_MIN_LEN
    ),
    billing_address_line_2:
      _setFieldSchema(
      true,
      false,
      ADDRESS_LINE_2_MAX_LEN, ADDRESS_LINE_2_MIN_LEN
    ),
    billing_city:
      _setFieldSchema(
      true,
      billingAddressIsRequired,
      ADDRESS_CITY_MAX_LEN, ADDRESS_CITY_MIN_LEN
    ),
    billing_state:
      _setFieldSchemaForDropdown(),
    billing_postalCode:
      _setFieldSchema(
      true,
      billingAddressIsRequired,
      ADDRESS_POSTAL_CODE_MAX_LEN, ADDRESS_POSTAL_CODE_MIN_LEN
    ),
    billing_country:
      _setFieldSchemaForDropdown()
  }
  return Yup.object(addressSchematics);
};

export default buildValidationSchema;