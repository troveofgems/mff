import {
  createProductReviewReducer,
  productListReducer,
  productDetailsReducer,
  topProductsReducer
} from '../services/product.reducer';

const productReducerMap = {
  productReviewDetails: createProductReviewReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  topProducts: topProductsReducer
};

export default productReducerMap;