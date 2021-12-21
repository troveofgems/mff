import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Notification from "../layout/Notification";
import { addToCart, removeFromCart } from "../../redux/actions/cart.actions";

const CartScreen = () => {
  const
    {id: productId} = useParams(),
    dispatch = useDispatch(),
    location = useLocation(),
    navigate = useNavigate(),
    reqQty = location.search ? Number(location.search.split("=")[1]) : 1,
    { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, reqQty));
    }
  }, [dispatch, productId, reqQty]);

  const checkoutHandler = () => navigate({ pathname: `/shipping` });
  const removeFromCartHandler = id => dispatch(removeFromCart(id));

  return (
    <Row>
      <h3>My Cart</h3>
      <Col md={8}>
        <h4>Cart Items</h4>
        {cartItems.length === 0 ? (
          <Notification>
            <div>Your cart is empty.{' '}</div>
            <Link to={"/"}>Go Back</Link>
          </Notification>
        ) : (
          <ListGroup variant={"flush"}>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={`${index}${item.product}`}>
                <Row>
                  <Col md={2}>
                    <Image src={`/img/${item.image}`} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price.toFixed(2)}
                  </Col>
                  <Col md={2}>
                    Quantity: {item.quantityRequested}
                  </Col>
                  <Col md={2}>
                    <Button
                      type={"button"}
                      onClick={() => removeFromCartHandler(item.product)}>
                      <i className={"fas fa-trash"}>{}</i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant={"flush"}>
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantityRequested, 0)}) Items</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                ${cartItems.reduce((acc, item) => acc + (item.quantityRequested * item.price), 0).toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type={"button"} className={"btn-block"} disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
