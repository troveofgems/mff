import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Loader from '../layout/Loader';
import Notification from '../layout/Notification';
import Product from '../Product/Product';
import {
  listProducts
} from '../../redux/actions/product.actions';

const HomeScreen = () => {
  const
    dispatch = useDispatch(),
    productList = useSelector(state => state.productList);

  const
    { loading: productListLoading, error: productListError, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h2 className={'text-center my-5'}>Latest Products</h2>
      {productListLoading ? (
        <Loader />
      ) : productListError ? (
        <Notification variant={"danger"}>
          {productListError}
        </Notification>
      ) : (
        <Row>
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
