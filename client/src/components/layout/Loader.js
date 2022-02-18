import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner animation={"border"} role={"status"} style={loaderCSS}>
      <span className={"sr-only"}>Loading...</span>
    </Spinner>
  );
};

const loaderCSS = {
  display: 'block',
  height: '100px',
  margin: 'auto',
  width: '100px'
}

export default Loader;
