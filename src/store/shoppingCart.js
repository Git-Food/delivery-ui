import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'cart',
  initialState: {
    cartId: null,
    customerId: null,
    items: new Map(),
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
      menus.list = action.payload;
      menus.loading = false;
      menus.lastFetch = Date.now();
    },
    menusRequested: menus => {
      menus.loading = true;
    },
    menusRequestFailed: menus => {
      menus.loading = false;
    },
    menuSet: (menus, action) => {
      const index = menus.list.findIndex(menu => menu.id === action.payload.id);
      menus.list[index] = action.payload;
    },
  },
});

const {
  menuAdded,
  menusReceived,
  menusRequested,
  menusRequestFailed,
  menuSet,
} = slice.actions;

export default slice.reducer;

const url = '/menu';

export const loadMenus = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.menus;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: menusRequested.type,
      onSuccess: menusReceived.type,
      onError: menusRequestFailed.type,
    })
  );
};

export const setMenu = menu =>
  apiCallBegan({
    url,
    method: 'put',
    data: menu,
    onStart: menusRequested.type,
    onSuccess: menuSet.type,
    onError: menusRequestFailed.type,
  });

export const addMenu = menu =>
  apiCallBegan({
    url,
    method: 'post',
    data: menu,
    onStart: menusRequested.type,
    onSuccess: menuAdded.type,
    onError: menusRequestFailed.type,
  });
