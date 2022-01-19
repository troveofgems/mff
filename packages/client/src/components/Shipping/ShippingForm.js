import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Formik
import {Form, Formik} from "formik";
import FormikCheckbox from "../../formik/checkbox";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {addressSchema} from "./schema/formSchematics";
import buildValidationSchema from "./validation/formik.shipping.validationSchema";
import CheckoutBreadcrumb from "../Checkout/Checkout.breadcrumb";
import BillingAddressWidget from "./widgets/billing.address.widget";
import ShippingAddressWidget from "./widgets/shipping.address.widget";

// Styles Imports
import "./style/Shipping.scss";
const ShippingForm = () => {
  const
    children = [],
    navigate = useNavigate(),
    [onlyUseShipping, setOnlyUseShipping] = useState(false),
    [rememberMyAddress, setRememberMyAddress] = useState(false),
    [dataFromLocalStorage, setDataFromLocalStorage] = useState(null),
    [prefilledSchema, setPrefilledSchema] = useState(null);

  useEffect(() => {
    //if (rememberMyAddress) {
    let addressData = localStorage.getItem('ff_shipping_data');
      if (addressData) {
        setDataFromLocalStorage(addressData)
      }
    //}
  }, []);

  const handleRequestToSaveAddressToLocalStorage = shippingData => {
    localStorage.setItem('ff_shipping_data', JSON.stringify(shippingData));
  };

  const handleRequestToPrefillAddress = formikValues => {
    const parsedData = JSON.parse(dataFromLocalStorage);
    const {
      fill_billingAddress,
      mailing_address_line_1, mailing_address_line_2, mailing_city, mailing_state, mailing_postalCode, mailing_country,
      billing_address_line_1, billing_address_line_2, billing_city, billing_state, billing_postalCode, billing_country
    } = parsedData;

    console.log(typeof parsedData, parsedData);
    if (!fill_billingAddress) { // ie Billing Does Not Match Shipping
      formikValues.fill_billingAddress = fill_billingAddress;
      formikValues.billing_address_line_1 = billing_address_line_1;
      formikValues.billing_address_line_2 = billing_address_line_2;
      formikValues.billing_city = billing_city;
      formikValues.billing_state = billing_state;
      formikValues.billing_postalCode = billing_postalCode;
      formikValues.billing_country = billing_country;
      formikValues.mailing_address_line_1 = mailing_address_line_1;
      formikValues.mailing_address_line_2 = mailing_address_line_2;
      formikValues.mailing_city = mailing_city;
      formikValues.mailing_state = mailing_state;
      formikValues.mailing_postalCode = mailing_postalCode;
      formikValues.mailing_country = mailing_country;
    } else {
      formikValues.mailing_address_line_1 = mailing_address_line_1;
      formikValues.mailing_address_line_2 = mailing_address_line_2;
      formikValues.mailing_city = mailing_city;
      formikValues.mailing_state = mailing_state;
      formikValues.mailing_postalCode = mailing_postalCode;
      formikValues.mailing_country = mailing_country;
    }
    setPrefilledSchema(formikValues);
  };

  return (
    <div className={"formikFormWrapper"}>
      <Formik
        initialValues={prefilledSchema || addressSchema}
        validationSchema={buildValidationSchema(!onlyUseShipping)}
        onSubmit={async (formData, {setSubmitting}) => {
          setSubmitting(true);
          if(formData.fill_billingAddress) {
            formData.billing_address_line_1 = formData.mailing_address_line_1;
            formData.billing_address_line_2 = formData.mailing_address_line_2;
            formData.billing_city = formData.mailing_city;
            formData.billing_state = formData.mailing_state;
            formData.billing_postalCode = formData.mailing_postalCode;
            formData.billing_country = formData.mailing_country;
          }
          if(formData.remember_my_address) {
            handleRequestToSaveAddressToLocalStorage(formData);
          }
          navigate('/payment', { state: {address: formData, paymentMethod: null} });
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {formik => (
          <Form className='form-box form-wrap text-start content-wrapper' style={{width: '100%'}}>
            <CheckoutBreadcrumb step_1 step_2 sa={1}/>
            {(
              <>
                <div className={"text-center"}>
                  <p className={"text-black mb-0 border-top py-1"}>
                    Returning Customer?
                    <Link to={"/login"}>{' '}Click Here</Link> to log in and complete your order.
                  </p>
                  <p className={"text-black border-bottom pb-1"}>
                    If you are new, create an account in just a few minutes!
                  </p>
                </div>
              </>
            )}
            <div className="grid-limit">
              <div className="grid2-1col centered">
                <div id="" className="tab-wrap">
                  <div className="tab-body">
                    <div className="tab-item" style={{display: 'block'}}>
                      <div className="form-box">
                        <div className="form-wrap">
                          <div className={"form-row mt-3"}>
                            <h2 className={"pb-3"}>Shipping Information</h2>
                            <Row>
                              <Col>
                                <FormikCheckbox
                                  children={onlyUseShipping ?
                                    'Use My Shipping Address For Billing' :
                                    'My Billing Address Matches Shipping'
                                  }
                                  id={"fill_billingAddress"} name={"fill_billingAddress"}
                                  onClick={() => setOnlyUseShipping(!onlyUseShipping)}
                                />
                                <FormikCheckbox
                                  children={'Allow Browser To Remember This Information'}
                                  id={"remember_my_address"} name={"remember_my_address"}
                                  onClick={() => setRememberMyAddress(!rememberMyAddress)}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6} sm={12}>
                                <ShippingAddressWidget formikValues={formik.values} onlyUseShipping={onlyUseShipping}/>
                              </Col>
                              <Col md={6} sm={12}>
                                <BillingAddressWidget formikValues={formik.values} onlyUseShipping={onlyUseShipping}/>
                              </Col>
                              {children}
                              <div className="form-actions full py-4 pb-4">
                                <button
                                  type="submit" className="button text-black full login-btn"
                                  disabled={!formik.isValid || formik.isSubmitting}
                                >
                                  Proceed To Billing
                                </button>
                                <span className={"m-3"}/>
                                {false}
                                <button
                                  type="button" className="button text-black full login-btn"
                                  onClick={() => handleRequestToPrefillAddress(formik.values)}
                                  disabled={formik.isSubmitting}
                                >
                                  Prefill Address Info
                                </button>
                              </div>
                            </Row>
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

export default ShippingForm;