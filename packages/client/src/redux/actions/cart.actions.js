import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cart.constants';

export const addToCart = (id, quantity = 1, size = null, hue = null) => async (dispatch, getState) => {
  const { data: { data } } = await axios.get(`/api/v1/product/${id}`);
  const test = data.stockType === 0 ? quantity = 1 : (data.stockType === 2 && data.countInStock === 1) ? quantity = 1 : quantity; // Don't Allow URL Hack Of Certain Items
  console.log('Test', test);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantityRequested: quantity ,
      sizeRequested: size,
      hueRequested: hue
    }
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};