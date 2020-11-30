import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'menus',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    menuAdded: (menus, action) => {
      menus.list.push(action.payload);
    },
    menusReceived: (menus, action) => {
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
