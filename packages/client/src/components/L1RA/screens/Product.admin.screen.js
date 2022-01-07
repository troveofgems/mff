import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Table} from "react-bootstrap";
import {PASSWORD_MAX_LEN, PASSWORD_MIN_LEN} from "../../Authentication/validation/formik.validation.constants";
import FormikTextInput from "../../../formik/textInput";
import {getAllProductsForAdmin} from "../../../redux/actions/admin.actions";
import Image from "react-bootstrap/Image";

const ProductScreen = () => {
  const
    dispatch = useDispatch(),
    allProducts = useSelector(state => state.allProducts),
    {listOfProducts} = allProducts;

  useEffect(() => {
    dispatch(getAllProductsForAdmin('someToken'));
  }, [dispatch]);

  const handleDeleteProduct = pid => {
    let confirmation =
      prompt(
        `Are You Sure You Want To Delete This Product? 
        Copy & Paste The Following Id to continue: ${pid}`
      );
    if (confirmation === pid) {
      console.log("Proceed With Delete");
    }
  };

  return (
    <>
      <h2 className={'text-center my-5'}>Admin Product Portal</h2>
      <Row>
        <Col md={2}>
          <button type={"button"} className={"text-dark mb-2"}>
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
                    <button type={"button"} className={"text-dark"}>
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
          <h3>No Products To Display</h3>
        )}
        </tbody>
      </Table>
    </>
  );
};

export default ProductScreen;