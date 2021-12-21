import {
  CART_ADD_ITEM, CART_REMOVE_ITEM
} from "../../constants/cart.constants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const
        item = action.payload, // Perform Check: does the item already exist in the cart?
        itemExists = state.cartItems.find(itemInCart => itemInCart.product === item.product);
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(itemInCart => itemInCart.product === itemExists.product ? item : itemInCart)
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      };
    default:
      return state;
  }
};