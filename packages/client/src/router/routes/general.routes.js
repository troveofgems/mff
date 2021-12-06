import React from 'react';
import { Route } from 'react-router-dom';

import HomeScreen from "../../components/screens/Home.screen";

const generalRoutes = {};

generalRoutes.home = <Route path={'/'} element={<HomeScreen />} />;

export default generalRoutes;
