import {
  createOrderReducer, listUserOrdersReducer, getOrderByIdReducer, cancelOrderByIdReducer,
  payOrderByIdReducer
} from '../services/order.reducer';

const orderReducerMap = {
  cancelOrder: cancelOrderByIdReducer,
  createOrder: createOrderReducer,
  listUserOrders: listUserOrdersReducer,
  getOrderDetails: getOrderByIdReducer
};

export default orderReducerMap;