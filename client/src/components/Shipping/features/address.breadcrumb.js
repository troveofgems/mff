import React from 'react';
import {
  ADDRESS_TYPE_MAIL,
  MAILING_ADDRESS_LINE_1_PLACEHOLDER, MAILING_ADDRESS_LINE_2_PLACEHOLDER,
  MAILING_ADDRESS_CITY_PLACEHOLDER, MAILING_ADDRESS_POSTALCODE_PLACEHOLDER,
  MAILING_ADDRESS_STATE_PLACEHOLDER, MAILING_ADDRESS_COUNTRY_PLACEHOLDER,
  BILLING_ADDRESS_LINE_1_PLACEHOLDER, BILLING_ADDRESS_LINE_2_PLACEHOLDER,
  BILLING_ADDRESS_CITY_PLACEHOLDER, BILLING_ADDRESS_POSTALCODE_PLACEHOLDER,
  BILLING_ADDRESS_STATE_PLACEHOLDER, BILLING_ADDRESS_COUNTRY_PLACEHOLDER

} from '../validation/formik.validation.constants';

const _evaluateAndSetText = (checkToPerform, placeholderValue, actualValue, compareString = false) => {
  if (compareString) {
    return checkToPerform === placeholderValue ? `${placeholderValue.toUpperCase()} ` : `${actualValue.toUpperCase()} `;
  } else {
    return checkToPerform.length === 0 ? placeholderValue : actualValue;
  }
};

const AddressBreadCrumb = ({formikValues, onlyUseShipping, addressType}) => (
  <strong style={{letterSpacing: ".15rem", fontSize: "1rem"}}>
    {(addressType === ADDRESS_TYPE_MAIL || onlyUseShipping) ? // Address Line 1
      _evaluateAndSetText(
        formikValues.mailing_address_line_1,
        MAILING_ADDRESS_LINE_1_PLACEHOLDER,
        `${formikValues.mailing_address_line_1}, `)
      :
      _evaluateAndSetText(
        formikValues.billing_address_line_1,
        BILLING_ADDRESS_LINE_1_PLACEHOLDER,
        `${formikValues.billing_address_line_1}, `
      )}
    {(addressType === ADDRESS_TYPE_MAIL || onlyUseShipping) ? // Address Line 2
      _evaluateAndSetText(
        formikValues.mailing_address_line_2,
        MAILING_ADDRESS_LINE_2_PLACEHOLDER,
        `${formikValues.mailing_address_line_2}, `)
      :
      _evaluateAndSetText(
        formikValues.billing_address_line_2,
        BILLING_ADDRESS_LINE_2_PLACEHOLDER,
        `${formikValues.billing_address_line_2}, `
      )}
    {(addressType === ADDRESS_TYPE_MAIL || onlyUseShipping) ? // City
      _evaluateAndSetText(
        formikValues.mailing_city,
        MAILING_ADDRESS_CITY_PLACEHOLDER,
        `${formikValues.mailing_city}, `)
      :
      _evaluateAndSetText(
        formikValues.billing_city,
        BILLING_ADDRESS_CITY_PLACEHOLDER,
        `${formikValues.billing_city}, `
      )}
    {(addressType === ADDRESS_TYPE_MAIL || onlyUseShipping) ? // State
      _evaluateAndSetText(
        formikValues.mailing_state,
        MAILING_ADDRESS_STATE_PLACEHOLDER,
        `${formikValues.mailing_state}, `,
        true
      )
      :
      _evaluateAndSetText(
        formikValues.billing_state,
        BILLING_ADDRESS_STATE_PLACEHOLDER,
        `${formikValues.billing_state}, `,
        true
      )}
    {(addressType === ADDRESS_TYPE_MAIL || onlyUseShipping) ? // Postal Code
      _evaluateAndSetText(
        formikValues.mailing_postalCode,
        MAILING_ADDRESS_POSTALCODE_PLACEHOLDER,
        `${formikValues.mailing_postalCode}, `)
      :
      _evaluateAndSetText(
        formikValues.billing_postalCode,
        BILLING_ADDRESS_POSTALCODE_PLACEHOLDER,
        `${formikValues.billing_postalCode}, `
      )}
    {(addressType === ADDRESS_TYPE_MAIL || onlyUseShipping) ? // Country
      _evaluateAndSetText(
        formikValues.mailing_country,
        MAILING_ADDRESS_COUNTRY_PLACEHOLDER,
        `${formikValues.mailing_country.toUpperCase()}`)
      :
      _evaluateAndSetText(
        formikValues.billing_country,
        BILLING_ADDRESS_COUNTRY_PLACEHOLDER,
        `${formikValues.billing_country.toUpperCase()}`
      )}
  </strong>
);

export default AddressBreadCrumb;
