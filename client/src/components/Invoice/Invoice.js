import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {invoiceSchema} from './schema/formSchematics';
import Loader from "../layout/Loader";
import {getOrderByIdForUser} from "../../redux/actions/order.actions";
import {reviewInvoice} from "../../redux/actions/admin.actions";

const Invoice = () => {
  const
    [formState, setFormState] = useState(invoiceSchema),
    dispatch = useDispatch(),
    location = useLocation(),
    userLogin = useSelector(state => state.userLogin),
    getOrderDetails = useSelector(state => state.getOrderDetails),
    viewInvoice = useSelector(state => state.viewInvoice),
    {
      invoice: adminRequestedInvoice,
      loading: loadingInvoiceForAdmin,
      error: adminInvoiceLoadingError,
      success: adminInvoiceLoadingSuccess
    } = viewInvoice,
    {
      invoice: userRequestedInvoice,
      loading: loadingInvoiceForUser,
      error: userInvoiceLoadingError,
      success: userInvoiceLoadingSuccess
    } = getOrderDetails,
    {auth: { token }} = userLogin;

  const coupleDataToSchema = (invoiceSchema, invoice) => {
    const invoiceData = {...invoiceSchema, ...invoice};
    console.log('!~~~~~~~~~~~~~~~~~~~~', invoiceData);
    invoiceData.shipToName = invoiceData.shippingAddress.ship_to_first_name + " " + invoiceData.shippingAddress.ship_to_last_name;
    invoiceData.billToName = invoiceData.billingAddress.bill_to_first_name + " " + invoiceData.billingAddress.bill_to_last_name;
    invoiceData.cartIsEmpty = invoiceData.cartItems.length === 0;
    invoiceData.showShippingStatus = !invoiceData.hasBeenCancelled;
    invoiceData.showDeliveryStatus = invoiceData.hasBeenShipped;
    invoiceData.showRefundStatus = invoiceData.hasBeenCancelled;
    return invoiceData;
  };

  useEffect(() => { // Admin Or User Call To BE needs to happen here...
    const locationStateIsStr = typeof location.state === "string"; // Reg Users will pass a string
    if(locationStateIsStr){
      dispatch(getOrderByIdForUser(token, location.state));
    } else if (location.state && location.state.adminCall) { // Admins Pass objects
      dispatch(reviewInvoice(token, location.state.oid));
    } else {
      console.log('Something Went Wrong');
    }
  }, [dispatch]);

  useEffect(() => {
    if (adminInvoiceLoadingSuccess) {
      let invoiceData = coupleDataToSchema(invoiceSchema, adminRequestedInvoice);
      setFormState(invoiceData);
    } else if (adminInvoiceLoadingError) {
      console.log('Failure To Load', adminInvoiceLoadingError);
    }
  }, [loadingInvoiceForAdmin]);

  useEffect(() => {
    if (userInvoiceLoadingSuccess) {
      let invoiceData = coupleDataToSchema(invoiceSchema, userRequestedInvoice);
      setFormState(invoiceData);
    } else if (userInvoiceLoadingError) {
      console.log('Failure To Load', userInvoiceLoadingError);
    }
  }, [loadingInvoiceForUser]);

  const {
    orderRefId, createdAt, hasBeenCancelled, cancelledAt, cartIsEmpty, cartItems,
    shippingAddress, billingAddress, showAddressLine2_billing, showAddressLine2_shipping,
    paymentMethod, cartCost, shippingCost, taxCost, totalCost, hasBeenShipped, promoCode, showRefundStatus,
    refundStatus, showShippingStatus, name, paymentResult, shipToName, billToName, shippedOn, hasBeenDelivered,
    showDeliveryStatus, deliveredOn, hasBeenRefunded, refundedOn
  } = formState;

  return (
    <>
      {loadingInvoiceForUser || loadingInvoiceForAdmin ? (
        <Loader />
      ) : (
        <>
          <h2>Order #{orderRefId}</h2>
          <div className={"bg-dark bg-gradient"}>
            <h3 className={"p-2 py-1"}>
              Invoice Details
            </h3>
            <p className={"p-2 py-1"}>Order Placed: {createdAt}</p>
            {hasBeenCancelled && (
              <p className={"p-2 py-1"}>Order Cancelled: {cancelledAt}</p>
            )}
            <Row>
              <Col md={2}>
                <h4 className={"p-2 py-1"}>Item Summary</h4>
                <div>
                  {cartIsEmpty ? (
                    <>
                      <p className={"p-2 py-1"}>No Data Available</p>
                    </>
                  ) : (
                    <>
                      {cartItems.map(cartItem => (
                        <>
                          <div className={"p-2 py-1"}>
                            {cartItem.quantityRequested}x{' '}
                            {cartItem.sizeRequested ? cartItem.sizeRequested : null}{' '}
                            {cartItem.hueRequested ? cartItem.hueRequested : null}{' '}
                            {cartItem.name}
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </Col>
              <Col md={3}>
                <h4 className={"p-2 py-1"}>Address Details</h4>
                <h5 className={"p-2 py-1 m-0"}>Shipping To</h5>
                <div className={"p-2 py-1 m-0"}>
                  {shippingAddress && (
                    <>
                      <p className={"p-0 m-0"}>
                        {shipToName}
                      </p>
                      <p className={"p-0 m-0"}>
                        {shippingAddress.address_1 || "-"}
                        {showAddressLine2_shipping && (
                          <>
                            , {shippingAddress.address_2}
                          </>
                        )}
                      </p>
                      <p className={"p-0 m-0"}>
                        {shippingAddress.city || "-"},{" "}
                        {shippingAddress.state ? shippingAddress.state.toUpperCase() : " -"}
                        {" "}{shippingAddress.postalCode || "-"}
                      </p>
                      <p className={"p-0 m-0"}>
                        {shippingAddress.country ? shippingAddress.country.toUpperCase() : " -"}
                      </p>
                    </>
                  )}
                </div>
                <h5 className={"p-2 py-3 pb-0 m-0"}>Billing To</h5>
                <div className={"p-2 py-1 pb-0 m-0"}>
                  {billingAddress && (
                    <>
                      <p className={"p-0 m-0"}>
                        {billToName}
                      </p>
                      <p className={"p-0 m-0"}>
                        {billingAddress.address_1 || "-"}
                        {showAddressLine2_billing && (
                          <>
                            , {billingAddress.address_2}
                          </>
                        )}
                      </p>
                      <p className={"p-0 m-0"}>
                        {billingAddress.city || "-"},{" "}
                        {billingAddress.state ? billingAddress.state.toUpperCase() : " -"}
                        {" "}{billingAddress.postalCode || " -"}
                      </p>
                      <p className={"p-0 m-0 mb-5"}>
                        {billingAddress.country ? billingAddress.country.toUpperCase() : " -"}
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
                      <h6>Status</h6>
                    </Col>
                    <Col>
                      {(paymentResult && paymentResult.status)}
                    </Col>
                  </Row>
                )}
                {(
                  <Row className={"p-2 py-1"}>
                    <Col md={4}>
                      <h6>Paid At</h6>
                    </Col>
                    <Col>
                      {(paymentResult && paymentResult.update_time)}
                    </Col>
                  </Row>
                )}
                {(
                  <Row className={"p-2 py-1"}>
                    <Col md={4}>
                      <h6>Payment Method</h6>
                    </Col>
                    <Col>
                      {(paymentMethod === 0 && ("PayPal/Credit Card")) || "NDA"} {/*paymentMethod is Number From DB*/}
                    </Col>
                  </Row>
                )}
                {promoCode !== null && (
                  <Row className={"p-2 py-1"}>
                    <Col md={4}>
                      <h6>Promo Code</h6>
                    </Col>
                    <Col>
                      {promoCode}
                    </Col>
                  </Row>
                )}
                {(
                  <Row className={"p-2 py-1"}>
                    <Col md={4}>
                      <h6>Cart Total</h6>
                    </Col>
                    <Col>
                      ${cartCost}
                    </Col>
                  </Row>
                )}
                {(
                  <Row className={"p-2 py-1"}>
                    <Col md={4}>
                      <h6>Shipping</h6>
                    </Col>
                    <Col>
                      ${shippingCost}
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
                        ${taxCost}
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
                      ${(totalCost)}
                    </Col>
                  </Row>
                )}
              </Col>
              <Col md={3}>
                <h4 className={"p-2 py-1"}>Order Status</h4>
                {(
                  <>
                    <Row className={"p-2 py-1"}>
                      <Col md={4}>
                        <h6>Shipping Status:</h6>
                      </Col>
                      <Col>
                        {hasBeenCancelled ? (
                          <>
                            <p>This Order Has Been Cancelled</p>
                          </>
                        ) : (
                          <>
                            {showShippingStatus ? (
                              <>
                                {!hasBeenShipped ? (
                                  <>
                                    <p>Waiting To Be Shipped</p>
                                  </>
                                ) : (
                                  <>
                                    <p>Package Shipped</p>
                                  </>
                                )}
                              </>
                            ) : (
                              <p>No Data Available</p>
                            )}
                          </>
                        )}
                      </Col>
                    </Row>
                    {!hasBeenCancelled && hasBeenShipped && (
                      <Row className={"p-2 py-1"}>
                        <Col md={4}>
                          <h6>Shipped:</h6>
                        </Col>
                        <Col>
                          {hasBeenCancelled ? (
                            <>
                              <p>This Order Has Been Cancelled</p>
                            </>
                          ) : (
                            <>
                              {showShippingStatus ? (
                                <>
                                  {!hasBeenShipped ? (
                                    <>
                                      <p>No Data</p>
                                    </>
                                  ) : (
                                    <>
                                      <p>{shippedOn}</p>
                                    </>
                                  )}
                                </>
                              ) : (
                                <p>No Data Available</p>
                              )}
                            </>
                          )}
                        </Col>
                      </Row>
                    )}
                    {!hasBeenCancelled && hasBeenShipped && showDeliveryStatus && (
                      <Row className={"p-2 py-1"}>
                        <Col md={4}>
                          <h6>Delivery Status:</h6>
                        </Col>
                        <Col>
                          {hasBeenCancelled ? (
                            <>
                              <p>This Order Has Been Cancelled</p>
                            </>
                          ) : (
                            <>
                              {showDeliveryStatus ? (
                                <>
                                  {!hasBeenDelivered ? (
                                    <>
                                      <p>Out For Delivery</p>
                                    </>
                                  ) : (
                                    <>
                                      <p>COMPLETED</p>
                                    </>
                                  )}
                                </>
                              ) : (
                                <p>No Data Available</p>
                              )}
                            </>
                          )}
                        </Col>
                      </Row>
                    )}
                    {!hasBeenCancelled && hasBeenShipped && showDeliveryStatus && (
                      <Row className={"p-2 py-1"}>
                        <Col md={4}>
                          <h6>Delivery:</h6>
                        </Col>
                        <Col>
                          {hasBeenCancelled ? (
                            <>
                              <p>This Order Has Been Cancelled</p>
                            </>
                          ) : (
                            <>
                              {showDeliveryStatus ? (
                                <>
                                  {!hasBeenDelivered ? (
                                    <>
                                      <p>Out For Delivery</p>
                                    </>
                                  ) : (
                                    <>
                                      <p>{deliveredOn}</p>
                                    </>
                                  )}
                                </>
                              ) : (
                                <p>No Data Available</p>
                              )}
                            </>
                          )}
                        </Col>
                      </Row>
                    )}

                    {showRefundStatus && (
                      <>
                        <Row className={"p-2 py-1"}>
                          <Col md={4}>
                            <h6>Refund Status:</h6>
                          </Col>
                          <Col>
                            {hasBeenCancelled && !hasBeenRefunded ? (
                              <>
                                <p>Pending</p>
                              </>
                            ) : (
                              <>
                                {hasBeenRefunded && (
                                  <>
                                    <p>COMPLETE</p>
                                  </>
                                )}
                              </>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}


                    {showRefundStatus && (
                      <>
                        <Row className={"p-2 py-1"}>
                          <Col md={4}>
                            <h6>Refunded On:</h6>
                          </Col>
                          <Col>
                            {hasBeenCancelled && !hasBeenRefunded ? (
                              <>
                                <p>Pending</p>
                              </>
                            ) : (
                              <>
                                {(!hasBeenShipped) && (
                                  <>
                                    <p>{refundedOn}</p>
                                  </>
                                )}
                              </>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
};

export default Invoice;