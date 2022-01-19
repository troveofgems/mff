import {
  CANCEL_ORDER_BY_ID_FAILURE, CANCEL_ORDER_BY_ID_REQUEST, CANCEL_ORDER_BY_ID_SUCCESS,
  CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
  LIST_USER_ORDERS_FAILURE, LIST_USER_ORDERS_REQUEST, LIST_USER_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS
} from '../constants/order.constants';
import axios from "axios";

export const createOrder = order => async dispatch => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'x-auth-token': order.user
      }
    };
    const {data: {data}} = await axios.post(`/api/v1/order`, order, config);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: {...err}
    });
  }
};

export const getAllOrdersForUser = userToken => async dispatch => {
  dispatch({ type: LIST_USER_ORDERS_REQUEST });
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };

    const {data: {data}} = await axios.get(`/api/v1/order/myOrders`, config);

    dispatch({
      type: LIST_USER_ORDERS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: LIST_USER_ORDERS_FAILURE,
      payload: {...err}
    });
  }
};

export const getOrderByIdForUser = (userToken, orderId) => async dispatch => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };

    const { data: { data } } = await axios.get(`/api/v1/order/myOrders/invoice/${orderId}`, config);

    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: {...err}
    });
  }
};

export const cancelOrderByIdForUser = (userToken, orderId) => async dispatch => {
  dispatch({ type: CANCEL_ORDER_BY_ID_REQUEST });
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'x-auth-token': userToken
      }
    };

    let updates = {
      hasBeenCancelled: true,
      cancelledAt: new Date()
    };

    await axios.put(`/api/v1/order/myOrders/cancel/${orderId}`, updates, config);

    dispatch({
      type: CANCEL_ORDER_BY_ID_SUCCESS,
      payload: {cancelled: true}
    });
  } catch(err) {
    dispatch({
      type: CANCEL_ORDER_BY_ID_FAILURE,
      payload: {...err, cancelled: false}
    });
  }
};