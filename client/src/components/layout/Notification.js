import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ children, variant }) => {
  return (
    <Alert variant={variant}>
      <p style={{paddingBottom: "0", marginBottom: "0", letterSpacing: ".15rem"}}>
        {children}
      </p>
    </Alert>
  );
};

Notification.defaultProps = {
  variant: 'info'
};

export default Notification;
