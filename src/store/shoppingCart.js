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
    empty: false,
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
      shoppingCart.empty =
        action.payload.totalQuantity !== null
          ? action.payload.totalQuantity === 0
          : true;
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
      shoppingCart.empty =
        action.payload.totalQuantity !== null
          ? action.payload.totalQuantity === 0
          : true;
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

// TODO: (pcg) replace shoppingCart id with user id
const url = '/shoppingcart/5fd00a8670007d571d962dbd';

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
