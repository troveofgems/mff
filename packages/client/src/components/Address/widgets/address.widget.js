import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

import {Formik, Form} from "formik";
import { addressSchema } from '../schema/formSchematics';
/*import formikLoginValidationSchema 	from "../validation/formik.login.validationSchema";*/

import Notification from "../../layout/Notification";

import {useDispatch} from "react-redux";
import {
  ADDRESS_LINE_1_MAX_LEN, ADDRESS_LINE_1_MIN_LEN,
  ADDRESS_LINE_2_MAX_LEN, ADDRESS_LINE_2_MIN_LEN,
  ADDRESS_CITY_MAX_LEN, ADDRESS_CITY_MIN_LEN,
  ADDRESS_POSTAL_CODE_MAX_LEN, ADDRESS_POSTAL_CODE_MIN_LEN,
  ADDRESS_COUNTRY_MIN_LEN, ADDRESS_COUNTRY_MAX_LEN
} from "../validation/formik.validation.constants";

// FORMIK Field Imports
import FormikCheckbox from "../../../formik/checkbox";
import FormikDropdown from "../../../formik/dropdown";
import FormikTextInput from "../../../formik/textInput";

// Custom Data Imports
import usTerritories from '../../../data/usTerritories.json';

const AddressWidget = ({widgetTitle, children}) => {
  const
    [hideBilling, setHideBilling] = useState(true),
    dispatch = useDispatch(),
    userLogin = useSelector(state => state.userLogin),
    [globalError, setGlobalError] = useState(null),
    {loading: authLoading, error: authError, auth} = userLogin,
    addrType = widgetTitle.toLowerCase();

  useEffect(() => {}, []);

  return (
    <div className={"formikFormWrapper"}>
      <Formik
        initialValues={addressSchema}
        //validationSchema={formikRegisterValidationSchema}
        onSubmit={async (formData, {setSubmitting}) => {
          setSubmitting(true);
          console.log('Form Submit', formData);

          setSubmitting(false);
        }}
        enableReinitialize
      >
        {formik => (
          <Form className='form-box form-wrap text-start content-wrapper' style={{minWidth: '500px'}}>
            <div className="grid-limit">
              <div className="grid2-1col centered">
                <div id="" className="tab-wrap">
                  <div className="tab-body">
                    <div className="tab-item" style={{display: 'block'}}>
                      <div className="form-box">
                        <div className="form-wrap">
                          <div className={"form-row mt-3"}>
                            <h2>{widgetTitle} Address</h2>
                            {widgetTitle === "Mailing" && (
                              <>
                                <small>
                                  Current {widgetTitle} Address:
                                </small>
                                <div className={"mb-2"}>
                                  <strong>123 Misty Lagoon Ln, P.O. Box 50, Shale City OR 97229, USA</strong>
                                </div>
                                <div className={"row"}>
                                  <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                    <div className="form-row">
                                      <div className="form-item registration-form-item">
                                        <div className={"addressWidget"}>
                                          <FormikTextInput
                                            label='Address Line 1'
                                            type='text' id={`${addrType}_address_line_1`} className={"mb-2"}
                                            name={`${addrType}_address_line_1`}
                                            minLength={ADDRESS_LINE_1_MIN_LEN} maxLength={ADDRESS_LINE_1_MAX_LEN}
                                            placeholder={'123 Misty Lagoon Ln'}
                                          />
                                          <FormikTextInput
                                            label='Address Line 2'
                                            type='text' id={`${addrType}_address_line_2`} className={"mb-2"}
                                            name={`${addrType}_address_line_2`}
                                            minLength={ADDRESS_LINE_2_MIN_LEN} maxLength={ADDRESS_LINE_2_MAX_LEN}
                                            placeholder={'P.O. Box 50'}
                                          />
                                          <FormikTextInput
                                            label='City'
                                            type='text' id={`${addrType}_city`} className={"mb-2"}
                                            name={`${addrType}_city`}
                                            minLength={ADDRESS_CITY_MIN_LEN} maxLength={ADDRESS_CITY_MAX_LEN}
                                            placeholder={'Slate'}
                                          />
                                          <FormikDropdown
                                            label={"State"} className={"mb-2"}
                                            id={`${addrType}_state`} name={`${addrType}_state`}
                                            options={usTerritories}
                                          />
                                          <FormikTextInput
                                            label='Postal Code'
                                            type='text' id={`update_${addrType}_postalCode`} className={"mb-2"}
                                            name={`${addrType}_postalCode`}
                                            minLength={ADDRESS_POSTAL_CODE_MIN_LEN}
                                            maxLength={ADDRESS_POSTAL_CODE_MAX_LEN}
                                            placeholder={'97229'}
                                          />
                                          <FormikTextInput
                                            label='Country'
                                            type='text' id={`update_${addrType}_country`} className={"mb-2"}
                                            name={`${addrType}_country`}
                                            minLength={ADDRESS_COUNTRY_MIN_LEN} maxLength={ADDRESS_COUNTRY_MAX_LEN}
                                            placeholder={'USA'}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {widgetTitle === "Billing" && (
                              <>
                                {hideBilling && (
                                  <>
                                    <small>
                                      Current {widgetTitle} Address:
                                    </small>
                                    <div className={"mb-2"}>
                                      <strong>500 Main Street, El Segundo, CA 90245, USA</strong>
                                    </div>
                                    <div className={"row"}>
                                      <div className={"col-md-6 col-sm-12"} style={{overflow: 'hidden'}}>
                                        <div className="form-row">
                                          <div className="form-item registration-form-item">
                                            <div className={"addressWidget"}>
                                              <FormikTextInput
                                                label='Address Line 1'
                                                type='text' id={`${addrType}_address_line_1`} className={"mb-2"}
                                                name={`${addrType}_address_line_1`}
                                                minLength={ADDRESS_LINE_1_MIN_LEN} maxLength={ADDRESS_LINE_1_MAX_LEN}
                                                placeholder={'500 Main Street'}
                                              />
                                              <FormikTextInput
                                                label='Address Line 2'
                                                type='text' id={`${addrType}_address_line_2`} className={"mb-2"}
                                                name={`${addrType}_address_line_2`}
                                                minLength={ADDRESS_LINE_2_MIN_LEN} maxLength={ADDRESS_LINE_2_MAX_LEN}
                                              />
                                              <FormikTextInput
                                                label='City'
                                                type='text' className={"mb-2"}
                                                id={`${addrType}_city`} name={`${addrType}_city`}
                                                minLength={ADDRESS_CITY_MIN_LEN} maxLength={ADDRESS_CITY_MAX_LEN}
                                                placeholder={'El Segundo'}
                                              />
                                              <FormikDropdown
                                                label={"State"} className={"mb-2"}
                                                id={`${addrType}_state`} name={`${addrType}_state`}
                                                options={usTerritories}
                                              />
                                              <FormikTextInput
                                                label='Postal Code'
                                                type='text' id={`${addrType}_postalCode`} className={"mb-2"}
                                                name={`${addrType}_postalCode`}
                                                minLength={ADDRESS_POSTAL_CODE_MIN_LEN}
                                                maxLength={ADDRESS_POSTAL_CODE_MAX_LEN}
                                                placeholder={'90245'}
                                              />
                                              <FormikTextInput
                                                label='Country'
                                                type='text' id={`update_${addrType}_country`} className={"mb-2"}
                                                name={`update_${addrType}_country`}
                                                minLength={ADDRESS_COUNTRY_MIN_LEN} maxLength={ADDRESS_COUNTRY_MAX_LEN}
                                                placeholder={'USA'}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                                <FormikCheckbox
                                  children={hideBilling ?
                                    'Use My Shipping Address' :
                                    'My Billing Address Matches Shipping'
                                  }
                                  id={"fill_billingAddress"} name={"fill_billingAddress"}
                                  onClick={() => setHideBilling(!hideBilling)}
                                />
                              </>
                            )}
                            {children}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddressWidget;