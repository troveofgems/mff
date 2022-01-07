import {
  adminGetAllOrdersReducer, adminGetAllProductsReducer, adminGetAllUsersReducer
} from '../services/admin.reducer';

const adminReducerMap = {
  allOrders: adminGetAllOrdersReducer,
  allProducts: adminGetAllProductsReducer,
  allUsers: adminGetAllUsersReducer,
};

export default adminReducerMap;