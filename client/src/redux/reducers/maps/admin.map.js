import {
  // Order Reducers
  adminCancelOrderReducer,
  adminGetAllOrdersReducer,
  adminMarkOrderShippedReducer,
  adminMarkOrderDeliveredReducer,
  adminMarkOrderRefundedReducer,
  adminReviewInvoiceReducer,
  // Product Reducers
  adminGetAllProductsReducer,
  adminGetProductByIdReducer,
  adminCreateProductReducer,
  adminUpdateProductReducer,
  adminDeleteProductReducer,
  // User Reducers
  adminGetAllUsersReducer,
  adminGetUserByIdReducer,
  adminUpdateUserByIdReducer,
  adminDeleteUserByIdReducer,
  adminGetOrdersForUserReducer
} from '../services/admin.reducer';

const adminReducerMap = {
  allOrders: adminGetAllOrdersReducer,
  viewInvoice: adminReviewInvoiceReducer,
  updateOrderToShipped: adminMarkOrderShippedReducer,
  updateOrderToCancelled: adminCancelOrderReducer,
  updateOrderToRefunded: adminMarkOrderRefundedReducer,
  updateOrderToDelivered: adminMarkOrderDeliveredReducer,

  allProducts: adminGetAllProductsReducer,
  viewProduct: adminGetProductByIdReducer,
  createProduct: adminCreateProductReducer,
  updateProduct: adminUpdateProductReducer,
  deleteProduct: adminDeleteProductReducer,

  allUsers: adminGetAllUsersReducer,
  viewUser: adminGetUserByIdReducer,
  userDeleted: adminDeleteUserByIdReducer,
  adminUpdatedUser: adminUpdateUserByIdReducer,
  adminGetUserOrdersList: adminGetOrdersForUserReducer
};

export default adminReducerMap;