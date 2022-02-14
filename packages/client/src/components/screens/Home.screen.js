import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Loader from '../layout/Loader';
import Notification from '../layout/Notification';
import Product from '../Product/Product';
import {
  listProducts, getTopProducts
} from '../../redux/actions/product.actions';
import ProductCarousel from "../ProductCarousel/ProductCarousel";

const HomeScreen = () => {
  const
    dispatch = useDispatch(),
    location = useLocation(),
    productList = useSelector(state => state.productList);

  const
    { loading: productListLoading, error: productListError, products } = productList;

  useEffect(() => {
    if (!!location) {
      let searchTerm = location.state ? location.state.search : "";
      dispatch(listProducts(searchTerm));
    } else {
      dispatch(listProducts());
      dispatch(getTopProducts());
    }
  }, [dispatch, location]);

  return (
    <>
      {productListLoading ? (
        <Loader />
      ) : productListError ? (
        <Notification variant={"danger"}>
          {productListError}
        </Notification>
      ) : (
        <Row>
          <div className={"text-center"}>
            <ProductCarousel />
          </div>
          <h2 className={'text-center my-5'}>Latest Products</h2>
          {products.map((product, index) => (
            <Col sm={12} md={6} lg={4} key={`${index}_${product.name}`}>
              <Product product={product} key={index}/>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
