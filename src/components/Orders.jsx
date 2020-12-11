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
    this.state = {
      userOrders: [],
    };
  }

  componentDidMount() {
    this.props.loadOrders();
    this.props.loadRestaurants();
    // TODO: changed to this.props.userId?? if user userId or context
    this.fetchUserOrders('5fd00ac53e79e6ef143eab21');
  }

  fetchUserOrders = async userId => {
    const data = await fetch(
      `https://git-food.herokuapp.com/orderhistory?userId=${userId}`
    );
    const orders = await data.json();
    this.setState({ userOrders: orders });
  };

  render() {
    const { userOrders } = this.state;
    // console.log(userOrders);
    return (
      <>
        <h1>Placeholder for OrderHistory View</h1>
        {userOrders.length ? (
          userOrders.map(order => (
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
