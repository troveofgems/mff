import React from 'react';
import { Route } from 'react-router-dom';

import AuthScreen from "../../components/screens/Auth.screen";
import ProfileScreen from "../../components/screens/Profile.screen";
import ForgotPasswordFeature from "../../components/Authentication/features/forgotPassword.feature";

const usrAuthRoutes = {};

usrAuthRoutes.authenticate = <Route path={'/login'} element={<AuthScreen />} />;
usrAuthRoutes.userProfile = <Route path={'/profile'} element={<ProfileScreen />} />;
usrAuthRoutes.forgotPassword = <Route path={'/forgotPassword'} element={<ForgotPasswordFeature />} />;

export default usrAuthRoutes;