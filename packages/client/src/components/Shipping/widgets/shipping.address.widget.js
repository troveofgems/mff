import React, {useEffect} from 'react';

import {
  ADDRESS_LINE_1_MAX_LEN, ADDRESS_LINE_1_MIN_LEN,
  ADDRESS_LINE_2_MAX_LEN, ADDRESS_LINE_2_MIN_LEN,
  ADDRESS_CITY_MAX_LEN, ADDRESS_CITY_MIN_LEN,
  ADDRESS_POSTAL_CODE_MAX_LEN, ADDRESS_POSTAL_CODE_MIN_LEN,
  ADDRESS_COUNTRY_MIN_LEN, ADDRESS_COUNTRY_MAX_LEN
} from "../validation/formik.validation.constants";

// FORMIK Field Imports
import FormikDropdown from "../../../formik/dropdown";
import FormikTextInput from "../../../formik/textInput";

// Custom Data Imports
import usTerritories from '../../../data/usTerritories.json';
import AddressBreadCrumb from "../features/address.breadcrumb";

const ShippingAddressWidget = ({formikValues, onlyUseShipping}) => {
  const addressType = 'mailing'; // TODO: Optimize Pattern

  useEffect(() => {}, []);

  return (
    <>
      <small>
        Current Shipping Address:
      </small>
      <div className={"mb-2"}>
        <AddressBreadCrumb formikValues={formikValues} onlyUseShipping={onlyUseShipping} addressType={addressType} />
      </div>
      <div>
        <div>
          <div className="form-row">
            <div className="form-item registration-form-item">
              <div className={"addressWidget"}>
                <FormikTextInput
                  label='Address Line 1'
                  type='text' id={`${addressType}_address_line_1`} className={"mb-2 shippingInput"}
                  style={{width: "100%!important"}}
                  name={`${addressType}_address_line_1`}
                  minLength={ADDRESS_LINE_1_MIN_LEN} maxLength={ADDRESS_LINE_1_MAX_LEN}
                  placeholder={'123 Misty Lagoon Ln'}
                />
                <FormikTextInput
                  label='Address Line 2'
                  type='text' id={`${addressType}_address_line_2`} className={"mb-2 shippingInput"}
                  name={`${addressType}_address_line_2`} placeholder={"P.O. Box 50"}
                  minLength={ADDRESS_LINE_2_MIN_LEN} maxLength={ADDRESS_LINE_2_MAX_LEN}
                />
                <FormikTextInput
                  label='City'
                  type='text' className={"mb-2 shippingInput"}
                  id={`${addressType}_city`} name={`${addressType}_city`}
                  minLength={ADDRESS_CITY_MIN_LEN} maxLength={ADDRESS_CITY_MAX_LEN}
                  placeholder={'Ballonea'}
                />
                <FormikDropdown
                  label={"State"} className={"mb-2"}
                  id={`${addressType}_state`} name={`${addressType}_state`}
                  options={usTerritories}
                />
                <FormikTextInput
                  label='Postal Code'
                  type='text' id={`${addressType}_postalCode`} className={"mb-2 shippingInput"}
                  name={`${addressType}_postalCode`}
                  minLength={ADDRESS_POSTAL_CODE_MIN_LEN}
                  maxLength={ADDRESS_POSTAL_CODE_MAX_LEN}
                  placeholder={'97229'}
                />
                <FormikTextInput
                  label='Country'
                  type='text' id={`${addressType}_country`} className={"mb-2 shippingInput"}
                  name={`${addressType}_country`}
                  minLength={ADDRESS_COUNTRY_MIN_LEN} maxLength={ADDRESS_COUNTRY_MAX_LEN}
                  placeholder={'USA'} value={'USA'} disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShippingAddressWidget;