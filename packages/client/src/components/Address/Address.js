import React from 'react';
import AddressWidget from "./widgets/address.widget";

// Styles Imports
//import "./style/Address.scss";
const Address = ({ addressType }) => {
  let widgetTitle = addressType.substring(0,1).toUpperCase() + addressType.substring(1);
  return <AddressWidget widgetTitle={widgetTitle} />;
}

export default Address;