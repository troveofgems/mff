import React from 'react';
import PropTypes from "prop-types";

import Card from 'react-bootstrap/Card';
import Rating from "../Rating/Rating";
import {NavLink} from "react-router-dom";

import './accessibilityTest.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Product = ({ product }) => {
  return (
    <Card className={"my-3 p-3 rounded applyAccessibilityStyles"} key={product._id}>
      <NavLink to={`/product/${product._id}`}>
        <Card.Img src={`img/${product.image}`} variant={'top'} style={{height: "250px"}}/>
      </NavLink>
      <Card.Body>
        <NavLink to={`/product/${product._id}`} className={"text-decoration-none"}>
          <Card.Title as={"div"}>
            <strong style={{fontFamily: "'Cabin Sketch', cursive", fontSize: "1.25rem", letterSpacing: ".1em"}}>
              {product.name}
            </strong>
          </Card.Title>
        </NavLink>
        <Row>
          <Col md={5}>
            <Card.Text as={"h3"} className={"text-black"}>
              {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(product.price)}
            </Card.Text>
          </Col>
          <Col sm={12}>
            <Card.Text as={"div"} className={"text-black"}>
              <Rating
                productRatingInfo={{
                  productRating: product.rating,
                  productReviewCount: product.reviewCount
                }}
              />
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
