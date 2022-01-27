import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
// Formik
import {Form, Formik, useFormikContext} from "formik";
import {Link, useNavigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CheckoutBreadcrumb from "../Checkout/Checkout.breadcrumb";
import Notification from "../layout/Notification";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import {createOrder, payForOrder} from "../../redux/actions/order.actions";
import {getLoggedInUserProfile} from "../../redux/actions/auth.actions";

import axios from 'axios';
import {PayPalButton} from "react-paypal-button-v2";
import Loader from "../layout/Loader";
import {LOAD_PAY_ORDER_REQUEST, LOAD_PAY_ORDER_SUCCESS} from "../../redux/constants/order.constants";

//const _addDecimals = someFloat => Math.round((Number(someFloat) * 100) / 100).toFixed(2);

const PlaceOrderForm = () => {
  useEffect(() => !location.state ? navigate('/cart', {}) : null, []); // If State Is Null, Push To Cart

  const
    [sdkReady, setSDKReady] = useState(false),
    [shippingCost, setShippingCost] = useState(0.00),
    [taxCost, setTaxCost] = useState(0.00),
    [cartCost, setCartCost] = useState(0.00),
    [paymentDetails, setPaymentDetails] = useState(null),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation(),
    userViewProfile = useSelector(state => state.userViewProfile),
    userLogin = useSelector(state => state.userLogin),
    payOrderDetails = useSelector(state => state.payOrderDetails),
    {loading: loadingPay, success: paySuccess} = payOrderDetails,
    {user: userProfile} = userViewProfile,
    { auth } = userLogin;

  const formRef = useRef();

  useEffect(() => {
    if (!!auth) {
      dispatch(getLoggedInUserProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch({type: LOAD_PAY_ORDER_REQUEST});
    const addPaypalScript = async() => {
      const {data: clientId} = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onLoad = () => {
        setSDKReady(true);
      }
      document.body.appendChild(script);
    };
    if (!window.paypal) {
      addPaypalScript().then(() => {});
    } else {
      dispatch({type: LOAD_PAY_ORDER_SUCCESS});
      setSDKReady(true);
    }
  }, []);


  const {cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    let
      tempCartCost =
        cartItems.reduce((acc, item) => acc + (item.quantityRequested * item.price), 0).toFixed(2),
      tempTaxCost =
        (tempCartCost * 0.056).toFixed(2),
      tempShippingCost =
        tempCartCost > 50 ? 0.00 : 3.99;

    setCartCost(parseFloat(tempCartCost));
    setTaxCost(parseFloat(tempTaxCost));
    setShippingCost(tempShippingCost);
  }, []);
  let baseSchema = {};
  console.log(location);

  const message_NDA = () => <p>Error: No Data Available</p>;
  const successPaymentHandler = paymentResult => {
    console.log("Payment Result Was: ", paymentResult);
    if (paymentResult && paymentResult.status === "COMPLETED") {
      setPaymentDetails(paymentResult);
      return formRef.current.submitForm();
    } else {
      console.log('Something went wrong with payment');
    }
  };
  return (
    <div className={"formikFormWrapper"}>
      <Formik
        innerRef={formRef}
        initialValues={baseSchema}
        onSubmit={async (formData, {setSubmitting}) => {
          console.log('Now Submitting The Form After Payment Processing...');
          console.log('Get Payment Details ', paymentDetails);
          setSubmitting(true);
          let orderItem = {
            taxCost,
            shippingCost,
            cartCost,
            cartItems,
            totalCost: parseFloat((shippingCost + taxCost + cartCost).toFixed(2)),
            shippingAddress: {
              address_1: location.state.address.mailing_address_line_1,
              address_2: location.state.address.mailing_address_line_2,
              city: location.state.address.mailing_city,
              state: location.state.address.mailing_state,
              postalCode: location.state.address.mailing_postalCode,
              country: location.state.address.mailing_country,
            },
            billingAddress: {
              address_1: location.state.address.billing_address_line_1,
              address_2: location.state.address.billing_address_line_2,
              city: location.state.address.billing_city,
              state: location.state.address.billing_state,
              postalCode: location.state.address.billing_postalCode,
              country: location.state.address.billing_country
            },
            paymentMethod: location.state.paymentMethod,
            promoCode: location.state.promoCode,
            isGuestCheckout: !userProfile,
            user: userProfile ? userProfile._id : null,
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
              id: paymentDetails.id,
              status: paymentDetails.status,
              update_time: paymentDetails.update_time,
              email_address: paymentDetails.email_address
            }
          };
          console.log('Try To Create Item: ', orderItem);
          await createOrder(orderItem)(dispatch);
          setSubmitting(false);
          navigate('/orderSuccess');
        }}
        enableReinitialize
      >
        {formik => (
          <Form className='form-box form-wrap text-start content-wrapper' style={{width: '100%'}}>
            <CheckoutBreadcrumb step_1 step_2 step_3 step_4 sa={3}/>
            <div className="grid-limit">
              <div className="grid2-1col centered">
                <div id="" className="tab-wrap">
                  <div className="tab-body">
                    <div className="tab-item" style={{display: 'block'}}>
                      <div className="form-box">
                        <div className="form-wrap">
                          <div className={"form-row mt-3"}>
                            <h2>Order Details</h2>
                            <Row>
                              <Col md={6} sm={12}>
                                <h4 className={"mt-3"}>
                                  Shipping Information
                                </h4>
                                {(!location || !location.state || !location.state.address) ? message_NDA() : (
                                  <>
                                    <p>
                                      Shipping Address:{' '}
                                      {location.state.address.mailing_address_line_1},{' '}
                                      {(location.state.address.mailing_address_line_2.length) > 0 && (
                                        <>
                                          {location.state.address.mailing_address_line_2},{' '}
                                        </>
                                      )}
                                      {location.state.address.mailing_city},{' '}
                                      {location.state.address.mailing_state.toUpperCase()},{' '}
                                      {location.state.address.mailing_postalCode}{' '}
                                      {location.state.address.mailing_country.toUpperCase()}
                                    </p>
                                      {
                                        location.state.address.billing_address_line_1 ===
                                        location.state.address.mailing_address_line_1 ? false : (
                                          <>
                                          <p>
                                            Billing Address:{' '}
                                            {location.state.address.billing_address_line_1},{' '}
                                            {(location.state.address.billing_address_line_2.length) > 0 && (
                                              <>
                                                {location.state.address.billing_address_line_2},{' '}
                                              </>
                                            )}
                                            {location.state.address.billing_city},{' '}
                                            {location.state.address.billing_state.toUpperCase()},{' '}
                                            {location.state.address.billing_postalCode}{' '}
                                            {location.state.address.billing_country.toUpperCase()}
                                          </p>
                                          </>
                                        )}
                                  </>
                                )}
                                <h4 className={"mt-3"}>
                                  Payment Method
                                </h4>
                                {(!location || !location.state) ? message_NDA() :
                                  (location.state.paymentMethod === 0) && (
                                    <p>
                                      Paypal/Credit Card
                                    </p>
                                  )}
                                {(!location || !location.state) ? message_NDA() :
                                  (!location || !location.state || location.state.promoCode !== null) && (
                                    <>
                                      <h4 className={"mt-3"}>
                                        Promo Code
                                      </h4>
                                      <small>
                                        {location.state.promoCode}
                                      </small>
                                    </>
                                  )}
                              </Col>
                              <Col md={6} sm={12}>
                                <h4 className={"mt-3"}>
                                  Order
                                </h4>
                                {cartItems && cartItems.length === 0 ? (
                                  <Notification>
                                    <div>Your cart is empty.{' '}</div>
                                    <Link to={"/"}>Go Back</Link>
                                  </Notification>
                                ) : (
                                  <ListGroup variant={"flush"}>
                                    {cartItems.map((item, index) => (
                                      <ListGroup.Item key={`${index}${item.product}`}>
                                        <Row>
                                          <Col md={2}>
                                            <Image src={`/img/${item.image}`} alt={item.name} fluid rounded/>
                                          </Col>
                                          <Col md={2}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                          </Col>
                                          <Col md={1}>
                                            ${item.price.toFixed(2)}
                                          </Col>
                                          <Col md={2}>
                                            {/*TODO: Change Field To Dropdown To Auto Update Qtys*/}
                                            Qty: {item.quantityRequested}
                                          </Col>
                                          <Col md={2}>
                                            ${(item.quantityRequested * item.price).toFixed(2)}
                                          </Col>
                                          <Col md={2}>
                                            <Button
                                              type={"button"}
                                              onClick={() => {alert('TODO: Implement Remove From Cart Here')}/*removeFromCartHandler(item.product)*/}>
                                              <i className={"fas fa-trash"}>{}</i>
                                            </Button>
                                          </Col>
                                        </Row>
                                      </ListGroup.Item>
                                    ))}
                                  </ListGroup>
                                )}
                              </Col>
                            </Row>
                            <Row className={"border-top border-bottom my-2"}>
                              <Col md={12} sm={12}>
                                <h4 className={"mt-3"}>
                                  Order Summary
                                </h4>
                                {(
                                  <Row>
                                    <Col md={1}>
                                      <h6>Shipping</h6>
                                    </Col>
                                    <Col md={1}>
                                      ${shippingCost}
                                    </Col>
                                  </Row>
                                )}
                                {(
                                  <Row>
                                    <Col md={1}>
                                      <h6>Cart Total</h6>
                                    </Col>
                                    <Col md={1}>
                                      ${cartCost}
                                    </Col>
                                  </Row>
                                )}
                                {(
                                  <Row>
                                    <Col md={1}>
                                      <h6>Taxes @ 5.6%</h6>
                                    </Col>
                                    <Col md={1}>
                                      {!location || !location.state || location.state.promoCode !== null ? (
                                        <>
                                          {setTaxCost(0.00)}
                                          {'Promo Code - No Taxes'}
                                        </>
                                      ) : (
                                        <>
                                          ${taxCost}
                                        </>
                                      )}
                                    </Col>
                                  </Row>
                                )}
                                {(
                                  <Row>
                                    <Col md={1}>
                                      <h6>Total</h6>
                                    </Col>
                                    <Col md={1}>
                                      ${(shippingCost + taxCost + cartCost).toFixed(2)}
                                    </Col>
                                  </Row>
                                )}
                              </Col>
                            </Row>
                            <div className="form-actions full py-4 pb-4">
                              <h3 className={"text-center pb-3"}>Ready To Pay & Place Your Order?</h3>
                                <div className={"paypalBtnContainer"} style={{display: "flex", justifyContent: "center"}}>
                                  {sdkReady && (
                                    <PayPalButton
                                      amount={(shippingCost + taxCost + cartCost)}
                                      onSuccess={successPaymentHandler}
                                    />
                                  )}
                                </div>
                              <button
                                type="submit" className="button text-black full login-btn"
                                disabled={!formik.isValid || formik.isSubmitting} hidden={true}
                              >
                                Pay & Place Order
                              </button>
                            </div>
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

export default PlaceOrderForm;