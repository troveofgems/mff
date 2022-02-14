import {
  productListReducer,
  productDetailsReducer,
  topProductsReducer
} from '../services/product.reducer';

const productReducerMap = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  topProducts: topProductsReducer
};

export default productReducerMap;