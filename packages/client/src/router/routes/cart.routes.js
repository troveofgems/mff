import React from 'react';
import { Route } from 'react-router-dom';

import CartScreen from "../../components/screens/Cart.screen";
import ShippingScreen from "../../components/screens/Shipping.screen";
import PaymentScreen from "../../components/screens/Payment.screen";
import PlaceOrderScreen from "../../components/screens/PlaceOrder.screen";
import OrderSuccess from "../../components/OrderSuccess/OrderSuccess";

const cartRoutes = {};

cartRoutes.home = <Route path={`/cart`} element={<CartScreen />} />;
cartRoutes.details = <Route path={`/cart/:id`} element={<CartScreen />} />;
cartRoutes.shipping = <Route path={'/shipping'} element={<ShippingScreen />} />;
cartRoutes.payment = <Route path={'/payment'} element={<PaymentScreen />} />;
cartRoutes.placeOrder = <Route path={'/placeOrder'} element={<PlaceOrderScreen />} />;
cartRoutes.orderSuccess = <Route path={'/orderSuccess'} element={<OrderSuccess />} />;

export default cartRoutes;
