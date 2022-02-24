import React, {useEffect, useState} from 'react';
// Formik
import {Form, Formik} from "formik";
import FormikRadioGroup from "../../formik/radioGroup";
import { useNavigate, useLocation } from 'react-router-dom';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CheckoutBreadcrumb from "../Checkout/Checkout.breadcrumb";
import FormikTextInput from "../../formik/textInput";
import axios from "axios";

const PaymentMethodForm = () => {
  const _addPaypalScript = async() => {
    const {data: clientId} = await axios.get('/api/config/paypal');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onLoad = function() {
      setSDKReady(true);
    }
    document.body.appendChild(script);
  };
  const
    [sdkReady, setSDKReady] = useState(false),
    [promoCodeAccepted, setPromoCodeAccepted] = useState(false),
    [promoCodeDenied, setPromoCodeDenied] = useState(false),
    navigate = useNavigate(),
    location = useLocation();

  useEffect(async () => {
    await _addPaypalScript();
  }, []);

  // TODO: Plug this functionality in once everyone has discussed how it should work.
  let baseSchema = {
    promoCode: ''
  };

  const handleRequestToAcceptPromoCode = promoCode => {
    if (promoCode === "PC-TwilightZone@2000Meters") {
      setPromoCodeAccepted(true);
      setPromoCodeDenied(false);
    } else {
      setPromoCodeAccepted(false);
      setPromoCodeDenied(true);
    }
  };

  return (
    <div className={"formikFormWrapper"}>
      <Formik
        initialValues={baseSchema}
        //validationSchema={formikRegisterValidationSchema}
        onSubmit={async (formData, {setSubmitting}) => {
          setSubmitting(true);
          navigate('/placeOrder', { state: {...location.state, paymentMethod: 0, promoCode: promoCodeAccepted ? formData.promoCode : null} });
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {formik => (
          <Form className='form-box form-wrap text-start content-wrapper' style={{width: '100%'}}>
            <CheckoutBreadcrumb step_1 step_2 step_3 sa={2}/>
            <div className="grid-limit">
              <div className="grid2-1col centered">
                <div id="" className="tab-wrap">
                  <div className="tab-body">
                    <div className="tab-item" style={{display: 'block'}}>
                      <div className="form-box">
                        <div className="form-wrap">
                          <div className={"form-row mt-3"}>
                            <h2>Payment Method</h2>
                            <Row>
                              <Col md={4} sm={12}>
                                <h5 className={"mt-3"} style={{fontSize: '1.25rem', letterSpacing: ".15rem"}}>
                                  Method
                                </h5>
                                <FormikRadioGroup
                                  label={""}
                                  name={"set_paymentMethodType"}
                                  options={[{valueLabel: "Paypal Or Credit Card"}]}
                                  idPrefix={"paymentMethodType"}
                                  currentlySelectedOption={0}
                                />
                              </Col>
                              <Col md={4} sm={12}>
                                <h5 className={"mt-3"}
                                    style={{letterSpacing: ".15rem"}}
                                >
                                  Have a Promo Code?
                                </h5>
                                <FormikTextInput
                                  inputstyle={"w-75"}
                                  labelstyle={{letterSpacing: ".15rem"}}
                                  id={'promoCode'} name={'promoCode'} stylesOverride={{width: "85%"}}
                                  type='text' placeholder='PC-MidnightZone@4000meters'
                                  minLength={0} maxLength={100}
                                  disabled={promoCodeAccepted}
                                />
                                {(formik.values.promoCode && !promoCodeAccepted) && (
                                  <>
                                    <button
                                      type={"button"}
                                      className="button text-black full login-btn my-3"
                                      onClick={() => handleRequestToAcceptPromoCode(formik.values.promoCode)}
                                      disabled={!formik.isValid || formik.isSubmitting}
                                      style={{margin: ".2rem", fontSize: '1.25rem', letterSpacing: ".15rem"}}
                                    >
                                      Add My Promo Code
                                    </button>
                                  </>
                                )}
                                {promoCodeAccepted && (
                                  <div className={"my-2"} style={{color: 'Green', fontSize: '1.25rem', letterSpacing: ".15rem"}}>
                                    Promo Code Accepted!
                                  </div>
                                )}
                                {promoCodeDenied && (
                                  <div className={"my-2"} style={{color: 'red', fontSize: '1.25rem', letterSpacing: ".15rem"}}>
                                    Promo Code Denied!
                                  </div>
                                )}
                              </Col>
                              <Col md={4} sm={12}>
                                <h5 className={"mt-3"} style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}>
                                  Ready To Continue?
                                </h5>
                                <div className="form-actions full py-4 pb-4">
                                  <button
                                    type="submit" className="button text-black full login-btn"
                                    style={{fontSize: "1.25rem", letterSpacing: ".15rem"}}
                                    disabled={!formik.isValid || formik.isSubmitting}
                                  >
                                    Confirm Order & Pay
                                  </button>
                                </div>
                              </Col>
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

export default PaymentMethodForm;