import {
  ADMIN_LIST_ALL_ORDERS_FAILURE, ADMIN_LIST_ALL_ORDERS_REQUEST, ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ORDER_DETAILS_FAILURE, ADMIN_LIST_ORDER_DETAILS_REQUEST, ADMIN_LIST_ORDER_DETAILS_SUCCESS,
  ADMIN_CANCEL_ORDER_BY_ID_FAILURE, ADMIN_CANCEL_ORDER_BY_ID_REQUEST, ADMIN_CANCEL_ORDER_BY_ID_SUCCESS,
  ADMIN_MARK_ORDER_SHIPPED_FAILURE, ADMIN_MARK_ORDER_SHIPPED_REQUEST, ADMIN_MARK_ORDER_SHIPPED_SUCCESS,
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

export const adminReviewInvoiceReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        invoice: null,
        loading: true,
        success: null
      };
    case ADMIN_LIST_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        invoice: action.payload,
        success: true
      };
    case ADMIN_LIST_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        invoice: null,
        loading: false,
        error: action.payload,
        success: false
      };
    /*    case CLEAR_:
          return {
            ...state,
            loading: false,
            error: null,
            invoice: null
          };*/
    default:
      return state;
  }
};

export const adminMarkOrderShippedReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_MARK_ORDER_SHIPPED_REQUEST:
      return {
        ...state,
        error: null,
        order: null,
        loading: true
      };
    case ADMIN_MARK_ORDER_SHIPPED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload
      };
    case ADMIN_MARK_ORDER_SHIPPED_FAILURE:
      return {
        ...state,
        order: null,
        loading: false,
        error: action.payload
      };
    /*    case CLEAR_:
          return {
            ...state,
            loading: false,
            error: null,
            order: null
          };*/
    default:
      return state;
  }
};

export const adminCancelOrderReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_CANCEL_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
        order: null,
        loading: true
      };
    case ADMIN_CANCEL_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: null
      };
    case ADMIN_CANCEL_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        order: null,
        loading: false,
        error: action.payload
      };
    /*    case CLEAR_:
          return {
            ...state,
            loading: false,
            error: null,
            order: null
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
