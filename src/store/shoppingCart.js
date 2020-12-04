import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'cart',
  initialState: {
    cartId: null,
    customerId: null,
    items: {},
    quantity: 0,
    price: 0,
    loading: false,
    lastFetch: null,
  },
  reducers: {
    itemAdded: (cart, action) => {
      const { item } = action.payload;
      cart.items.set(item.id, item);
    },
    cartReceived: (cart, action) => {
      cart.cartId = action.payload.id;
      cart.customerId = action.payload.customerId;
      cart.items = action.payload.orderItems;
      cart.quantity = action.payload.totalQuantity;
      var dollars = parseInt(action.payload.totalPrice / 100);
      var cents = (action.payload.totalPrice % 100) / 100;
      cart.price = dollars + cents;
      cart.loading = false;
      cart.lastFetch = Date.now();
    },
    cartRequested: cart => {
      cart.loading = true;
    },
    cartRequestFailed: cart => {
      cart.loading = false;
    },
  },
});

const {
  itemAdded,
  cartReceived,
  cartRequested,
  cartRequestFailed,
} = slice.actions;

export default slice.reducer;

const url = '/shoppingcart/5fc6e9796ba40e2416da4ce1';

export const loadShoppingCart = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.cart;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: cartRequested.type,
      onSuccess: cartReceived.type,
      onError: cartRequestFailed.type,
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
