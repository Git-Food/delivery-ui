import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    orderAdded: (orders, action) => {
      orders.list.push(action.payload);
    },
    ordersReceived: (orders, action) => {
      orders.list = action.payload;
      orders.loading = false;
      orders.lastFetch = Date.now();
    },
    ordersRequested: orders => {
      orders.loading = true;
    },
    ordersRequestFailed: orders => {
      orders.loading = false;
    },
    orderSet: (orders, action) => {
      const index = orders.list.findIndex(
        order => order.id === action.payload.id
      );
      orders.list[index] = action.payload;
    },
  },
});

const {
  orderAdded,
  ordersReceived,
  ordersRequested,
  ordersRequestFailed,
  orderSet,
} = slice.actions;

export default slice.reducer;

const url = '/order';

export const loadOrders = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.orders;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: ordersRequested.type,
      onSuccess: ordersReceived.type,
      onError: ordersRequestFailed.type,
    })
  );
};

export const setOrder = order =>
  apiCallBegan({
    url,
    method: 'put',
    data: order,
    onStart: ordersRequested.type,
    onSuccess: orderSet.type,
    onError: ordersRequestFailed.type,
  });

export const addOrder = order =>
  apiCallBegan({
    url,
    method: 'post',
    data: order,
    onStart: ordersRequested.type,
    onSuccess: orderAdded.type,
    onError: ordersRequestFailed.type,
  });
