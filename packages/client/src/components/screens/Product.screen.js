import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Loader from '../layout/Loader';
import Notification from "../layout/Notification";
import Rating from "../Rating/Rating";

import { listProductDetails } from '../../redux/actions/product.actions';
import {translateSizeOptionLabel} from "../../utils/dev.utils";

import "./test.css";
const ProductScreen = () => {
  const
    [sizeSelection, setSizeSelection] = useState(null),
    [paletteSelection, setPaletteSelection] = useState(null),
    [quantity, setQuantity] = useState(1);

  const
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { id: routeId } = useParams(),
    {
      loading: productDetailLoading,
      error: productDetailError,
      product
    } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(routeId));
  }, [dispatch, routeId]);

  useEffect(() => {
    if (product.hueOptionsAvailable && paletteSelection === null) {
      let defaultHueSelection = product.hueOptionList[0].bgColorLabel;
      setPaletteSelection(defaultHueSelection);
      let ele = document.getElementById("palette_" + defaultHueSelection);
      if (ele) {
        ele.classList.add("selected_hue");
      }
    }
  }, [product]);

  const addToCartHandler = () => {
    console.log("This Needs To Change Pronto!!!", product);
    let basePath = `/cart/${routeId}?quantity=${quantity || 1}`; // Base Path

    if (sizeSelection || product.sizeOptionsAvailable) {
      let
        capturedFirstValidOption = false,
        firstValidOption = null;

      Object.keys(product.sizeOptionList.regularSizeList).forEach(option => {
        let validOption = product.sizeOptionList.regularSizeList[option] ? option : null;
        if (validOption) {
          if (!capturedFirstValidOption) {
            firstValidOption = option;
            capturedFirstValidOption = true;
          }
        }
      });

      basePath += `&sizeSelection=${sizeSelection || firstValidOption}`;
    }

    if (paletteSelection || product.hueOptionsAvailable) { // Default Is Set In The UseEffect
      basePath += `&hueSelection=${paletteSelection}`;
    }
    navigate({ pathname: basePath });
  };

  const handlePaletteSelection = (possibleOptions, selectedOption) => {
    setPaletteSelection(selectedOption.bgColorLabel); // Track Selected Color
    // Remove Class From All Options
    possibleOptions.forEach(option => {
      let ele = document.getElementById("palette_" + option.bgColorLabel);
      ele.classList.remove("selected_hue");
    });

    // Track What Was Selected
    let ele = document.getElementById("palette_" + selectedOption.bgColorLabel);
    ele.classList.add("selected_hue");
  }

  return (
    <>
      <NavLink to={'/'} className={"btn-goBack"} role={"button"}>Go Back</NavLink>
      {productDetailLoading ? (
        <Loader />
      ) : productDetailError ? (
        <Notification variant={"danger"}>
          {productDetailError}
        </Notification>
      ) : (
        <Row className={"pb-5"}>
          <Col md={3}>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item variant={"flush"}>
                <Rating productRatingInfo={{
                  productRating: product.rating,
                  productReviewCount: product.reviewCount
                }}
                />
              </ListGroup.Item>
              <ListGroup.Item variant={"flush"}>
                Price: {new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(product.price)}
              </ListGroup.Item>
              <ListGroup.Item variant={"flush"}>
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <Image src={`/img/${product.image}`} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <Card className={"makePurchase-card"}>
              <ListGroup variant={"flush"}>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>
                        {new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(product.price)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant={"flush"}>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {
                          product.stockType === 0 || (product.stockType === 2 && product.stockCount > 0) ?
                          'In Stock' : 'Out Of Stock'
                        }
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant={"flush"}>
                <ListGroup.Item className={"text-center"}>
                  <Button className={"btn-block"} type={"button"}
                          disabled={!(product.stockType === 0 || (product.stockType === 2 && product.stockCount > 0))} onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {(product.stockType === 2 && (product.stockCount > 1) || (product.stockType === 0)) && product._id !== "61ad2f61cb276e234673412b" && (
              <Card className={"makePurchase-card py-5"}>
                <ListGroup variant={"flush"} className={"text-center"}>
                  <ListGroup.Item>
                    <Row>
                      <Col>Product Options</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                {(product.stockType === 0 || (product.stockType === 2 && product.stockCount > 1)) && (
                  <ListGroup variant={"flush"}>
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <input type={"number"} placeholder={"0"} value={quantity} min={quantity || 1}
                                 onChange={evt => setQuantity(parseInt(evt.target.value))}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                )}
                {product.sizeOptionsAvailable && (
                  <ListGroup variant={"flush"}>
                    <ListGroup.Item>
                      <Row>
                        <Col>Available Sizes</Col>
                        <Col>
                          <select id="sizes" name="sizes" onChange={evt => setSizeSelection(evt.target.value)}>
                            {Object.keys(product.sizeOptionList.regularSizeList).map(option => (
                              product.sizeOptionList.regularSizeList[option] ? (
                                <>
                                  <option value={option}>{translateSizeOptionLabel(option)}</option>
                                </>
                              ) : null
                            ))}
                          </select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                )}
                {product.hueOptionsAvailable && (
                  <ListGroup variant={"flush"}>
                    <ListGroup.Item>
                      <Row>
                        <Col>Available Palette</Col>
                        <Row className={"mt-3"}>
                          {product.hueOptionList.map(option => (
                            <Col md={6}>
                              <div
                                style={{cursor: "pointer"}}
                                id={"palette_" + option.bgColorLabel}
                                className={"mb-3"} onClick={() => handlePaletteSelection(product.hueOptionList, option)}
                              >
                                <p className={"mb-0"}>{option.bgColorLabel}</p>
                                <div style={
                                  {
                                    backgroundColor: `${option.bgColor}`,
                                    width: "20px",
                                    height: "20px"
                                  }
                                }>{''}</div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </Card>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
