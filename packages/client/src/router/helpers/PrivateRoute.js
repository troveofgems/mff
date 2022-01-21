import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({isLoggedIn = false}) => isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
export default PrivateRoute;