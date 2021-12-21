import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Loader from '../layout/Loader';
import Notification from "../layout/Notification";
import Rating from "../Rating/Rating";

import { listProductDetails } from '../../redux/actions/product.actions';

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { id: routeId } = useParams(),
    {
      loading: productDetailLoading,
      error: productDetailError,
      product
    } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(routeId));
  }, [dispatch, routeId]);

  // Component Handlers
  const addToCartHandler = () => {
    navigate({ pathname: `/cart/${routeId}?quantity=${quantity}` });
  };

  return (
    <>
      <NavLink to={'/'} className={"btn-goBack"} role={"button"}>Go Back</NavLink>
      {productDetailLoading ? (
        <Loader />
      ) : productDetailError ? (
        <Notification variant={"danger"}>
          {productDetailError}
        </Notification>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={`/img/${product.image}`} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item variant={"flush"}>
                <Rating productRatingInfo={{
                  productRating: product.rating,
                  productReviewCount: product.reviewCount
                }}
                />
              </ListGroup.Item>
              <ListGroup.Item variant={"flush"}>
                Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item variant={"flush"}>
                {product.description}
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
                        ${product.price}
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
                        {product.inStock ? 'In Stock' : 'Out Of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant={"flush"}>
                <ListGroup.Item className={"text-center"}>
                  <Button className={"btn-block"} type={"button"}
                          disabled={!product.inStock} onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
