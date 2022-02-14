import axios from 'axios';
import {
  PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  GET_TOP_PRODUCTS_FAILURE, GET_TOP_PRODUCTS_REQUEST, GET_TOP_PRODUCTS_SUCCESS
} from '../constants/product.constants';

export const listProducts = (keyword = "") => async dispatch => {
  dispatch({type: PRODUCT_LIST_REQUEST});

  console.log('Prior To Calling Backend To Search, looking for ', keyword);

  try {
    const { data } = await axios.get(`/api/v1/product?keyword=${keyword}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data
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