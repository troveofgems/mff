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
            <div className={"text-center"}>
              <h2>Your cart is empty</h2>
              <h3>😭{' '}So are the Frickn' Fish's Teams' Tummies{' '}😭</h3>
              <Link to={"/"}>Buy Some Stuff!</Link>
            </div>
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
                    <Link to={`/product/${item.product}`} style={{letterSpacing: ".25rem", fontSize: "1rem"}}>{item.name}</Link>
                  </Col>
                  <Col md={1} style={{letterSpacing: ".15rem", fontSize: "1rem"}}>
                    {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(item.price)}
                  </Col>
                  <Col md={6}>
                    <Row className={"text-center"}>
                      <Col md={4} style={{letterSpacing: ".15rem", fontSize: "1rem"}}>
                        Qty: {item.quantityRequested}
                      </Col>
                      {item.sizeRequested && (
                        <Col md={4} style={{letterSpacing: ".15rem", fontSize: "1rem"}}>
                          {translateSizeOptionLabel(item.sizeRequested)}
                        </Col>
                      )}
                      {item.hueRequested && (
                        <Col md={4} style={{letterSpacing: ".15rem", fontSize: "1rem"}}>
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
        <Card style={{background: "transparent", border: "none"}}>
          <ListGroup variant={"flush"}>
            <ListGroup.Item>
              <h3 style={{letterSpacing: ".15rem", fontSize: "1.25rem"}}>
                Subtotal ({cartItems.reduce((acc, item) => acc + parseInt(item.quantityRequested), 0)}) Items
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <span style={{letterSpacing: ".15rem", fontSize: "1.25rem"}}>
                {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(cartItems.reduce((acc, item) => acc + (item.quantityRequested * item.price), 0))}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type={"button"} className={"btn-block"} disabled={cartItems.length === 0}
                onClick={checkoutHandler} style={{letterSpacing: ".15rem", fontSize: "1.25rem"}}
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
