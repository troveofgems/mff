import React from 'react';
import { Route } from 'react-router-dom';

import OrderScreen from "../../components/L1RA/screens/Order.admin.screen";
import ProductScreen from "../../components/L1RA/screens/Product.admin.screen";
import UserScreen from "../../components/L1RA/screens/User.admin.screen";
import SettingsScreen from "../../components/L1RA/screens/Settings.admin.screen";
import Invoice from "../../components/Invoice/Invoice";
import AdminUserForm from "../../components/L1RA/User/features/Admin.UserForm";

const adminRoutes = {};

// Order Routes
adminRoutes.ordersList = <Route path={'/l1ra/orders'} element={<OrderScreen />} />;
adminRoutes.viewInvoice = <Route path={'/l1ra/orders/invoice/:id'} element={<Invoice />} />;


// Product Routes
adminRoutes.product = <Route path={'/l1ra/products'} element={<ProductScreen />} />;


// User Routes
adminRoutes.usersList = <Route path={'/l1ra/users'} element={<UserScreen />} />;
adminRoutes.userFormEdit = <Route path={'/l1ra/users/edit'} element={<AdminUserForm />} />;
adminRoutes.settings = <Route path={'/l1ra/settings'} element={<SettingsScreen />} />;

export default adminRoutes;
