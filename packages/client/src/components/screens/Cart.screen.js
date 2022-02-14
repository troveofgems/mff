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

import {translateSizeOptionLabel} from "../../utils/dev.utils";

const CartScreen = () => {
  const
    {id: productId} = useParams(),
    dispatch = useDispatch(),
    location = useLocation(),
    navigate = useNavigate(),
    reqQty = location.search ? Number(location.search.split("=")[1]) : 1, // This line needs to be re-written.
    { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if(productId) {
      let
        queryStr = location.search.split("?")[1],
        passedOptions = queryStr.split("&"),
        requestedQuantity = passedOptions[0].split("=")[1],
        requestedSize = passedOptions[1] ? passedOptions[1].split("=")[1] : null,
        requestedPaletteHue = passedOptions[2] ? passedOptions[2].split("=")[1] : null;

      dispatch(addToCart(productId, requestedQuantity, requestedSize, requestedPaletteHue));
    }
  }, [dispatch, productId, reqQty]);

  const checkoutHandler = () => navigate({ pathname: `/shipping` });
  const removeFromCartHandler = id => dispatch(removeFromCart(id));

  return (
    <Row>
      <h3>My Cart</h3>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Notification>
            <div>Your cart is empty{' '}😭</div>
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
                  <Col md={2}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={1}>
                    {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(item.price)}
                  </Col>
                  <Col md={6}>
                    <Row className={"text-center"}>
                      <Col md={4}>
                        Qty: {item.quantityRequested}
                      </Col>
                      {item.sizeRequested && (
                        <Col md={4}>
                          {translateSizeOptionLabel(item.sizeRequested)}
                        </Col>
                      )}
                      {item.hueRequested && (
                        <Col md={4}>
                         {decodeURI(item.hueRequested)}
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Col md={1}>
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
              <h3>Subtotal ({cartItems.reduce((acc, item) => acc + parseInt(item.quantityRequested), 0)}) Items</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(cartItems.reduce((acc, item) => acc + (item.quantityRequested * item.price), 0))}
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
