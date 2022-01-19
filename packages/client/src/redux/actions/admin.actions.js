import axios from 'axios';
import {
  ADMIN_CANCEL_ORDER_BY_ID_FAILURE, ADMIN_CANCEL_ORDER_BY_ID_REQUEST, ADMIN_CANCEL_ORDER_BY_ID_SUCCESS,
  ADMIN_LIST_ALL_ORDERS_FAILURE, ADMIN_LIST_ALL_ORDERS_REQUEST, ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ALL_PRODUCTS_FAILURE, ADMIN_LIST_ALL_PRODUCTS_REQUEST, ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAILURE, ADMIN_LIST_ALL_USERS_REQUEST, ADMIN_LIST_ALL_USERS_SUCCESS,
  ADMIN_MARK_ORDER_SHIPPED_FAILURE, ADMIN_MARK_ORDER_SHIPPED_REQUEST, ADMIN_MARK_ORDER_SHIPPED_SUCCESS,
  ADMIN_LIST_ORDER_DETAILS_FAILURE, ADMIN_LIST_ORDER_DETAILS_REQUEST, ADMIN_LIST_ORDER_DETAILS_SUCCESS
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
      payload: err
    });
  }
};

export const reviewInvoice = (token, orderId) => async dispatch => {
  dispatch({ type: ADMIN_LIST_ORDER_DETAILS_REQUEST });
  try {
    const
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      { data: {data} } = await axios.get(`/api/v1/l1rAdmin/orders/invoice/${orderId}`, config);

    dispatch({
      type: ADMIN_LIST_ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_LIST_ORDER_DETAILS_FAILURE,
      payload: err
    });
  }
};

export const adminCancelOrderById = (token, orderId) => async dispatch => {
  dispatch({ type: ADMIN_CANCEL_ORDER_BY_ID_REQUEST });

  try {
    const
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      updates = {
        hasBeenCancelled: true,
        cancelledAt: new Date(),
        cancelledBy: 1
      },
      { data: {data} } = await axios.put(`/api/v1/l1rAdmin/orders/cancel/${orderId}`, updates, config);

    dispatch({
      type: ADMIN_CANCEL_ORDER_BY_ID_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_CANCEL_ORDER_BY_ID_FAILURE,
      payload: err
    });
  }
};

export const adminMarkOrderShipped = (token, orderId) => async dispatch => {
  dispatch({ type: ADMIN_MARK_ORDER_SHIPPED_REQUEST });

  try {
    const
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      updates = {
        hasBeenShipped: true,
        shippedOn: new Date()
      },
      { data: {data} } = await axios.put(`/api/v1/l1rAdmin/orders/markShipped/${orderId}`, updates, config);

    dispatch({
      type: ADMIN_MARK_ORDER_SHIPPED_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_MARK_ORDER_SHIPPED_FAILURE,
      payload: err
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