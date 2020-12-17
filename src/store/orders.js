import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { apiCallBegan } from './api';

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
  // orderAdded,
  ordersReceived,
  ordersRequested,
  ordersRequestFailed,
  // orderSet,
} = slice.actions;

export default slice.reducer;

export const loadOrders = userId => (dispatch, getState) => {
  const { lastFetch } = getState().entities.orders;
  if (moment().diff(moment(lastFetch), 'minutes') < 1) return;
  const url = '/orderhistory';
  return dispatch(
    apiCallBegan({
      url,
      params: { userId },
      onStart: ordersRequested.type,
      onSuccess: ordersReceived.type,
      onError: ordersRequestFailed.type,
    })
  );
};

// export const setOrder = order =>
//   apiCallBegan({
//     url,
//     method: 'put',
//     data: order,
//     onStart: ordersRequested.type,
//     onSuccess: orderSet.type,
//     onError: ordersRequestFailed.type,
//   });

// export const addOrder = order =>
//   apiCallBegan({
//     url,
//     method: 'post',
//     data: order,
//     onStart: ordersRequested.type,
//     onSuccess: orderAdded.type,
//     onError: ordersRequestFailed.type,
//   });
