import React from "react";
import {Navigate, Outlet} from "react-router-dom";

//TODO: Track Accounts That Attempt To Access Admin Routes.
const AdminRoute = ({isAppAdmin = false}) => isAppAdmin ? <Outlet /> : <Navigate to={"/login"} />;
export default AdminRoute;