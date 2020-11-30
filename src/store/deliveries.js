import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';

import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'deliveries',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    deliveryAdded: (deliveries, action) => {
      deliveries.list.push(action.payload);
    },
    // deliveryResolved: (deliveries, action) => {
    //   const index = deliveries.list.findIndex(
    //     delivery => delivery.id == action.payload.id
    //   );
    //   deliveries.list[index].resolved = true;
    // },
    // deliveryAssignedToUser: (deliveries, action) => {
    //   const { deliveryId, userId } = action.payload;
    //   const index = deliveries.list.findIndex(
    //     delivery => delivery.id == deliveryId
    //   );
    //   deliveries.list[index].userId = userId;
    // },
    deliveriesReceived: (deliveries, action) => {
      deliveries.list = action.payload;
      deliveries.loading = false;
      deliveries.lastFetch = Date.now();
    },
    deliveriesRequested: deliveries => {
      deliveries.loading = true;
    },
    deliveriesRequestFailed: deliveries => {
      deliveries.loading = false;
    },
    deliverySet: (deliveries, action) => {
      const index = deliveries.list.findIndex(
        delivery => delivery.id === action.payload.id
      );
      deliveries.list[index] = action.payload;
    },
  },
});

export const {
  deliveryAdded,
  // deliveryResolved,
  // deliveryAssignedToUser,
  deliveriesReceived,
  deliveriesRequested,
  deliveriesRequestFailed,
  deliverySet,
} = slice.actions;

export default slice.reducer;

const url = '/delivery';

export const loadDeliveries = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.deliveries;
  if (moment().diff(moment(lastFetch), 'minutes') < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: deliveriesRequested.type,
      onSuccess: deliveriesReceived.type,
      onError: deliveriesRequestFailed.type,
    })
  );
};

export const setDelivery = delivery =>
  apiCallBegan({
    url,
    method: 'put',
    data: delivery,
    onStart: deliveriesRequested.type,
    onSuccess: deliverySet.type,
    onError: deliveriesRequestFailed.type,
  });

export const addDelivery = delivery =>
  apiCallBegan({
    url,
    method: 'post',
    data: delivery,
    onSuccess: deliveryAdded.type,
  });
// export const getUnresolveddeliveries = createSelector(
//   state => state.entities.deliveries,
//   deliveries => deliveries.filter(delivery => !delivery.resolved)
// );

// export const getdeliveriesByUser = userId =>
//   createSelector(
//     state => state.entities.deliveries,
//     deliveries => deliveries.filter(delivery => delivery.userId === userId)
//   );
