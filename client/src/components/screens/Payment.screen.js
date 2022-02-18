import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ShippingForm from "../Shipping/ShippingForm";
import PaymentMethodForm from "../PaymentMethod/PaymentForm";

const PaymentMethodScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Row>
      <Col>
        <PaymentMethodForm />
      </Col>
    </Row>
  );
};

export default PaymentMethodScreen;
