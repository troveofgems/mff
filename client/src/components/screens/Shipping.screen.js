import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ShippingForm from "../Shipping/ShippingForm";

const ShippingScreen = ({formikValues}) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Row>
      <Col>
        <ShippingForm formikValues={formikValues}/>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
