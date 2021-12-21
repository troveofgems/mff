import reducerMap 								from './reducers';
import { _loadFromLocalStorage } 	from '../utils/storageData.loaders.utils';

const userLogin = {
  auth: _loadFromLocalStorage('userInfo', null)
};

const cart = {
  cartItems: _loadFromLocalStorage('cartItems', [])
};

export const configureStore = {
  initialStates: { cart, userLogin },
  reducerMap
}