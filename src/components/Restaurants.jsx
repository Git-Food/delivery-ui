import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Form, FormControl } from 'react-bootstrap';

import { loadRestaurants } from '../store/restaurants';
import { connect } from 'react-redux';

import Restaurant from './Restaurant';

class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
    };
  }

  componentDidMount() {
    this.props.loadRestaurants();
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { restaurants } = this.props;
    const { searchfield } = this.state;
    const filteredRestaurants = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return (
      <>
        <h1>Placeholder for Restaurants View</h1>
        <Form inline>
          <FormControl
            type="search"
            placeholder="Search Restaurants"
            className="mb-3 mr-sm-2"
            onChange={this.onSearchChange}
          />
        </Form>
        <Row>
          {filteredRestaurants.map(restaurant => (
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
