import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Loader from '../layout/Loader';
import Notification from '../layout/Notification';
import Product from '../Product/Product';
import {
  listProducts, getTopProducts
} from '../../redux/actions/product.actions';
import ProductCarousel from "../ProductCarousel/ProductCarousel";

import Paginate from "../layout/Paginate";

const HomeScreen = () => {
  const
    dispatch = useDispatch(),
    location = useLocation(),
    productList = useSelector(state => state.productList),
    [currentPage, setCurrentPage] = useState(1);

  const
    { loading: productListLoading, error: productListError, products, advResults } = productList;

  useEffect(() => {
    if (!!location) {
      let searchTerm = location.state ? location.state.search : "";
      dispatch(listProducts(searchTerm));
    } else {
      dispatch(listProducts());
      dispatch(getTopProducts());
    }
  }, [dispatch, location]);

  const printProducts = () => {
    let jsx = [];

    for (let i = ((currentPage - 1) * 2); i < (2 * currentPage); i += 1) {
      let productInQuestion = advResults ? advResults.data[i] : null;
      if (productInQuestion) {
        jsx.push(<>
          <Col sm={12} md={6} lg={4} key={`${productInQuestion.name}__${i}`}>
            <Product product={productInQuestion} />
          </Col>
        </>);
      }
    }

    return jsx;
  };

  useEffect(() => {
    printProducts();
  }, [currentPage]);

  const handleChangeToPageState = pageNumber => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {productListLoading ? (
        <Loader />
      ) : productListError ? (
        <Notification variant={"danger"}>
          {productListError}
        </Notification>
      ) : (<>
        <Row className={"pb-5"}>
          {/*{location === null || (location && (!location.state || !location.state.search)) && (
            <div className={"text-center"}>
              <ProductCarousel />
            </div>
          )}*/}
          <h2 className={'text-center my-5'}>Latest Products</h2>
          {advResults && printProducts()}
          {/*{products.map((product, index) => (
            <Col sm={12} md={6} lg={4} key={`${product.name}__${index}`}>
              <Product product={product} key={index}/>
            </Col>
          ))}*/}
        </Row>
        <Paginate
          className={"pb-5"}
          pages={advResults && advResults.pagination && advResults.pagination.totalPages ? advResults.pagination.totalPages : 1 }
          page={currentPage}
          keyword={location && location.state && location.state.search ? location.state.search : ""}
          changePageContents={handleChangeToPageState}
        />
      </>)}
    </>
  );
};

export default HomeScreen;