import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'restaurants',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    restaurantAdded: (restaurants, action) => {
      restaurants.list.push(action.payload);
    },
    restaurantsReceived: (restaurants, action) => {
      restaurants.list = action.payload;
      restaurants.loading = false;
      restaurants.lastFetch = Date.now();
    },
    restaurantsRequested: restaurants => {
      restaurants.loading = true;
    },
    restaurantsRequestFailed: restaurants => {
      restaurants.loading = false;
    },
    restaurantSet: (restaurants, action) => {
      const index = restaurants.list.findIndex(
        restaurant => restaurant.id === action.payload.id
      );
      restaurants.list[index] = action.payload;
    },
  },
});

const {
  restaurantAdded,
  restaurantsReceived,
  restaurantsRequested,
  restaurantsRequestFailed,
  restaurantSet,
} = slice.actions;

export default slice.reducer;

const url = '/restaurant';

export const loadRestaurants = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.restaurants;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: restaurantsRequested.type,
      onSuccess: restaurantsReceived.type,
      onError: restaurantsRequestFailed.type,
    })
  );
};

export const setRestaurant = restaurant =>
  apiCallBegan({
    url,
    method: 'put',
    data: restaurant,
    onStart: restaurantsRequested.type,
    onSuccess: restaurantSet.type,
    onError: restaurantsRequestFailed.type,
  });

export const addRestaurant = restaurant =>
  apiCallBegan({
    url,
    method: 'post',
    data: restaurant,
    onStart: restaurantsRequested.type,
    onSuccess: restaurantAdded.type,
    onError: restaurantsRequestFailed.type,
  });
