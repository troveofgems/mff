import {
  PRODUCT_LIST_FAILURE, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  GET_TOP_PRODUCTS_REQUEST, GET_TOP_PRODUCTS_SUCCESS, GET_TOP_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REVIEW_FAILURE, CREATE_PRODUCT_REVIEW_REQUEST, CREATE_PRODUCT_REVIEW_SUCCESS
} from '../../constants/product.constants';

export const createProductReviewReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return {
        error: null,
        loading: true,
        success: null,
        ...state
      };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        error: null,
        loading: false,
        success: true
      };
    case CREATE_PRODUCT_REVIEW_FAILURE:
      return {
        loading: false,
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};
export const productListReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: []
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case PRODUCT_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch(action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      };
    case PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const topProductsReducer = (state = { productList: [] }, action) => {
  switch(action.type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        productList: null,
        error: null,
        success: null
      };
    case GET_TOP_PRODUCTS_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        productList: action.payload
      };
    case GET_TOP_PRODUCTS_FAILURE:
      return {
        loading: false,
        productList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};