import { combineReducers } from 'redux';
import deliveryReducer from './deliveries';
import restaurantReducer from './restaurants';
import cartReducer from './shoppingCart';
import orderReducer from './orders';

export default combineReducers({
  deliveries: deliveryReducer,
  restaurants: restaurantReducer,
  shoppingCart: cartReducer,
  orders: orderReducer,
});
