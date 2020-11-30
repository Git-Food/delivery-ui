import { combineReducers } from 'redux';
import deliveryReducer from './deliveries';
import menuReducer from './menus';

export default combineReducers({
  deliveries: deliveryReducer,
  menus: menuReducer,
});
