import React from 'react';
import { Route } from 'react-router-dom';

import CartScreen from "../../components/screens/Cart.screen";
import ShippingScreen from "../../components/screens/Shipping.screen";

const cartRoutes = {};

cartRoutes.home = <Route path={`/cart`} element={<CartScreen />} />;
cartRoutes.details = <Route path={`/cart/:id`} element={<CartScreen />} />;
cartRoutes.shipping = <Route path={'/shipping'} element={<ShippingScreen />} />;

export default cartRoutes;
