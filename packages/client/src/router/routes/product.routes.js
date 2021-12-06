import React from 'react';
import { Route } from 'react-router-dom';

import ProductScreen from "../../components/screens/Product.screen";

const productRoutes = {};

productRoutes.viewProductById = <Route path={'/product/:id'} element={<ProductScreen />} />;

export default productRoutes;