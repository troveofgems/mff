import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PlaceOrderForm from "../PlaceOrder/PlaceOrderForm";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Row>
      <Col>
        <PlaceOrderForm />
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
