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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FIRST_NAME_MAX_LEN,
  FIRST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN
} from "../../L1RA/User/validation/formik.validation.constants";

const BillingAddressWidget = ({formikValues, onlyUseShipping}) => {
  const addressType = 'billing';

  useEffect(() => {}, []);

  return (
    <>
      <small style={{letterSpacing: ".15rem", fontSize: "1rem"}}>
        Current Billing Address:
      </small>
      <div className={"mb-2"}>
        <AddressBreadCrumb formikValues={formikValues} onlyUseShipping={onlyUseShipping} addressType={addressType} />
      </div>
      <div>
        <div>
          <div className="form-row">
            <div className="form-item registration-form-item">
              <Row className={"pb-2"}>
                <Col md={6}>
                  <FormikTextInput
                    label='First Name'
                    type='text' id={`${addressType}_bill_to_first_name`} inputstyle={"mb-2 shippingInput"}
                    style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
                    name={`${addressType}_bill_to_first_name`} disabled={onlyUseShipping}
                    minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                    placeholder={'Michael'}
                  />
                </Col>
                <Col md={6}>
                  <FormikTextInput
                    label='Last Name'
                    type='text' id={`${addressType}_bill_to_last_name`} inputstyle={"mb-2 shippingInput"}
                    style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
                    name={`${addressType}_bill_to_last_name`} disabled={onlyUseShipping}
                    minLength={LAST_NAME_MIN_LEN} maxLength={LAST_NAME_MAX_LEN}
                    placeholder={'Fish'}
                  />
                </Col>
              </Row>
              <div className={"addressWidget"}>
                <FormikTextInput
                  label='Address Line 1'
                  type='text' id={`${addressType}_address_line_1`} inputstyle={"mb-2 shippingInput"}
                  style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
                  name={`${addressType}_address_line_1`} disabled={onlyUseShipping}
                  minLength={ADDRESS_LINE_1_MIN_LEN} maxLength={ADDRESS_LINE_1_MAX_LEN}
                  placeholder={'500 Main Street'}
                />
                <FormikTextInput
                  label='Address Line 2'
                  type='text' id={`${addressType}_address_line_2`} inputstyle={"mb-2 shippingInput"}
                  style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
                  name={`${addressType}_address_line_2`} disabled={onlyUseShipping}
                  minLength={ADDRESS_LINE_2_MIN_LEN} maxLength={ADDRESS_LINE_2_MAX_LEN}
                />
                <FormikTextInput
                  label='City'
                  type='text' inputstyle={"mb-2 shippingInput"} disabled={onlyUseShipping}
                  style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
                  id={`${addressType}_city`} name={`${addressType}_city`}
                  minLength={ADDRESS_CITY_MIN_LEN} maxLength={ADDRESS_CITY_MAX_LEN}
                  placeholder={'El Segundo'}
                />
                <FormikDropdown
                  label={"State"} disabled={onlyUseShipping}
                  id={`${addressType}_state`} name={`${addressType}_state`}
                  style={{minWidth: "100%", fontSize: "1.25rem", letterSpacing: ".15rem"}}
                  options={usTerritories}
                />
                <FormikTextInput
                  label='Postal Code'
                  type='text' id={`${addressType}_postalCode`} inputstyle={"mb-2 shippingInput"}
                  name={`${addressType}_postalCode`} disabled={onlyUseShipping}
                  minLength={ADDRESS_POSTAL_CODE_MIN_LEN}
                  maxLength={ADDRESS_POSTAL_CODE_MAX_LEN}
                  placeholder={'90245'}
                />
                <FormikTextInput
                  label='Country'
                  type='text' id={`${addressType}_country`} inputstyle={"mb-2 shippingInput"}
                  style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
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

export default BillingAddressWidget;