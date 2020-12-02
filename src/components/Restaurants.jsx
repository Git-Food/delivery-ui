import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import { loadRestaurants } from '../store/restaurants';
import { connect } from 'react-redux';

import Restaurant from './Restaurant';

class Restaurants extends Component {
  componentDidMount() {
    this.props.loadRestaurants();
  }

  render() {
    return (
      <>
        <h1>Placeholder for Restaurants View</h1>
        <Row>
          {this.props.restaurants.map(restaurant => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.entities.restaurants.list,
});

const mapDispatchToProps = dispatch => ({
  loadRestaurants: () => dispatch(loadRestaurants()),
});

Restaurants.propTypes = {
  restaurants: PropTypes.array,
  loadRestaurants: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
