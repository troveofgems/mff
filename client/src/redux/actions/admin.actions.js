import axios from 'axios';
import {
  ADMIN_CANCEL_ORDER_BY_ID_FAILURE,
  ADMIN_CANCEL_ORDER_BY_ID_REQUEST,
  ADMIN_CANCEL_ORDER_BY_ID_SUCCESS,
  ADMIN_LIST_ALL_ORDERS_FAILURE,
  ADMIN_LIST_ALL_ORDERS_REQUEST,
  ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ALL_PRODUCTS_FAILURE,
  ADMIN_LIST_ALL_PRODUCTS_REQUEST,
  ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAILURE,
  ADMIN_LIST_ALL_USERS_REQUEST,
  ADMIN_LIST_ALL_USERS_SUCCESS,
  ADMIN_LIST_USER_DETAILS_FAILURE,
  ADMIN_LIST_USER_DETAILS_REQUEST,
  ADMIN_LIST_USER_DETAILS_SUCCESS,
  ADMIN_UPDATE_USER_DETAILS_FAILURE,
  ADMIN_UPDATE_USER_DETAILS_REQUEST,
  ADMIN_UPDATE_USER_DETAILS_SUCCESS,
  ADMIN_DELETE_USER_BY_ID_FAILURE,
  ADMIN_DELETE_USER_BY_ID_REQUEST,
  ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS,
  ADMIN_MARK_ORDER_SHIPPED_FAILURE,
  ADMIN_MARK_ORDER_SHIPPED_REQUEST,
  ADMIN_MARK_ORDER_SHIPPED_SUCCESS,
  ADMIN_LIST_ORDER_DETAILS_FAILURE,
  ADMIN_LIST_ORDER_DETAILS_REQUEST,
  ADMIN_LIST_ORDER_DETAILS_SUCCESS,
  ADMIN_DELETE_USER_BY_ID_SUCCESS,
  ADMIN_FETCH_USER_ORDERS_FAILURE,
  ADMIN_FETCH_USER_ORDERS_REQUEST,
  ADMIN_FETCH_USER_ORDERS_SUCCESS,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAILURE,
  ADMIN_DELETE_PRODUCT_BY_ID_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_FAILURE,
  ADMIN_LIST_PRODUCT_DETAILS_SUCCESS,
  ADMIN_LIST_PRODUCT_DETAILS_FAILURE,
  ADMIN_MARK_ORDER_DELIVERED_REQUEST,
  ADMIN_MARK_ORDER_DELIVERED_SUCCESS,
  ADMIN_MARK_ORDER_DELIVERED_FAILURE,
  ADMIN_MARK_ORDER_REFUNDED_REQUEST,
  ADMIN_MARK_ORDER_REFUNDED_SUCCESS,
  ADMIN_MARK_ORDER_REFUNDED_FAILURE
} from '../constants/admin.constants';

const _generateRequestConfiguration = ({ tokenIsRequired = false, token }) => {
  let configuration = {
    'headers': {
      'Content-Type': 'application/json',
    }
  }
  if(tokenIsRequired) {
    configuration.headers['x-auth-token'] = token;
  }
  return configuration;
};

/************************************/
/************* ORDERS ***************/
/************************************/
export const getAllOrdersForAdmin = token => async dispatch => {
  dispatch({ type: ADMIN_LIST_ALL_ORDERS_REQUEST });

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
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
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
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
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
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
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
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

export const adminMarkOrderDelivered = (token, orderId) => async dispatch => {
  dispatch({ type: ADMIN_MARK_ORDER_DELIVERED_REQUEST });

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
      updates = {
        hasBeenDelivered: true,
        deliveredOn: new Date()
      },
      { data: {data} } = await axios.put(`/api/v1/l1rAdmin/orders/markDelivered/${orderId}`, updates, config);

    dispatch({
      type: ADMIN_MARK_ORDER_DELIVERED_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_MARK_ORDER_DELIVERED_FAILURE,
      payload: err
    });
  }
};

export const adminMarkOrderRefunded = (token, orderId) => async dispatch => {
  dispatch({ type: ADMIN_MARK_ORDER_REFUNDED_REQUEST });

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
      updates = {
        hasBeenRefunded: true,
        refundedOn: new Date(),
        refundStatus: "issued"
      },
      { data: {data} } = await axios.put(`/api/v1/l1rAdmin/orders/markRefunded/${orderId}`, updates, config);

    dispatch({
      type: ADMIN_MARK_ORDER_REFUNDED_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_MARK_ORDER_REFUNDED_FAILURE,
      payload: err
    });
  }
};

/**********************************/
/************* PRODUCTS ***********/
/**********************************/
export const getAllProductsForAdmin = () => async (dispatch, getState) => {
  dispatch({ type: ADMIN_LIST_ALL_PRODUCTS_REQUEST });
  const { userLogin: { auth } } = getState();

  if (!auth || !auth.token) { // Dont allow requests without a token to send a response to the server. 8000
    throw new Error('Contact The Sys-Admin. Error Code: 8000');
  }

  try {
    const config = _generateRequestConfiguration({tokenIsRequired: true, token: auth.token}),
      {data: {data}} = await axios.get('/api/v1/l1rAdmin/products', config);

    dispatch({
      type: ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_LIST_ALL_PRODUCTS_FAILURE,
      payload: err
    });
  }
};
export const adminGetProductById = (token, pid) => async dispatch => {
  dispatch({ type: ADMIN_LIST_PRODUCT_DETAILS_SUCCESS });

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
      { data: {data} } = await axios.get(`/api/v1/l1rAdmin/products/${pid}`, config);

    console.log('Data from API call is: ', data);
    dispatch({
      type: ADMIN_LIST_PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_LIST_PRODUCT_DETAILS_FAILURE,
      payload: err
    });
  }
};
export const adminCreateProduct = (token, productData) => async dispatch => {
  dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
      { data: {data} } = await axios.post('/api/v1/l1rAdmin/products', productData, config);

    dispatch({
      type: ADMIN_CREATE_PRODUCT_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_CREATE_PRODUCT_FAILURE,
      payload: err
    });
  }
};
export const adminUpdateProduct = (token, pid, updates) => async dispatch => {
  dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

  console.log('To Make an Update with: ', token)
  console.log('On: ', pid);
  console.log('Pushing: ', updates);

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
      { data: {data} } = await axios.put(`/api/v1/l1rAdmin/products/${pid}`, updates, config);

    dispatch({
      type: ADMIN_UPDATE_PRODUCT_SUCCESS,
      payload: data
    });
  } catch(err) {
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_FAILURE,
      payload: err
    });
  }
};
export const adminDeleteProduct = (token, pid) => async dispatch => {
  dispatch({ type: ADMIN_DELETE_PRODUCT_BY_ID_REQUEST });

  try {
    const
      config = _generateRequestConfiguration({tokenIsRequired: true, token});
      await axios.delete(`/api/v1/l1rAdmin/products/${pid}`, config);

    dispatch({
      type: ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS,
      payload: null
    });
  } catch(err) {
    dispatch({
      type: ADMIN_DELETE_USER_BY_ID_FAILURE,
      payload: err
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
      config = _generateRequestConfiguration({tokenIsRequired: true, token}),
      { data: {data} } = await axios.get('/api/v1/l1rAdmin/users', config);

    dispatch({
      type: ADMIN_LIST_ALL_USERS_SUCCESS,
      payload: data
    });
  } catch(err) {
    console.log("Err is: ", err);
    dispatch({
      type: ADMIN_LIST_ALL_USERS_FAILURE,
      payload: err
    });
  }
};
export const adminGetUserProfileById = id => async (dispatch, getState) => {
  dispatch({ type: ADMIN_LIST_USER_DETAILS_REQUEST });

  try {
    const
      { userLogin: { auth } } = getState(),
      config = _generateRequestConfiguration({tokenIsRequired: true, token: auth.token}),
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
    const config = _generateRequestConfiguration({tokenIsRequired: true, token: xAuthToken});

    const {data: {data}} = await axios.put(`/api/v1/l1rAdmin/users/${updates.update_registrationId}`, updates, config);

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
export const adminDeleteUserById = uid => async (dispatch, getState) => {
  dispatch({ type: ADMIN_DELETE_USER_BY_ID_REQUEST });
  const
    { userLogin: { auth } } = getState(),
    xAuthToken = auth.token || auth;

  if (xAuthToken === undefined) { // Dont allow requests without a token to send a response to the server. 8000
    throw new Error('Contact The Sys-Admin. Error Code: 8000');
  }

  try {
    const config = _generateRequestConfiguration({tokenIsRequired: true, token: xAuthToken});

    await axios.delete(`/api/v1/l1rAdmin/users/${uid}`, config);

    dispatch({
      type: ADMIN_DELETE_USER_BY_ID_SUCCESS,
      payload: null,
      success: true
    });
  } catch(err) {
    dispatch({
      type: ADMIN_DELETE_USER_BY_ID_FAILURE,
      payload: err,
      success: false
    });
  }
};
export const adminGetUserOrdersById = uid => async (dispatch, getState) => {
  console.log('UID IS: ', uid);
  dispatch({ type: ADMIN_FETCH_USER_ORDERS_REQUEST });
  const
    { userLogin: { auth } } = getState(),
    xAuthToken = auth.token || auth;

  if (xAuthToken === undefined) { // Dont allow requests without a token to send a response to the server. 8000
    throw new Error('Contact The Sys-Admin. Error Code: 8000');
  }

  try {
    const config = _generateRequestConfiguration({tokenIsRequired: true, token: xAuthToken});

    const {data: {data}} = await axios.get(`/api/v1/l1rAdmin/orders/user/${uid}`, config);

    dispatch({
      type: ADMIN_FETCH_USER_ORDERS_SUCCESS,
      payload: data,
      success: true
    });
  } catch(err) {
    dispatch({
      type: ADMIN_FETCH_USER_ORDERS_FAILURE,
      payload: err,
      success: false
    });
  }
};