import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Notification from "../layout/Notification";
import Address from "../Address/Address";

const ShippingScreen = () => {
  const
    dispatch = useDispatch(),
    location = useLocation(),
    navigate = useNavigate();

  useEffect(() => {

  }, [dispatch]);

  return (
    <Row>
      <h3>Shipping</h3>
      <Col md={6}>
        <Address addressType={"mailing"} />
      </Col>
      <Col md={6}>
        <Address addressType={"billing"} />
      </Col>
    </Row>
  );
};

export default ShippingScreen;
