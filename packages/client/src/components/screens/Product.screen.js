import React from 'react';
import { NavLink, useParams } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { products } from '../../data/product_dummyData.json';
import Rating from "../Rating/Rating";

const ProductScreen = () => {
  const
    { id: routeId } = useParams(),
    product = products.find(product => product._id === routeId);
  return (
    <>
      <NavLink to={'/'} className={"btn-goBack"}>Go Back</NavLink>
      <Row>
        <Col md={6}>
          <Image src={`/img/${product.productImage}`} alt={product.productName} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant={"flush"}>
            <ListGroup.Item>
              <h3>{product.productName}</h3>
            </ListGroup.Item>
            <ListGroup.Item variant={"flush"}>
              <Rating productRatingInfo={{
                productRating: product.productRating,
                productReviewCount: product.productReviewCount
              }}
              />
            </ListGroup.Item>
            <ListGroup.Item variant={"flush"}>
              Price: ${product.productPrice}
            </ListGroup.Item>
            <ListGroup.Item variant={"flush"}>
              {product.productDescription}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card className={"makePurchase-card"}>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>
                      ${product.productPrice}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.productInStock ? 'In Stock' : 'Out Of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant={"flush"}>
              <ListGroup.Item className={"text-center"}>
               <Button className={"btn-block"} type={"button"}
                disabled={!product.productInStock}
               >
                 Add To Cart
               </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
