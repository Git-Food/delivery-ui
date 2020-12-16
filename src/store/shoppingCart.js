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
    empty: true,
  },
  reducers: {
    shoppingCartReceived: (shoppingCart, action) => {
      shoppingCart.id = action.payload.id;
      shoppingCart.customerId = action.payload.customerId;
      shoppingCart.items = action.payload.orderItems;
      shoppingCart.quantity = action.payload.totalQuantity;
      let price = action.payload.totalPrice / 100;
      shoppingCart.price = price;
      shoppingCart.lastFetch = Date.now();
      shoppingCart.empty =
        action.payload.totalQuantity !== null
          ? action.payload.totalQuantity === 0
          : true;
      shoppingCart.loading = false;
    },
    shoppingCartRequested: shoppingCart => {
      shoppingCart.loading = true;
    },
    shoppingCartRequestFailed: shoppingCart => {
      shoppingCart.loading = false;
    },
  },
});

const {
  shoppingCartReceived,
  shoppingCartRequested,
  shoppingCartRequestFailed,
} = slice.actions;

export default slice.reducer;

export const loadShoppingCart = userid => (dispatch, getState) => {
  const { lastFetch } = getState().entities.shoppingCart;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url: `/shoppingcartbyuser/${userid}`,
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const incrementOrderItem = (orderitem, userid) => dispatch => {
  return dispatch(
    apiCallBegan({
      url: '/incrementorderitem',
      method: 'put',
      params: { orderitem, userid },
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const decrementOrderItem = (orderitem, userid) => dispatch => {
  return dispatch(
    apiCallBegan({
      url: '/decrementorderitem',
      method: 'put',
      params: { orderitem, userid },
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const addOrderItem = (
  menuitem,
  specialnote,
  quantity,
  userid
) => dispatch => {
  return dispatch(
    apiCallBegan({
      url: '/addorderitem',
      method: 'put',
      params: { menuitem, specialnote, quantity, userid },
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const checkout = userid => dispatch => {
  return dispatch(
    apiCallBegan({
      url: '/checkout',
      method: 'post',
      params: { userid },
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
      onError: shoppingCartRequestFailed.type,
    })
  );
};

export const clearShoppingCart = userid => dispatch => {
  return dispatch(
    apiCallBegan({
      url: '/clearshoppingcart',
      method: 'put',
      params: { userid },
      onStart: shoppingCartRequested.type,
      onSuccess: shoppingCartReceived.type,
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
