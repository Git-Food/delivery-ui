import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  addDelivery,
  deliveryAdded,
  loadDeliveries,
  setDelivery,
} from '../deliveries';
import { apiCallBegan } from '../api';
import configureStore from '../configureStore';

// Example unit test
describe('deliveriesSlice', () => {
  describe('action creators', () => {
    it('should add bug to store if saved to server', () => {
      const delivery = {
        title: 'cornet',
        description: 'vanilla',
      };
      const result = addDelivery(delivery);
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: '/delivery',
          method: 'post',
          data: delivery,
          onSuccess: deliveryAdded.type,
        },
      };
      expect(result).toEqual(expected);
    });
  });
});

//Example integration test
describe('deliveriesSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const deliveriesSlice = () => store.getState().entities.deliveries;

  it('should add bug to store if saved to server', async () => {
    const delivery = { title: 'all meat burrito', description: 'carne asada' };
    const savedDelivery = { ...delivery, id: 'somemongdbgeneratedid' };
    fakeAxios.onPost('/delivery').reply(200, savedDelivery);

    await store.dispatch(addDelivery(delivery));

    expect(deliveriesSlice().list).toHaveLength(1);
    expect(deliveriesSlice().list).toContainEqual(savedDelivery);
  });

  it('should not add bug to store if not saved to server', async () => {
    const delivery = { title: 'all meat burrito', description: 'carne asada' };
    fakeAxios.onPost('/delivery').reply(500);

    await store.dispatch(addDelivery(delivery));

    expect(deliveriesSlice().list).toHaveLength(0);
  });

  describe('loadingDeliveries', () => {
    describe('if the deliveries exist in the cache', () => {
      it('deliveryes should not be fetched from the server again', async () => {
        fakeAxios.onGet('/delivery').reply(200, { id: 'somemongoid' });
        await store.dispatch(loadDeliveries());
        await store.dispatch(loadDeliveries());
        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe('if the deliveries don"t exist in the cache', () => {
      it('should be fetched from the server and put in store', async () => {
        fakeAxios.onGet('/delivery').reply(200, [{ id: 'somemongoid' }]);
        await store.dispatch(loadDeliveries());
        expect(deliveriesSlice().list).toHaveLength(1);
      });
      describe('loading indicator', () => {
        it('should be true while fetching deliveries', () => {
          fakeAxios.onGet('/delivery').reply(() => {
            expect(deliveriesSlice().loading).toBe(true);
            return [200, [{ id: 'somemongodbid' }]];
          });
          store.dispatch(loadDeliveries());
        });
        it('should be false after the deliveries are fetched', async () => {
          fakeAxios.onGet('/delivery').reply(200, [{ id: 'somemongoid' }]);
          await store.dispatch(loadDeliveries());
          expect(deliveriesSlice().loading).toBe(false);
        });
        it('should be false after the deliveries are fetched', async () => {
          fakeAxios.onGet('/delivery').reply(500);
          await store.dispatch(loadDeliveries());
          expect(deliveriesSlice().loading).toBe(false);
        });
      });
    });
  });

  it('should set a delivery to store if saved to server', async () => {
    const delivery = { id: 'somemongdbgeneratedid' };
    const newDelivery = { ...delivery, description: 'al pastor' };
    fakeAxios.onPost('/delivery').reply(200, delivery);
    fakeAxios.onPut('/delivery').reply(200, newDelivery);

    await store.dispatch(addDelivery());
    await store.dispatch(setDelivery(newDelivery));

    expect(deliveriesSlice().list).toContainEqual(newDelivery);
  });

  it('should not set a delivery to store if not saved to server', async () => {
    const delivery = { id: 'somemongdbgeneratedid' };
    const newDelivery = { ...delivery, description: 'al pastor' };
    fakeAxios.onPost('/delivery').reply(200, delivery);
    fakeAxios.onPut('/delivery').reply(500);

    await store.dispatch(addDelivery());
    await store.dispatch(setDelivery(newDelivery));

    expect(deliveriesSlice().list).toContainEqual(delivery);
  });
});
