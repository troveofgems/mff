import {
  // Order Reducers
  adminCancelOrderReducer,
  adminGetAllOrdersReducer,
  adminMarkOrderShippedReducer,
  adminReviewInvoiceReducer,
  // Product Reducers
  adminGetAllProductsReducer,
  // User Reducers
  adminGetAllUsersReducer,
} from '../services/admin.reducer';

const adminReducerMap = {
  allOrders: adminGetAllOrdersReducer,
  viewInvoice: adminReviewInvoiceReducer,
  updateOrderToShipped: adminMarkOrderShippedReducer,
  updateOrderToCancelled: adminCancelOrderReducer,
  allProducts: adminGetAllProductsReducer,
  allUsers: adminGetAllUsersReducer,
};

export default adminReducerMap;