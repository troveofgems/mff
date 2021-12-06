import React from 'react';
import PropTypes from "prop-types";

import Card from 'react-bootstrap/Card';
import Rating from "../Rating/Rating";
import {NavLink} from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className={"my-3 p-3 rounded"}>
      <NavLink to={`/product/${product._id}`}>
        <Card.Img src={`img/${product.productImage}`} variant={'top'} />
      </NavLink>
      <Card.Body>
        <NavLink to={`/product/${product._id}`}>
          <Card.Title as={"div"}>
            <strong>
              {product.productName}
            </strong>
          </Card.Title>
        </NavLink>
        <Card.Text as={"div"}>
          <Rating
            productRatingInfo={{
              productRating: product.productRating,
              productReviewCount: product.productReviewCount
            }}
          />
        </Card.Text>
        <Card.Text as={"h3"}>
          ${product.productPrice}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
