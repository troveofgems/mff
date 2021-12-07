import reducerMap 								from './reducers';
import { _loadFromLocalStorage } 	from '../utils/storageData.loaders.utils';

const cart = {
  cartItems: _loadFromLocalStorage('cartItems', [])
};

export const configureStore = {
  initialStates: { cart },
  reducerMap
}