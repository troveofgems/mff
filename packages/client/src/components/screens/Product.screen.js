import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Loader from '../layout/Loader';
import Notification from "../layout/Notification";
import Rating from "../Rating/Rating";

import { listProductDetails, createProductReview } from '../../redux/actions/product.actions';
import {translateSizeOptionLabel} from "../../utils/dev.utils";
import {CREATE_PRODUCT_REVIEW_RESET} from "../../redux/constants/product.constants";

import "./test.css";
const ProductScreen = () => {
  const
    [sizeSelection, setSizeSelection] = useState(null),
    [paletteSelection, setPaletteSelection] = useState(null),
    [quantity, setQuantity] = useState(1),
    [rating, setRating] = useState(0),
    [comment, setComment] = useState(""),
    [pvc, setPVC] = useState(""),
    [showProductReviewForm, setShowProductReviewForm] = useState(false);

  const
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { id: routeId } = useParams(),
    productReviewDetails = useSelector(state => state.productReviewDetails),
    {
      loading: productDetailLoading,
      error: productDetailError,
      product
    } = useSelector(state => state.productDetails),
    {
      loading: loadingProductReviewDetails,
      error: loadingProductReviewDetailsError,
      success: loadingProductReviewDetailsSuccess
    } = productReviewDetails,
    { auth } = useSelector(state => state.userLogin);

  useEffect(() => {
    dispatch(listProductDetails(routeId));
    if (loadingProductReviewDetailsSuccess) {
      setRating(0);
      setPVC("");
      setComment("");
      setShowProductReviewForm(false);
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
  }, [dispatch, routeId, loadingProductReviewDetailsSuccess, productReviewDetails]);

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

  const handleRequestToCreateReview = evt => {
    console.log('Handle Request To Create A Review', rating, comment, product._id);
    evt.preventDefault();
    let productReview = { rating, comment };
    let token = auth && auth.token ? auth.token : "";
    dispatch(createProductReview(product._id, productReview, token));
    dispatch({type: CREATE_PRODUCT_REVIEW_RESET});
    setShowProductReviewForm(false);
  };

  const handleRequestToShowReviewForm = (evt, reviewData) => {
    evt.preventDefault();
    setShowProductReviewForm(true);
    setComment(reviewData.comment);
    setRating(reviewData.rating);
    //let productReview = { rating, comment };
    //dispatch(createProductReview(product._id, productReview, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGE4M2I3OGYyNjE3OWEzYTFhYTUyMyIsImlhdCI6MTY0NTA0MTY2MSwiZXhwIjoxNjQ1MDYzMjYxfQ.Ctl1uv2miBI8BJ3ZjAkFRYk-b-iDktFDfDUPRy3ub1Q"));
  };

  const userOwnsReview = review => {
    let defaultEvaluation = false;

    if (auth && review) {
      defaultEvaluation = auth.firstName === review.firstName;
    }

    console.log('Determine who owns the review', auth);

    return defaultEvaluation;
  }

  const userHasNotReviewedProduct = () => {
    let
      defaultEvaluation = false,
      {token = null} = auth;

    if (token) {
      setShowProductReviewForm(true);
    }
    console.log('Either Guest Or User Reviewed Product...', auth);
    return defaultEvaluation;
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
        <>
        <Row>
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
        <Row className={"p-5"}>
          <h3>{showProductReviewForm ? "Leave A Review" : "Reviews"}</h3>
          {loadingProductReviewDetailsError && <Notification variant={"danger"}>{loadingProductReviewDetailsError.message}</Notification> }
          <Col className={"p-3"} >
            {product.reviews.length === 0 && (<Notification children={"No Reviews Available"}/>)}
            <ListGroup variant={"flush"} className={"mb-3"}>
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <div>
                    <strong className={"me-3"}>{review.firstName}</strong>
                    {!showProductReviewForm && userOwnsReview(review) && (
                      <i className={"fa-solid fa-square-pen"} onClick={evt => handleRequestToShowReviewForm(evt, review)}>{' '}Edit My Review</i>
                    )}
                  </div>
                  <Rating productRatingInfo={{ productRating: review.rating }} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              {showProductReviewForm && (
                <ListGroup className={"pt-3"}>
                  <Form onSubmit={handleRequestToCreateReview}>
                    <Form.Group controlId={"rating"} className={"p-3 pb-2 pt-2"} style={{width: "25%"}}>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as={'select'} value={rating} onChange={(evt) => setRating(parseInt(evt.target.value))}>
                        <option value={""}>Select...</option>
                        <option value={"1"}>Poor - 1 Star</option>
                        <option value={"2"}>Fair - 2 Stars</option>
                        <option value={"3"}>Good - 3 Stars</option>
                        <option value={"4"}>Very Good - 4 Stars</option>
                        <option value={"5"}>Excellent - 5 Stars</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={"purchaseVerificationCode"} className={"p-3 pb-0 pt-2"}>
                      <Form.Label>Purchase Verification Code</Form.Label>
                      <Form.Control
                        value={pvc} placeholder={"5G2587746V628342D"}
                        onChange={evt => setPVC(evt.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={"comment"} className={"p-3 pb-4 pt-2"}>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as={'textarea'} row={3} value={comment} placeholder={"Review Product Here..."}
                        onChange={evt => setComment(evt.target.value)}
                      >

                      </Form.Control>
                    </Form.Group>
                    <Button type={"submit"} variant={"success"} className={"m-3 mb-4 mt-2"}>Create Review</Button>
                  </Form>
                </ListGroup>
              )}
            </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
