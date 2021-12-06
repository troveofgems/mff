import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { products } from '../../data/product_dummyData.json';

import Product from '../Product/Product';

const HomeScreen = () => {

  return (
    <>
      <h2 className={'text-center my-5'}>
        Latest Products
      </h2>
      <Row>
        {products.map(product => (
          <Col
            sm={12} md={6} lg={4}
            key={`${product._id}_${new Date().getMilliseconds()}`}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
