/*Admin Reducers*/
import adminReducerMap from './maps/admin.map';

/*Auth Reducers*/
import authReducerMap from './maps/auth.map';

/*Cart Reducers*/
import cartReducerMap from './maps/cart.map';

/*Order Reducers*/
import orderReducerMap from './maps/order.map';

/*Product Reducers*/
import productReducerMap from './maps/product.map';

const reducerMap = {
  ...adminReducerMap,
  ...authReducerMap,
  ...cartReducerMap,
  ...orderReducerMap,
  ...productReducerMap
};

export default reducerMap;