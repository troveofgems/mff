import {
  createOrderReducer, listUserOrdersReducer, getOrderByIdReducer, cancelOrderByIdReducer,
  loadPayForOrderReducer
} from '../services/order.reducer';

const orderReducerMap = {
  cancelOrder: cancelOrderByIdReducer,
  createOrder: createOrderReducer,
  listUserOrders: listUserOrdersReducer,
  getOrderDetails: getOrderByIdReducer,
  payOrderDetails: loadPayForOrderReducer
};

export default orderReducerMap;