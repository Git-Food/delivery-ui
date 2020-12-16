import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Jumbotron, Container } from 'react-bootstrap';

import { loadRestaurants } from '../store/restaurants';
import { loadOrders } from '../store/orders';
import Order from './Order';
import { useAuth } from '../store/AuthContext';

export default function Orders() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch(loadRestaurants());
    dispatch(loadOrders(currentUser.uid));
  }, []);

  const orders = useSelector(state => state.entities.orders.list);
  const restaurants = useSelector(state => state.entities.restaurants.list);

  const findMatchingRestaurant = order => {
    const matchingRestaurant = restaurants.find(
      restaurant => restaurant.id === order.businessId
    );
    return matchingRestaurant;
  };
  return (
    <>
      <h1>Placeholder for OrderHistory View</h1>
      {restaurants.length && orders.length ? (
        orders.map(order => (
          <Order
            key={order.id}
            order={order}
            matchingRestaurant={findMatchingRestaurant(order)}
          />
        ))
      ) : (
        <Jumbotron fluid>
          <Container className="text-center">
            <h2>No Past Orders</h2>
            <p>Are you never hungry?</p>
          </Container>
        </Jumbotron>
      )}
    </>
  );
}

Orders.propTypes = {
  orders: PropTypes.array,
  loadOrders: PropTypes.func,
  restaurants: PropTypes.array,
  loadRestaurants: PropTypes.func,
};
