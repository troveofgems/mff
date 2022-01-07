import {
  CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
  LIST_USER_ORDERS_FAILURE, LIST_USER_ORDERS_REQUEST, LIST_USER_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS,
  CANCEL_ORDER_BY_ID_FAILURE, CANCEL_ORDER_BY_ID_REQUEST, CANCEL_ORDER_BY_ID_SUCCESS
} from '../../constants/order.constants';

export const createOrderReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
        error: null,
        order: null,
        success: null
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        error: null,
        success: true
      }
    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        order: null,
        success: false
      }
    default:
      return state;
  }
};

export const listUserOrdersReducer = (state = {}, action) => {
  switch(action.type) {
    case LIST_USER_ORDERS_REQUEST:
      return {
        loading: true,
        error: null,
        userOrderList: null,
        success: null
      };
    case LIST_USER_ORDERS_SUCCESS:
      return {
        loading: false,
        userOrderList: action.payload,
        error: null,
        success: true
      }
    case LIST_USER_ORDERS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        userOrderList: null,
        success: false
      }
    default:
      return state;
  }
};

export const getOrderByIdReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_ORDER_BY_ID_REQUEST:
      return {
        loading: true,
        error: null,
        orderDetails: null,
        success: null
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
        error: null,
        success: true
      }
    case GET_ORDER_BY_ID_FAILURE:
      return {
        loading: false,
        error: action.payload,
        orderDetails: null,
        success: false
      }
    default:
      return state;
  }
};

export const cancelOrderByIdReducer = (state = {}, action) => {
  switch(action.type) {
    case CANCEL_ORDER_BY_ID_REQUEST:
      return {
        loading: true,
        error: null,
        cancellationStatus: null,
        success: null
      };
    case CANCEL_ORDER_BY_ID_SUCCESS:
      return {
        loading: false,
        cancellationStatus: action.payload,
        error: null,
        success: true
      }
    case CANCEL_ORDER_BY_ID_FAILURE:
      return {
        loading: false,
        error: action.payload,
        cancellationStatus: null,
        success: false
      }
    default:
      return state;
  }
};