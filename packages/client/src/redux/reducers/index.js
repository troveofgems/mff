import {combineReducers} from 'redux';
import reducerMap from "./reducer.mapper";

const combinedReducers = combineReducers(reducerMap);

export default combinedReducers;