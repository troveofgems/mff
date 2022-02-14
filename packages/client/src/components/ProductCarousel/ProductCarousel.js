import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import {Carousel, Image} from "react-bootstrap";

import {getTopProducts} from "../../redux/actions/product.actions";

import Loader from '../layout/Loader';
import {useDispatch, useSelector} from "react-redux";

const ProductCarousel = () => {
  const
    dispatch = useDispatch(),
    topProducts = useSelector(state => state.topProducts);

  const {
    loading: loadingTopProducts,
    error: errorLoadingTopProducts,
    productList: topProductsList,
    success: loadingTopProductsSuccess
  } = topProducts;

  useEffect(() => {
    console.log('Top Three Products? ', topProductsList);
    if (topProductsList.length === 0) {
      dispatch(getTopProducts());
    }
  }, []);

  return loadingTopProducts ? <Loader /> :
    errorLoadingTopProducts ? <h2>Print Error</h2> : (
      <Carousel pause={"hover"} className={"bg-dark"} style={{maxWidth: "50%", textAlign: "center"}}>
        {topProductsList.map(product => (
          <Carousel.Item key={product._id} className={"text-center"}>
            <Link to={`/product/${product._id}`}>
              <Image src={`img/${product.image}`} alt={product.name} style={{height: "500px"}} fluid />
              <Carousel.Caption className={"carousel-caption"}>
                <h3>{product.name} ({product.price})</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    );
};

export default ProductCarousel;