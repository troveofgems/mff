import React from 'react';
import PropTypes from "prop-types";

import Card from 'react-bootstrap/Card';
import Rating from "../Rating/Rating";
import {NavLink} from "react-router-dom";

import './accessibilityTest.scss';
const Product = ({ product }) => {
  return (
    <Card className={"my-3 p-3 rounded applyAccessibilityStyles"} key={product._id}>
      <NavLink to={`/product/${product._id}`}>
        <Card.Img src={`img/${product.image}`} variant={'top'} style={{height: "250px"}}/>
      </NavLink>
      <Card.Body>
        <NavLink to={`/product/${product._id}`}>
          <Card.Title as={"div"}>
            <strong>
              {product.name}
            </strong>
          </Card.Title>
        </NavLink>
        <Card.Text as={"div"} className={"text-black"}>
          <Rating
            productRatingInfo={{
              productRating: product.rating,
              productReviewCount: product.reviewCount
            }}
          />
        </Card.Text>
        <Card.Text as={"h3"} className={"text-black"}>
          {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(product.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
