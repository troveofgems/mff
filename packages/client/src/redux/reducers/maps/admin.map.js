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
  adminGetUserByIdReducer,
  adminUpdateUserByIdReducer,
  adminDeleteUserByIdReducer
} from '../services/admin.reducer';

const adminReducerMap = {
  allOrders: adminGetAllOrdersReducer,
  viewInvoice: adminReviewInvoiceReducer,
  updateOrderToShipped: adminMarkOrderShippedReducer,
  updateOrderToCancelled: adminCancelOrderReducer,
  allProducts: adminGetAllProductsReducer,
  allUsers: adminGetAllUsersReducer,
  viewUser: adminGetUserByIdReducer,
  userDeleted: adminDeleteUserByIdReducer,
  adminUpdatedUser: adminUpdateUserByIdReducer
};

export default adminReducerMap;