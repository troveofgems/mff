/*Cart Reducers*/
import authReducerMap from './maps/auth.map';

/*Cart Reducers*/
import cartReducerMap from './maps/cart.map';

/*Product Reducers*/
import productReducerMap from './maps/product.map';

const reducerMap = {
  ...authReducerMap,
  ...cartReducerMap,
  ...productReducerMap
};

export default reducerMap;