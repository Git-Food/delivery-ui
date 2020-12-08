import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';

import { loadOrders } from '../store/orders';
import { connect } from 'react-redux';

import Order from './Order';

class OrderHistory extends Component {
  componentDidMount() {
    this.props.loadOrders();
  }

  // TO DO (shh): need to fetch restaurant name for every order
  // async fetchRestaurant(businessId) {
  //   const data = fetch(
  //     `https://git-food.herokuapp.com/restaurant/5fca9eb5e4e763507dc3aab3`
  //   );
  //   const restaurant = data.json();
  //   console.log(restaurant.name);
  //   return restaurant.name;
  // }

  // TO DO (shh): need to create fetcher for orders only by specific userID

  render() {
    return (
      <>
        <h1>Placeholder for OrderHistory View</h1>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            order={order}
            // findRestaurantName={this.fetchRestaurant}
          />
        ))}
      </>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.entities.orders.list,
});

const mapDispatchToProps = dispatch => ({
  loadOrders: () => dispatch(loadOrders()),
});

OrderHistory.propTypes = {
  orders: PropTypes.array,
  loadOrders: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
