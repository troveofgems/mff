import React from "react";
import {Route} from "react-router-dom";

// Specialized Routes, Containers, & Screen Imports
import PrivateRoute from "../helpers/PrivateRoute";
import AdminRoute from "../helpers/AdminRoute";

import AppContainer from "../../components/_AppContainer/AppContainer";
import OrderScreen from "../../components/L1RA/screens/Order.admin.screen";
import Invoice from "../../components/Invoice/Invoice";
import ProductAdminScreen from "../../components/L1RA/screens/Product.admin.screen";
import UserAdminScreen from "../../components/L1RA/screens/User.admin.screen";
import AdminUserForm from "../../components/L1RA/User/features/Admin.UserForm";
import AnalyticsAdminScreen from "../../components/L1RA/screens/Analytics.admin.screen";
import ShopProduct from "../../components/ShopProduct/ShopProduct";

const setL1RARoutes = (isLoggedIn, isAdmin) => (
  <Route path={"/l1ra"} element={<AppContainer/>}>
    <Route exact path="/l1ra/orders" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
      <Route exact path={"/l1ra/orders"} element={<AdminRoute isAppAdmin={isAdmin}/>}>
        <Route index element={<OrderScreen />}/>
      </Route>
      <Route path={"invoice/:id"} element={<AdminRoute isAppAdmin={isAdmin}/>}>
        <Route index element={<Invoice />}/>
      </Route>
    </Route>
    <Route exact path="/l1ra/products" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
      <Route exact path="/l1ra/products" element={<AdminRoute isAppAdmin={isAdmin}/>}>
        <Route index element={<ProductAdminScreen />}/>
        <Route path={"product"} element={<ShopProduct />} />
      </Route>
    </Route>
    <Route exact path="/l1ra/users" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
      <Route exact path="/l1ra/users" element={<AdminRoute isAppAdmin={isAdmin}/>}>
        <Route index element={<UserAdminScreen />}/>
        <Route path={"edit"} element={<AdminUserForm />} />
      </Route>
    </Route>
    <Route exact path="/l1ra/analytics" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
      <Route exact path="/l1ra/analytics" element={<AdminRoute isAppAdmin={isAdmin}/>}>
        <Route index element={<AnalyticsAdminScreen />}/>
      </Route>
    </Route>
  </Route>
);

export default setL1RARoutes;