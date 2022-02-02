import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Table} from "react-bootstrap";

import {getAllProductsForAdmin} from "../../../redux/actions/admin.actions";
import Image from "react-bootstrap/Image";
import {adminDeleteProduct} from "../../../redux/actions/admin.actions";

const ProductScreen = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    allProducts = useSelector(state => state.allProducts),
    userLogin = useSelector(state => state.userLogin),
    deleteProduct = useSelector(state => state.deleteProduct),
    {auth: {token}} = userLogin,
    {loading: loadingProductDelete, success: productDeleteSuccess} = deleteProduct,
    {listOfProducts} = allProducts;

  useEffect(() => {
    dispatch(getAllProductsForAdmin());
  }, [dispatch, loadingProductDelete]);

  const handleDeleteProduct = pid => {
    let confirmation =
      prompt(
        `Are You Sure You Want To Delete This Product? 
        Copy & Paste The Following Id to continue: ${pid}`
      );
    if (confirmation === pid) {
      console.log("Proceed With Delete", token, pid);
      dispatch(adminDeleteProduct(token, pid));
    }
  };
  const handleRequestToCreateANewProduct = () => navigate("/l1ra/products/product", {state: {pid: null}});
  const handleRequestToEditAProduct = pid => navigate("/l1ra/products/product", {state: {pid}});

  console.log(deleteProduct);

  return (
    <>
      <h2 className={'text-center my-5'}>Admin Product Portal</h2>
      <Row>
        <Col md={2}>
          <button type={"button"} className={"text-dark mb-2"}
            onClick={() => handleRequestToCreateANewProduct()}
          >
            Create New Product
          </button>
        </Col>
        <Col md={6} className={"text-center"}>
          <input placeholder={"Product Search"} className={"w-75"} maxLength={100}/>
        </Col>
      </Row>
      <Table striped bordered hover responsive className={'table-sm bg-light'}>
        <thead>
        <tr>
          <th className={"bg-transparent"}>ID</th>
          <th className={"bg-transparent"}>IMAGE</th>
          <th className={"bg-transparent"}>NAME</th>
          <th className={"bg-transparent"}>PUBLISHED TO SHOP</th>
          <th className={"bg-transparent"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {listOfProducts && listOfProducts.length > 0 ? (
          <>
            {listOfProducts.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td className={"text-center"}>
                  <Image src={`/img/${product.image}`} alt={product.name} fluid rounded style={{height: "4rem"}}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.publishedToShop ? "Published" : "Not Published"}</td>
                <td style={{cursor: "pointer"}}>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}
                            onClick={() => handleRequestToEditAProduct(product._id)}
                    >
                      <i className="fas fa-edit"/>{' '}
                      Edit Product
                    </button>
                  </div>
                  <div className={"m-2"}>
                    <button type={"button"} className={"text-dark"}
                            onClick={() => handleDeleteProduct(product._id)}
                    >
                      <i className="fas fa-trash-alt" />{' '}
                      Delete Product
                    </button>
                  </div>
                </td>
              </tr>
            ))
            }
          </>
        ) : (
          <tr>
            <td>
              No Products To Display
            </td>
          </tr>
        )}
        </tbody>
      </Table>
    </>
  );
};

export default ProductScreen;