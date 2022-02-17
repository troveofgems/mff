import axios from 'axios';
import {
  CREATE_PRODUCT_REVIEW_FAILURE, CREATE_PRODUCT_REVIEW_REQUEST, CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_RESET,
  PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  GET_TOP_PRODUCTS_FAILURE, GET_TOP_PRODUCTS_REQUEST, GET_TOP_PRODUCTS_SUCCESS
} from '../constants/product.constants';

export const listProducts = (keyword = "") => async dispatch => {
  dispatch({type: PRODUCT_LIST_REQUEST});

  console.log('Prior To Calling Backend To Search, looking for ', keyword);

  try {
    const { data } = await axios.get(`/api/v1/product?keyword=${keyword}`);

    console.log("Need To Pass:", data);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: {
        originalData: data.data,
        newData: data.advancedResults
      }
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: err
    });
  }
};
export const listProductDetails = id => async dispatch => {
  dispatch({type: PRODUCT_DETAILS_REQUEST});
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: err
    });
  }
};
export const getTopProducts = () => async dispatch => {
  dispatch({type: GET_TOP_PRODUCTS_REQUEST});
  try {
    const { data } = await axios.get('/api/v1/product/top');
    dispatch({
      type: GET_TOP_PRODUCTS_SUCCESS,
      payload: data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TOP_PRODUCTS_FAILURE,
      payload: err
    });
  }
};
export const createProductReview = (productId, reviewToAdd, token) => async (dispatch, getState) => {
  dispatch({type: CREATE_PRODUCT_REVIEW_REQUEST});
  try {
    const
      config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };

    await axios.put(`/api/v1/product/${productId}/leaveReview`, reviewToAdd, config);
    dispatch({
      type: CREATE_PRODUCT_REVIEW_SUCCESS
    });
  } catch (err) {
    console.log('Error from BE', err.message);
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAILURE,
      payload: err
    });
  }
};