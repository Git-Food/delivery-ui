import { combineReducers } from 'redux';
import deliveryReducer from './deliveries';
import restaurantReducer from './restaurants';

export default combineReducers({
  deliveries: deliveryReducer,
  restaurants: restaurantReducer,
});
