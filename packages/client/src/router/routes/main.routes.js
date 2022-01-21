import React from "react";
import {Route} from "react-router-dom";

// Specialized Routes, Containers, & Screen Imports
import PrivateRoute from "../helpers/PrivateRoute";
import AppContainer from "../../components/_AppContainer/AppContainer";

import HomeScreen from "../../components/screens/Home.screen";
import AuthScreen from "../../components/screens/Auth.screen";
import CartScreen from "../../components/screens/Cart.screen";
import ShippingScreen from "../../components/screens/Shipping.screen";
import PaymentScreen from "../../components/screens/Payment.screen";
import PlaceOrderScreen from "../../components/screens/PlaceOrder.screen";
import ProductScreen from "../../components/screens/Product.screen";
import ProfileScreen from "../../components/screens/Profile.screen";
import OrderSuccess from "../../components/OrderSuccess/OrderSuccess";
import Invoice from "../../components/Invoice/Invoice";
import UserOrderScreen from "../../components/UserOrders/Order.user.screen";
import ForgotPasswordFeature from "../../components/Authentication/features/forgotPassword.feature";

const setMainRoutes = isLoggedIn => (
  <Route path={"/"} element={<AppContainer />}>
    {/*General User Routes*/}
    <Route index element={<HomeScreen />} />
    <Route path="login" element={<AuthScreen />} />
    <Route path="forgotPassword" element={<ForgotPasswordFeature />} />
    {/*Cart Related Routes*/}
    <Route path="cart" element={<CartScreen />}>
      <Route path={":id"} element={<CartScreen />} />
    </Route>
    <Route path="shipping" element={<ShippingScreen />} />
    <Route path="payment" element={<PaymentScreen />} />
    <Route path="placeOrder" element={<PlaceOrderScreen />} />
    <Route path="orderSuccess" element={<OrderSuccess />} />
    {/*Product Related Routes*/}
    <Route path={"product/:id"} element={<ProductScreen />} />
    {/*Authenticated Routing*/}
    <Route exact path="profile" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
      <Route exact path="/profile" element={<ProfileScreen />}/>
    </Route>
    <Route exact path="myOrders" element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
      <Route index element={<UserOrderScreen />}/>
      <Route path={"invoice/:id"} element={<Invoice />} />
    </Route>
  </Route>
);

export default setMainRoutes;