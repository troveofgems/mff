import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } 					from "redux-devtools-extension";
import thunk 														from 'redux-thunk';

// Custom Imports
import rootReducer 				from './reducers';
import { configureStore } from './configureStore';

const
  initialState = configureStore.initialStates,
  middleware 	 = [thunk];

const store = createStore(rootReducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;