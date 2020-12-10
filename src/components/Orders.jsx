import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadOrders } from '../store/orders';
import { connect } from 'react-redux';
import { Jumbotron, Container } from 'react-bootstrap';
import { loadRestaurants } from '../store/restaurants';
import Order from './Order';

class Orders extends Component {
  componentDidMount() {
    this.props.loadOrders();
    this.props.loadRestaurants();
  }

  // TO DO (shh): need to create fetcher for orders only by specific userID

  render() {
    return (
      <>
        <h1>Placeholder for OrderHistory View</h1>
        {this.props.orders ? (
          this.props.orders.map(order => (
            <Order
              key={order.id}
              order={order}
              restaurants={this.props.restaurants}
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
