import axios from 'axios';
import {
  ADMIN_CANCEL_ORDER_BY_ID_FAILURE, ADMIN_CANCEL_ORDER_BY_ID_REQUEST, ADMIN_CANCEL_ORDER_BY_ID_SUCCESS,
  ADMIN_LIST_ALL_ORDERS_FAILURE, ADMIN_LIST_ALL_ORDERS_REQUEST, ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ALL_PRODUCTS_FAILURE, ADMIN_LIST_ALL_PRODUCTS_REQUEST, ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAILURE, ADMIN_LIST_ALL_USERS_REQUEST, ADMIN_LIST_ALL_USERS_SUCCESS,
  ADMIN_LIST_USER_DETAILS_FAILURE, ADMIN_LIST_USER_DETAILS_REQUEST, ADMIN_LIST_USER_DETAILS_SUCCESS,
  ADMIN_UPDATE_USER_DETAILS_FAILURE, ADMIN_UPDATE_USER_DETAILS_REQUEST, ADMIN_UPDATE_USER_DETAILS_SUCCESS,
  ADMIN_DELETE_USER_BY_ID_FAILURE, ADMIN_DELETE_USER_BY_ID_REQUEST, ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS,
  ADMIN_MARK_ORDER_SHIPPED_FAILURE, ADMIN_MARK_ORDER_SHIPPED_REQUEST, ADMIN_MARK_ORDER_SHIPPED_SUCCESS,
  ADMIN_LIST_ORDER_DETAILS_FAILURE, ADMIN_LIST_ORDER_DETAILS_REQUEST, ADMIN_LIST_ORDER_DETAILS_SUCCESS
} from '../constants/admin.constants';
import {
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS
} from "../constants/auth.constants";

/************************************/
/************* ORDERS ***************/
/************************************/
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

/**********************************/
/************* PRODUCTS ***********/
/**********************************/
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

/*******************************/
/************* USERS ***********/
/*******************************/
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
export const adminGetUserProfileById = id => async (dispatch, getState) => {
  dispatch({ type: ADMIN_LIST_USER_DETAILS_REQUEST });

  try {
    const
      { userLogin: { auth } } = getState(),
      config = {
        'Content-Type': 'application/json',
        'x-auth-token': auth.token
      },
      { data: {data} } = await axios.get(`/api/v1/l1rAdmin/users/${id}`, config);

    dispatch({
      type: ADMIN_LIST_USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_LIST_USER_DETAILS_FAILURE,
      payload: err
    });
  }
};
export const adminUpdateUserProfileById = updates => async (dispatch, getState) => {
  dispatch({ type: ADMIN_UPDATE_USER_DETAILS_REQUEST });
  const
    { userLogin: { auth } } = getState(),
    xAuthToken = auth.token || auth;

  if (xAuthToken === undefined) { // Dont allow requests without a token to send a response to the server. 8000
    throw new Error('Contact The Sys-Admin. Error Code: 8000');
  }

  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'x-auth-token': xAuthToken
      }
    };

    const {data: {data}} = await axios.put(`/api/v1/authentorization/authentication/updateUser`, updates, config);

    dispatch({
      type: ADMIN_UPDATE_USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_UPDATE_USER_DETAILS_FAILURE,
      payload: err
    });
  }

};