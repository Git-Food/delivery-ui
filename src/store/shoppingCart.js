import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'shoppingCart',
  initialState: {
    id: null,
    customerId: null,
    items: {},
    quantity: 0,
    price: 0,
    loading: false,
    lastFetch: null,
  },
  reducers: {
    itemAdded: (shoppingCart, action) => {
      const { item } = action.payload;
      shoppingCart.items.set(item.id, item);
    },
    shoppingCartReceived: (shoppingCart, action) => {
      shoppingCart.shoppingCartId = action.payload.id;
      shoppingCart.customerId = action.payload.customerId;
      shoppingCart.items = action.payload.orderItems;
      shoppingCart.quantity = action.payload.totalQuantity;
      let price = action.payload.totalPrice / 100;
      shoppingCart.price = price;
      shoppingCart.loading = false;
      shoppingCart.lastFetch = Date.now();
    },
    shoppingCartRequested: shoppingCart => {
      shoppingCart.loading = true;
    },
    shoppingCartRequestFailed: shoppingCart => {
      shoppingCart.loading = false;
    },
    itemQuantityChanged: (shoppingCart, action) => {
      shoppingCart.items = action.payload.orderItems;
      shoppingCart.quantity = action.payload.totalQuantity;
      let price = action.payload.totalPrice / 100;
      shoppingCart.price = price;
      shoppingCart.loading = false;
      shoppingCart.lastFetch = Date.now();
    },
  },
});

const {
  itemAdded,
  shoppingCartReceived,
  shoppingCartRequested,
  shoppingCartRequestFailed,
  itemQuantityChanged,
} = slice.actions;

export default slice.reducer;

const url = '/shoppingcart/5fca9e4d7c59140783201528';

export const loadShoppingCart = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.shoppingCart;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const incrementOrderItem = (orderitem, userid) => (
  dispatch,
  getState
) => {
  return dispatch(
    apiCallBegan({
      url: '/incrementorderitem',
      method: 'put',
      params: { orderitem, userid },
      onStart: shoppingCartRequested.type,
      onSuccess: itemQuantityChanged.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const decrementOrderItem = (orderitem, userid) => (
  dispatch,
  getState
) => {
  return dispatch(
    apiCallBegan({
      url: '/decrementorderitem',
      method: 'put',
      params: { orderitem, userid },
      onStart: shoppingCartRequested.type,
      onSuccess: itemQuantityChanged.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};
// export const setMenu = menu =>
//   apiCallBegan({
//     url,
//     method: 'put',
//     data: menu,
//     onStart: menusRequested.type,
//     onSuccess: menuSet.type,
//     onError: menusRequestFailed.type,
//   });

// export const addMenu = menu =>
//   apiCallBegan({
//     url,
//     method: 'post',
//     data: menu,
//     onStart: menusRequested.type,
//     onSuccess: menuAdded.type,
//     onError: menusRequestFailed.type,
//   });
