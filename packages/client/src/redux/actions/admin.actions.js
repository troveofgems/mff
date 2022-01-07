import axios from 'axios';
import {
  ADMIN_LIST_ALL_ORDERS_FAILURE, ADMIN_LIST_ALL_ORDERS_REQUEST, ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ALL_PRODUCTS_FAILURE, ADMIN_LIST_ALL_PRODUCTS_REQUEST, ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAILURE, ADMIN_LIST_ALL_USERS_REQUEST, ADMIN_LIST_ALL_USERS_SUCCESS,
} from '../constants/admin.constants';

export const getAllOrdersForAdmin = token => async dispatch => {
  dispatch({ type: ADMIN_LIST_ALL_ORDERS_REQUEST });

  try {
    const
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      { data: {data} } = await axios.get('/api/v1/l1rAdmin/orders', config);

    dispatch({
      type: ADMIN_LIST_ALL_ORDERS_SUCCESS,
      payload: data
    });
  } catch(err) {
    console.log('Error is: ', err);
    dispatch({
      type: ADMIN_LIST_ALL_ORDERS_FAILURE,
      payload: err.response.data.error.message
    });
  }
};

export const getAllProductsForAdmin = token => async dispatch => {
  dispatch({ type: ADMIN_LIST_ALL_PRODUCTS_REQUEST });

  try {
    const
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      { data: {data} } = await axios.get('/api/v1/l1rAdmin/products', config);

    dispatch({
      type: ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_LIST_ALL_PRODUCTS_FAILURE,
      payload: err.response.data.error.message
    });
  }
};

export const getAllUsersForAdmin = token => async dispatch => {
  dispatch({ type: ADMIN_LIST_ALL_USERS_REQUEST });

  try {
    const
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      { data: {data} } = await axios.get('/api/v1/l1rAdmin/users', config);

    dispatch({
      type: ADMIN_LIST_ALL_USERS_SUCCESS,
      payload: data
    });
  } catch(err) {
    console.log("Err is: ", err);
    dispatch({
      type: ADMIN_LIST_ALL_USERS_FAILURE,
      payload: err.response.data.error.message
    });
  }
};