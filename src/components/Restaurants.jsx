import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loadRestaurants } from '../store/restaurants';
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
      <Container className="justify-content-center" fluid>
        <h1 className="text-center">Restaurants</h1>
        <div className="justify-content-center">
          <Form inline>
            <FormControl
              type="search"
              placeholder="Search Restaurants"
              className="m-3 mr-sm-2 col-8"
              onChange={this.onSearchChange}
            />
          </Form>
        </div>
        <Row>
          {filteredRestaurants.map(restaurant => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </Row>
      </Container>
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
