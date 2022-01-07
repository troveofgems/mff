import {
  ADMIN_LIST_ALL_ORDERS_FAILURE, ADMIN_LIST_ALL_ORDERS_REQUEST, ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ALL_PRODUCTS_FAILURE, ADMIN_LIST_ALL_PRODUCTS_REQUEST, ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAILURE, ADMIN_LIST_ALL_USERS_REQUEST, ADMIN_LIST_ALL_USERS_SUCCESS,
} from "../../constants/admin.constants";

export const adminGetAllOrdersReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_ALL_ORDERS_REQUEST:
      return {
        ...state,
        error: null,
        listOfOrders: null,
        loading: true
      };
    case ADMIN_LIST_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listOfOrders: action.payload
      };
    case ADMIN_LIST_ALL_ORDERS_FAILURE:
      return {
        ...state,
        listOfOrders: null,
        loading: false,
        error: action.payload
      };
/*    case CLEAR_:
      return {
        ...state,
        loading: false,
        error: null,
        listOfOrders: null
      };*/
    default:
      return state;
  }
};

export const adminGetAllProductsReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        error: null,
        listOfProducts: null,
        loading: true
      };
    case ADMIN_LIST_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listOfProducts: action.payload
      };
    case ADMIN_LIST_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        listOfProducts: null,
        loading: false,
        error: action.payload
      };
    /*    case CLEAR_:
          return {
            ...state,
            loading: false,
            error: null,
            listOfOrders: null
          };*/
    default:
      return state;
  }
};

export const adminGetAllUsersReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_ALL_USERS_REQUEST:
      return {
        ...state,
        error: null,
        listOfUsers: null,
        loading: true
      };
    case ADMIN_LIST_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listOfUsers: action.payload
      };
    case ADMIN_LIST_ALL_USERS_FAILURE:
      return {
        ...state,
        listOfUsers: null,
        loading: false,
        error: action.payload
      };
    /*    case CLEAR_:
          return {
            ...state,
            loading: false,
            error: null,
            listOfOrders: null
          };*/
    default:
      return state;
  }
};
