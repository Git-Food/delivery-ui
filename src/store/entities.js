import { combineReducers } from 'redux';
import deliveryReducer from './deliveries';
import restaurantReducer from './restaurants';
import cartReducer from './shoppingCart';

export default combineReducers({
  deliveries: deliveryReducer,
  restaurants: restaurantReducer,
  cart: cartReducer,
});
