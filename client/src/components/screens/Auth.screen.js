import React, { useEffect } from 'react';
import Authentication from "../Authentication/Authentication";
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Loader from '../layout/Loader';
import Notification from '../layout/Notification';

const AuthScreen = () => {
  return (
    <>
      <Authentication />
    </>
  );
};

export default AuthScreen;
