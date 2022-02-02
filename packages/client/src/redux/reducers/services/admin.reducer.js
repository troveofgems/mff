import {
  ADMIN_LIST_ALL_ORDERS_FAILURE,
  ADMIN_LIST_ALL_ORDERS_REQUEST,
  ADMIN_LIST_ALL_ORDERS_SUCCESS,
  ADMIN_LIST_ORDER_DETAILS_FAILURE,
  ADMIN_LIST_ORDER_DETAILS_REQUEST,
  ADMIN_LIST_ORDER_DETAILS_SUCCESS,
  ADMIN_CANCEL_ORDER_BY_ID_FAILURE,
  ADMIN_CANCEL_ORDER_BY_ID_REQUEST,
  ADMIN_CANCEL_ORDER_BY_ID_SUCCESS,
  ADMIN_MARK_ORDER_SHIPPED_FAILURE,
  ADMIN_MARK_ORDER_SHIPPED_REQUEST,
  ADMIN_MARK_ORDER_SHIPPED_SUCCESS,
  ADMIN_LIST_ALL_PRODUCTS_FAILURE,
  ADMIN_LIST_ALL_PRODUCTS_REQUEST,
  ADMIN_LIST_ALL_PRODUCTS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAILURE,
  ADMIN_LIST_ALL_USERS_REQUEST,
  ADMIN_LIST_ALL_USERS_SUCCESS,
  ADMIN_LIST_USER_DETAILS_FAILURE,
  ADMIN_LIST_USER_DETAILS_REQUEST,
  ADMIN_LIST_USER_DETAILS_SUCCESS,
  ADMIN_DELETE_USER_BY_ID_FAILURE,
  ADMIN_DELETE_USER_BY_ID_REQUEST,
  ADMIN_DELETE_USER_BY_ID_SUCCESS,
  ADMIN_UPDATE_USER_DETAILS_FAILURE,
  ADMIN_UPDATE_USER_DETAILS_REQUEST,
  ADMIN_UPDATE_USER_DETAILS_SUCCESS,
  ADMIN_FETCH_USER_ORDERS_FAILURE,
  ADMIN_FETCH_USER_ORDERS_REQUEST,
  ADMIN_FETCH_USER_ORDERS_SUCCESS,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAILURE,
  ADMIN_DELETE_PRODUCT_BY_ID_REQUEST,
  ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAILURE,
  ADMIN_LIST_PRODUCT_DETAILS_REQUEST,
  ADMIN_LIST_PRODUCT_DETAILS_SUCCESS, ADMIN_LIST_PRODUCT_DETAILS_FAILURE
} from "../../constants/admin.constants";

export const adminGetAllOrdersReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_ALL_ORDERS_REQUEST:
      return {
        ...state,
        error: null,
        listOfOrders: null,
        loading: true,
        success: null
      };
    case ADMIN_LIST_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listOfOrders: action.payload,
        success: true
      };
    case ADMIN_LIST_ALL_ORDERS_FAILURE:
      return {
        ...state,
        listOfOrders: null,
        loading: false,
        error: action.payload,
        success: false
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
        loading: true,
        success: null
      };
    case ADMIN_MARK_ORDER_SHIPPED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
        success: null
      };
    case ADMIN_MARK_ORDER_SHIPPED_FAILURE:
      return {
        ...state,
        order: null,
        loading: false,
        error: action.payload,
        success: null
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
        loading: true,
        success: null
      };
    case ADMIN_CANCEL_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: null,
        success: true
      };
    case ADMIN_CANCEL_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        order: null,
        loading: false,
        error: action.payload,
        success: false
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



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const adminGetAllProductsReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        error: null,
        listOfProducts: null,
        loading: true,
        success: null
      };
    case ADMIN_LIST_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        listOfProducts: action.payload,
        success: true
      };
    case ADMIN_LIST_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        listOfProducts: null,
        loading: false,
        error: action.payload,
        success: false
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

export const adminGetProductByIdReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        product: null,
        loading: true,
        success: null
      };
    case ADMIN_LIST_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
        success: true
      };
    case ADMIN_LIST_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        product: null,
        loading: false,
        error: action.payload,
        success: false
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

export const adminCreateProductReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        error: null,
        product: null,
        loading: true,
        success: null
      };
    case ADMIN_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
        success: true
      };
    case ADMIN_CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        product: null,
        loading: false,
        error: action.payload,
        success: false
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

export const adminDeleteProductReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_DELETE_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        success: null
      };
    case ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true
      };
    case ADMIN_CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
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

export const adminUpdateProductReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        product: null,
        success: null
      };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
        success: true
      };
    case ADMIN_UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        product: null,
        success: false
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
export const adminGetUserByIdReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_LIST_USER_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        user: null,
        loading: true
      };
    case ADMIN_LIST_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload
      };
    case ADMIN_LIST_USER_DETAILS_FAILURE:
      return {
        ...state,
        user: null,
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
export const adminUpdateUserByIdReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_UPDATE_USER_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        user: null,
        loading: true
      };
    case ADMIN_UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload
      };
    case ADMIN_UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        user: null,
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
export const adminGetOrdersForUserReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        error: null,
        userOrders: null,
        loading: true
      };
    case ADMIN_FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userOrders: action.payload
      };
    case ADMIN_FETCH_USER_ORDERS_FAILURE:
      return {
        ...state,
        userOrders: null,
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
export const adminDeleteUserByIdReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_DELETE_USER_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
        user: null,
        loading: true
      };
    case ADMIN_DELETE_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload
      };
    case ADMIN_DELETE_USER_BY_ID_FAILURE:
      return {
        ...state,
        user: null,
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