import React from 'react';
import { Route } from 'react-router-dom';

import OrderScreen from "../../components/L1RA/screens/Order.admin.screen";
import ProductScreen from "../../components/L1RA/screens/Product.admin.screen";
import UserScreen from "../../components/L1RA/screens/User.admin.screen";
import SettingsScreen from "../../components/L1RA/screens/Settings.admin.screen";

const adminRoutes = {};

adminRoutes.order = <Route path={`/l1ra/orders`} element={<OrderScreen />} />;
adminRoutes.product = <Route path={`/l1ra/products`} element={<ProductScreen />} />;
adminRoutes.user = <Route path={'/l1ra/users'} element={<UserScreen />} />;
adminRoutes.settings = <Route path={'/l1ra/settings'} element={<SettingsScreen />} />;

export default adminRoutes;
