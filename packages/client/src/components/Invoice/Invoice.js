import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import {getOrderByIdForUser} from "../../redux/actions/order.actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Invoice = () => {
  const
    dispatch = useDispatch(),
    location = useLocation(),
    navigate = useNavigate(),
    userLogin = useSelector(state => state.userLogin),
    getOrderDetails = useSelector(state => state.getOrderDetails),
    {orderDetails} = getOrderDetails,
    {auth: { token }} = userLogin;

  useEffect(() => !location.state ? navigate('/myOrders') : null);
  useEffect(() => {
    dispatch(getOrderByIdForUser(token, location.state));
  }, [dispatch]);

  return (
    <>
      <h2>Order #{orderDetails && orderDetails._id}</h2>
      <div className={"bg-dark bg-gradient"}>
        <h3 className={"p-2 py-1"}>
          Invoice Details
        </h3>
        <Row>
          <Col md={2}>
            <h4 className={"p-2 py-1"}>Item Summary</h4>
            <div>
              {orderDetails && orderDetails.cartItems.length > 0 && orderDetails.cartItems.map(cartItem => (
                <>
                  <div className={"p-2 py-1"}>
                    {cartItem.quantityRequested}x {cartItem.name}
                  </div>
                </>
              ))}
            </div>
          </Col>
          <Col md={3}>
            <h4 className={"p-2 py-1"}>Address Details</h4>
            <h5 className={"p-2 py-1 m-0"}>Shipping To</h5>
            <div className={"p-2 py-1 m-0"}>
              {orderDetails && orderDetails.shippingAddress && (
                <>
                  <p className={"p-0 m-0"}>
                    {orderDetails.shippingAddress.address_1}
                    {orderDetails.shippingAddress.address_2.length > 0 && (
                      <>
                        , {orderDetails.shippingAddress.address_2}
                      </>
                    )}
                  </p>
                  <p className={"p-0 m-0"}>
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state.toUpperCase()}{" "}
                    {orderDetails.shippingAddress.postalCode}
                  </p>
                  <p className={"p-0 m-0"}>
                    {orderDetails.shippingAddress.country.toUpperCase()}
                  </p>
                </>
              )}
            </div>
            <h5 className={"p-2 py-1 pb-0 m-0"}>Billing To</h5>
            <div className={"p-2 py-1 pb-0 m-0"}>
              {orderDetails && orderDetails.billingAddress && (
                <>
                  <p className={"p-0 m-0"}>
                    {orderDetails.billingAddress.address_1}
                    {orderDetails.billingAddress.address_2.length > 0 && (
                      <>
                        , {orderDetails.billingAddress.address_2}
                      </>
                    )}
                  </p>
                  <p className={"p-0 m-0"}>
                    {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state.toUpperCase()}{" "}
                    {orderDetails.billingAddress.postalCode}
                  </p>
                  <p className={"p-0 m-0"}>
                    {orderDetails.billingAddress.country.toUpperCase()}
                  </p>
                </>
              )}
            </div>
          </Col>
          <Col md={3}>
            <h4 className={"p-2 py-1"}>Payment Information</h4>
            {(
              <Row className={"p-2 py-1"}>
                <Col md={4}>
                  <h6>Payment Method</h6>
                </Col>
                <Col>
                  {orderDetails && orderDetails.paymentMethod === 0 && ("PayPal/Credit Card")}
                </Col>
              </Row>
            )}
            {orderDetails && orderDetails.promoCode !== null && (
              <Row className={"p-2 py-1"}>
                <Col md={5}>
                  <h6>Promo Code</h6>
                </Col>
                <Col>
                  {orderDetails && orderDetails.promoCode}
                </Col>
              </Row>
            )}
            {(
              <Row className={"p-2 py-1"}>
                <Col md={4}>
                  <h6>Cart Total</h6>
                </Col>
                <Col>
                  ${orderDetails && orderDetails.cartCost}
                </Col>
              </Row>
            )}
            {(
              <Row className={"p-2 py-1"}>
                <Col md={4}>
                  <h6>Shipping</h6>
                </Col>
                <Col>
                  ${orderDetails && orderDetails.shippingCost}
                </Col>
              </Row>
            )}
            {(
              <Row className={"p-2 py-1"}>
                <Col md={4}>
                  <h6>Taxes</h6>
                </Col>
                <Col>
                  <>
                    ${orderDetails && orderDetails.taxCost}
                  </>
                </Col>
              </Row>
            )}
            {(
              <Row className={"p-2 py-1"}>
                <Col md={4}>
                  <h6>Total</h6>
                </Col>
                <Col>
                  ${(orderDetails && orderDetails.totalCost)}
                </Col>
              </Row>
            )}
          </Col>
          <Col md={3}>
            <h4 className={"p-2 py-1"}>Order Status</h4>
            {(
              <Row className={"p-2 py-1"}>
                <Col md={4}>
                  <h6>Shipping Status</h6>
                </Col>
                <Col>
                  {(orderDetails && !orderDetails.isDelivered) && (
                    <>
                      <p>Waiting To Be Shipped</p>
                    </>
                )}
                </Col>
              </Row>
            )}


          </Col>
        </Row>
      </div>
    </>
  )
};

export default Invoice;