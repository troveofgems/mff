import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ children, variant }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
};

Notification.defaultProps = {
  variant: 'info'
};

export default Notification;
