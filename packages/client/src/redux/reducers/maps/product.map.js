/*Product Reducers*/
import {
  productListReducer,
  productDetailsReducer
} from '../services/product.reducer';

const productReducerMap = {
  productList: productListReducer,
  productDetails: productDetailsReducer
};

export default productReducerMap;