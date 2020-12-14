import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadOrders } from '../store/orders';
import { connect } from 'react-redux';
import { Jumbotron, Container } from 'react-bootstrap';
import { loadRestaurants } from '../store/restaurants';
import Order from './Order';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.findMatchingRestaurant = this.findMatchingRestaurant.bind(this);
  }

  componentDidMount() {
    this.props.loadRestaurants();
    this.props.loadOrders();
  }

  findMatchingRestaurant(order) {
    const matchingRestaurant = this.props.restaurants.find(
      restaurant => restaurant.id === order.businessId
    );
    return matchingRestaurant;
  }

  render() {
    const orders = this.props.orders;
    const restaurants = this.props.restaurants;
    return (
      <>
        <h1>Placeholder for OrderHistory View</h1>
        {restaurants.length && orders.length ? (
          orders.map(order => (
            <Order
              key={order.id}
              order={order}
              matchingRestaurant={this.findMatchingRestaurant(order)}
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
}

const mapStateToProps = state => ({
  orders: state.entities.orders.list,
  restaurants: state.entities.restaurants.list,
});

const mapDispatchToProps = dispatch => ({
  loadOrders: () => dispatch(loadOrders()),
  loadRestaurants: () => dispatch(loadRestaurants()),
});

Orders.propTypes = {
  orders: PropTypes.array,
  loadOrders: PropTypes.func,
  restaurants: PropTypes.array,
  loadRestaurants: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
