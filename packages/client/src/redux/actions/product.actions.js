import axios from 'axios';
import {
  PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS
} from '../constants/product.constants';

export const listProducts = () => async dispatch => {
  dispatch({type: PRODUCT_LIST_REQUEST});
  try {
    const { data } = await axios.get('/api/v1/product');
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
    console.log('Data from server ', data);
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